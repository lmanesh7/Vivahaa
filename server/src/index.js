import { config } from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { logger } from "./middleware/logEvents.js";
import errorHandler from "./middleware/errorHandler.js";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials.js";
import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";
import registerRoute from "./routes/api/register.js";
import authRoute from "./routes/api/auth.js";
import refreshRoute from "./routes/api/refresh.js";
import logoutRoute from "./routes/api/logout.js";
import usersRoute from "./routes/api/users.js";
import venuesRoute from "./routes/api/venues.js";
import mehendiArtistsRoute from "./routes/api/mehendiArtists.js";
import decoratorRoute from "./routes/api/decorators.js";
import photoRoute from "./routes/api/photo.js";
import multer from "multer";
import Image from "./model/Image.js";
import Message from "./model/Message.js";
import Venues from "./model/Venues.js";
import MehendiArtists from "./model/MehendiArtists.js";
import Decorator from "./model/Decorator.js";
import Photo from "./model/Photo.js";
import Booking from "./model/Booking.js";
import Task from "./model/TaskSchema.js";
import Budget from "./model/Budget.js";
import TaskSchema from "./model/TaskSchema.js";
import GuestList from "./model/GuestList.js";
import Review from "./model/Review.js";
import fs from "fs";
import nodemailer from "nodemailer";
import ejs from "ejs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const twoStepsBackPath = dirname(fileURLToPath(new URL(".", import.meta.url)));
config();

const PORT = process.env.PORT || 3500;
const app = express();
connectDB();

// Multer configuration
const storage = multer.diskStorage({
  destination: "/uploads/images", // Absolute path to uploads directory
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(credentials);
app.use(cors(corsOptions));
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);
app.use("/api/users", usersRoute);
app.use("/venues", venuesRoute);
app.use("/mehendi-artists", mehendiArtistsRoute);
app.use("/decorators", decoratorRoute);
app.use("/photo", photoRoute);
app.use(
  "/uploads/images",
  express.static(path.join(twoStepsBackPath, "uploads", "images"))
);
// File upload route
app.post("/api/upload", upload.single("image"), async (req, res) => {
  // Assuming you have a Mongoose model named Image
  // const Image = mongoose.model('Image');

  // Access the uploaded file details
  const file = req.file;

  // Create a new Image document in the database
  const image = await Image.create({
    filename: file.originalname,
    contentType: file.mimetype,
    data: file.path, // Store the path of the uploaded file
  });

  console.log(image);

  res.status(200).json({ message: "Image uploaded successfully!" });
});
app.post("/api/messageVendor", async (req, res) => {
  try {
    const {
      serviceId,
      serviceType,
      fullName,
      message,
      phone,
      email,
      createdBy,
    } = req.body;

    // Create a new message instance
    const newMessage = new Message({
      serviceId,
      serviceType,
      fullName,
      message,
      phone,
      email,
      createdBy,
    });

    // Save the message to the database
    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/getVenueById", async (req, res) => {
  try {
    const venueId = req.query.id; // Accessing id as a query parameter
    const venue = await Venues.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.json(venue);
  } catch (error) {
    console.error("Error fetching venue by ID:", error);
    res.status(500).json({ error: "Failed to fetch venue" });
  }
});

app.get("/api/getMehindiById", async (req, res) => {
  try {
    const venueId = req.query.id; // Accessing id as a query parameter
    const venue = await MehendiArtists.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.json(venue);
  } catch (error) {
    console.error("Error fetching venue by ID:", error);
    res.status(500).json({ error: "Failed to fetch venue" });
  }
});
app.get("/api/getDecoratorById", async (req, res) => {
  try {
    const venueId = req.query.id; // Accessing id as a query parameter
    const venue = await Decorator.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Decorator not found" });
    }
    res.json(venue);
  } catch (error) {
    console.error("Error fetching decorator by ID:", error);
    res.status(500).json({ error: "Failed to fetch decorator" });
  }
});

app.get("/api/getPhotoById", async (req, res) => {
  try {
    const venueId = req.query.id; // Accessing id as a query parameter
    const venue = await Photo.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Photographer not found" });
    }
    res.json(venue);
  } catch (error) {
    console.error("Error fetching Photographer by ID:", error);
    res.status(500).json({ error: "Failed to fetch Photographer" });
  }
});

// Assuming you're using Express.js for your backend
app.get("/api/notifications/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const notifications = await Message.find().sort({ createdAt: -1 });

    // Loop through each notification ,
    for (let i = 0; i < notifications.length; i++) {
      let businessName = "";

      // Determine the collection based on serviceType
      switch (notifications[i].serviceType) {
        case "decor":
          const decorator = await Decorator.find({
            _id: notifications[i].serviceId,
            createdBy: id,
          });
          businessName = decorator[0] ? decorator[0].businessName : "";
          break;
        case "venues":
          const venue = await Venues.find({
            _id: notifications[i].serviceId,
            createdBy: id,
          });
          businessName = venue[0] ? venue[0].businessName : "";
          break;
        case "mehendi":
          const mehendi = await MehendiArtists.find({
            _id: notifications[i].serviceId,
            createdBy: id,
          });
          businessName = mehendi[0] ? mehendi[0].businessName : "";
          break;
        default:
          break;
      }
      if (businessName !== undefined && businessName !== "") {
        // Add businessName to the notification object
        notifications[i] = {
          ...notifications[i].toObject(),
          businessName: businessName,
        };
      } else {
        notifications.splice(i, 1);
        i--;
      }
    }

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

app.get("/api/bookings/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookings = await Booking.find().sort({ createdAt: -1 });

    // Loop through each notification ,
    for (let i = 0; i < bookings.length; i++) {
      let businessName = "";

      // Determine the collection based on serviceType
      switch (bookings[i].vendorType) {
        case "decor":
          const decorator = await Decorator.find({
            _id: bookings[i].vendor,
            createdBy: id,
          });
          businessName = decorator[0] ? decorator[0].businessName : "";
          break;
        case "venue":
          const venue = await Venues.find({
            _id: bookings[i].vendor,
            createdBy: id,
          });
          businessName = venue[0] ? venue[0].businessName : "";
          break;
        case "mehendi":
          const mehendi = await MehendiArtists.find({
            _id: bookings[i].vendor,
            createdBy: id,
          });
          businessName = mehendi[0] ? mehendi[0].businessName : "";
          break;
        case "photo":
          const photo = await Photo.find({
            _id: bookings[i].vendor,
            createdBy: id,
          });
          businessName = photo[0] ? photo[0].businessName : "";
          break;
        default:
          break;
      }

      if (businessName !== undefined && businessName !== "") {
        // Add businessName to the bookings object
        bookings[i] = {
          ...bookings[i].toObject(),
          businessName: businessName,
        };
      } else {
        // Remove the booking if businessName is empty or undefined
        bookings.splice(i, 1);
        i--; // Decrement i to adjust for removed element
      }
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});
app.get("/api/user/bookings/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookings = await Booking.find().sort({ createdAt: -1 });

    // Loop through each notification ,
    for (let i = 0; i < bookings.length; i++) {
      let businessName = "";

      // Determine the collection based on serviceType
      switch (bookings[i].vendorType) {
        case "decor":
          const decorator = await Decorator.find({ _id: bookings[i].vendor });
          businessName = decorator[0] ? decorator[0].businessName : "";
          break;
        case "venue":
          const venue = await Venues.find({ _id: bookings[i].vendor });
          businessName = venue[0] ? venue[0].businessName : "";
          break;
        case "mehendi":
          const mehendi = await MehendiArtists.find({
            _id: bookings[i].vendor,
          });
          businessName = mehendi[0] ? mehendi[0].businessName : "";
          break;
        case "photo":
          const photo = await Photo.find({ _id: bookings[i].vendor });
          businessName = photo[0] ? photo[0].businessName : "";
          break;
        default:
          break;
      }

      if (businessName !== undefined && businessName !== "") {
        // Add businessName to the bookings object
        bookings[i] = {
          ...bookings[i].toObject(),
          businessName: businessName,
        };
      } else {
        // Remove the booking if businessName is empty or undefined
        bookings.splice(i, 1);
        i--; // Decrement i to adjust for removed element
      }
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.get("/api/booking/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookings = await Booking.findById(id); //.sort({ createdAt: -1 });

    // Loop through each notification ,
    for (let i = 0; i < bookings.length; i++) {
      let businessName = "";

      // Determine the collection based on serviceType
      switch (bookings[i].vendorType) {
        case "decor":
          const decorator = await Decorator.find({
            _id: bookings[i].vendor,
            createdBy: id,
          });
          businessName = decorator[0] ? decorator[0].businessName : "";
          break;
        case "venue":
          const venue = await Venues.find({
            _id: bookings[i].vendor,
            createdBy: id,
          });
          businessName = venue[0] ? venue[0].businessName : "";
          break;
        case "mehendi":
          const mehendi = await MehendiArtists.find({
            _id: bookings[i].vendor,
            createdBy: id,
          });
          businessName = mehendi[0] ? mehendi[0].businessName : "";
          break;
        case "photo":
          const photo = await Photo.find({
            _id: bookings[i].vendor,
            createdBy: id,
          });
          businessName = photo[0] ? photo[0].businessName : "";
          break;
        default:
          break;
      }

      if (businessName !== undefined && businessName !== "") {
        // Add businessName to the bookings object
        bookings[i] = {
          ...bookings[i].toObject(),
          businessName: businessName,
        };
      } else {
        // Remove the booking if businessName is empty or undefined
        bookings.splice(i, 1);
        i--; // Decrement i to adjust for removed element
      }
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});
app.get("/api/user/booking/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookings = await Booking.findById(id); //.sort({ createdAt: -1 });

    // Loop through each notification ,
    for (let i = 0; i < bookings.length; i++) {
      let businessName = "";

      // Determine the collection based on serviceType
      switch (bookings[i].vendorType) {
        case "decor":
          const decorator = await Decorator.find({ _id: bookings[i].vendor });
          businessName = decorator[0] ? decorator[0].businessName : "";
          break;
        case "venue":
          const venue = await Venues.find({ _id: bookings[i].vendor });
          businessName = venue[0] ? venue[0].businessName : "";
          break;
        case "mehendi":
          const mehendi = await MehendiArtists.find({
            _id: bookings[i].vendor,
          });
          businessName = mehendi[0] ? mehendi[0].businessName : "";
          break;
        case "photo":
          const photo = await Photo.find({ _id: bookings[i].vendor });
          businessName = photo[0] ? photo[0].businessName : "";
          break;
        default:
          break;
      }

      if (businessName !== undefined && businessName !== "") {
        // Add businessName to the bookings object
        bookings[i] = {
          ...bookings[i].toObject(),
          businessName: businessName,
        };
      } else {
        // Remove the booking if businessName is empty or undefined
        bookings.splice(i, 1);
        i--; // Decrement i to adjust for removed element
      }
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.delete("/api/photo/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const photographer = await Photo.findById(id);
    if (!photographer) {
      return res.status(404).json({ message: "No photographer found" });
    }
    // if(photographer.createdBy!=req.UserInfo.id){
    //   return res.status(403).json({message:"Unauthorized to delete"})
    // }
    await Photo.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "Photographer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.post("/api/savebooking", async (req, res) => {
  try {
    const booking = { ...req.body };
    await Booking.create(booking);

    return res.status(200).json({ message: "Booking saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.get("/api/photo/all", async (req, res) => {
  try {
    const Photographers = await Photo.find();
    res.json(Photographers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photographers" });
  }
});

app.get("/api/decorators/:id", async (req, res) => {
  try {
    const decorators = await Decorator.findById(req.params.id);
    if (!decorators) {
      return res.status(404).json({ message: "decorator not found" });
    }
    res.json(decorators);
  } catch (error) {
    console.error("Error fetching decorator by ID:", error);
    res.status(500).json({ error: "Failed to fetch decorator" });
  }
});

app.get("/api/photo/:id", async (req, res) => {
  try {
    const photographer = await Photo.findById(req.params.id);
    if (!photographer) {
      return res.status(404).json({ message: "Photographer not found" });
    }
    res.status(200).json(photographer);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photographer" });
  }
});
app.post("/api/booking/:id/vendor-replies", async (req, res) => {
  try {
    const { id } = req.params;
    const { vendorReplies } = req.body;

    // Find the booking by ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update the vendor replies
    booking.vendorReplies = vendorReplies;

    // Save the updated booking
    const updatedBooking = await booking.save();

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating vendor replies:", error);
    res.status(500).json({ error: "Failed to update vendor replies" });
  }
});
app.post("/api/tasks", async (req, res) => {
  try {
    const taskData = req.body.taskArray;

    // Check if taskData is an array
    // if (!Array.isArray(taskData)) {
    //   console.error('taskData is not an array:', taskData);
    //   return res.status(400).json({ message: 'Invalid task data' });
    // }

    // Iterate over each category object in taskData
    for (const categoryData of taskData) {
      const category = categoryData.category;
      const tasks = categoryData.tasks;

      // Iterate over each task in the category
      for (const task of tasks) {
        // Update or insert each task
        await Task.findOneAndUpdate({ _id: task._id }, task, {
          upsert: true,
          new: true,
        });
      }
    }

    res.json({ message: "Tasks saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving tasks" });
  }
});

app.post("/api/savealltasks", async (req, res) => {
  try {
    const taskData = req.body.tasks; // Extract tasks array from the request body

    for (const task of taskData) {
      const isPresent = await TaskSchema.exists({ _id: task._id }); // Check if task exists by ID
      if (!isPresent) {
        const taskInstance = new TaskSchema(task);
        await taskInstance.save();
        console.log(`Task "${task.name}" saved successfully`);
      } else {
        console.log(`Task "${task.name}" already exists`);
      }
    }

    return res.status(200).send("Tasks saved successfully");
  } catch (error) {
    console.error("Error saving tasks:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/api/savetask/:id", async (req, res) => {
  try {
    const task = { ...req.body, user: req.params.id };
    var isPresent = false;
    var data = [];
    if (task._id) {
      isPresent = await TaskSchema.findOne({ _id: task._id });
    }
    if (isPresent) {
      await TaskSchema.findByIdAndUpdate(task);
      data = await TaskSchema.findById(task._id);
    } else {
      await TaskSchema.create(task);
      data = await TaskSchema.findOne({ name: task.name });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Some error occured" });
  }
});

// app.get('/api/tasks', async (req, res) => {
// try{
//   const tasks = await TaskSchema.find();
//   return res.json(tasks);

// }
// catch(error){
//   return res.status(500).json({message:"Some error occured"});
// }
// });
app.put("/api/updatetask", async (req, res) => {
  try {
    const taskData = { ...req.body };
    const id = taskData._id;
    //const task = await TaskSchema.findById(id);
    await TaskSchema.findByIdAndUpdate(taskData);
    const data = await TaskSchema.findById(id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Some error occured" });
  }
});
app.get("/api/tasks/:id", async (req, res) => {
  try {
    let tasks;
    if (req.query.category) {
      tasks = await Task.find({ category: req.query.category });
    } else {
      tasks = await Task.find({ user: req.params.id });
    }

    // Group tasks by category
    const tasksByCategory = tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = [];
      }
      acc[task.category].push({
        _id: task._id,
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
        category: task.category,
        completed: task.completed,
      });
      return acc;
    }, {});

    // Convert object to array format
    const formattedTasks = Object.entries(tasksByCategory).map(
      ([category, tasks]) => ({
        category,
        tasks,
      })
    );

    res.json(formattedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/tasksforhomepage/:id", async (req, res) => {
  try {
    let tasks;
    if (req.query.category) {
      tasks = await Task.find({
        category: req.query.category,
        completed: false,
      });
    } else {
      tasks = await Task.find({ user: req.params.id, completed: false });
    }

    // Group uncompleted tasks by category
    const tasksByCategory = tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = [];
      }
      // Check if the category already has an uncompleted task
      if (acc[task.category].length === 0) {
        acc[task.category].push({
          _id: task._id,
          name: task.name,
          description: task.description,
          dueDate: task.dueDate,
          category: task.category,
          completed: task.completed,
        });
      }
      return acc;
    }, {});

    // Convert object to array format
    const formattedTasks = Object.entries(tasksByCategory).map(
      ([category, tasks]) => ({
        category,
        tasks,
      })
    );

    res.json(formattedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/deletetask/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    await TaskSchema.findByIdAndDelete(taskId);
    return res.json(201);
  } catch (error) {
    return res.status(500);
  }
});

app.post("/api/photo/:id", async (req, res) => {
  try {
    // Assuming user ID is stored in req.userInfo
    const photoData = { ...req.body };
    const userId = photoData.vendorLoggedIn;
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: "photographer not found" });
    }
    if (photo.createdBy != userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update photographer" });
    }
    const updatedphoto = await photo.findByIdAndUpdate(
      photoData._id,
      photoData,
      { new: true }
    );
    res.status(200).json(updatedphoto);
  } catch (error) {
    console.error("Error updating photographer by ID:", error);
    res.status(500).json({ error: "Failed to update photographer" });
  }
});

app.get("/api/budget/:id", async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.params.id });
    if (!budget) {
      return res.status(404).json({ message: "Budget data not found" });
    }
    res.json(budget);
  } catch (error) {
    console.error("Error fetching budget data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/budget", async (req, res) => {
  try {
    const { budget, totalCost, totalPaid, items, eventDate, user } = req.body;
    const existingBudget = await Budget.findOne();
    if (existingBudget) {
      // Update existing budget data
      existingBudget.budget = budget;
      existingBudget.totalCost = totalCost;
      existingBudget.totalPaid = totalPaid;
      existingBudget.items = items;
      existingBudget.eventDate = eventDate;
      existingBudget.user = user;
      await existingBudget.save();
      res.sendStatus(200);
    } else {
      // Create new budget data
      const newBudget = new Budget({
        budget,
        totalCost,
        totalPaid,
        items,
        eventDate,
        user,
      });
      await newBudget.save();
      res.sendStatus(201);
    }
  } catch (error) {
    console.error("Error saving budget data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/guests", async (req, res) => {
  try {
    const { guests, eventDate,eventTime, venueId,meetingLink, inviterName, message, user, attachment } = req.body;
    const venue = venueId;
    await GuestList.deleteMany({ user: user });
    const guest = new GuestList({ guests, eventDate,eventTime, venue,meetingLink,inviterName, message, user, attachment });
    await guest.save();
    res.status(201).json(guest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/guests/:id/:eventDate", async (req, res) => {
  try {
    const id = req.params.id;
    const eventDate = new Date(req.params.eventDate);
    const response = await GuestList.find({ user: id, eventDate: eventDate });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500);
  }
});

app.post("/api/sendemail", async (req, res) => {
  try {
    // Read the HTML template file
    const htmlTemplate = fs.readFileSync("src/invitation.ejs", "utf-8");

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "skytravels2024@gmail.com",
        pass: "hfwi jofc gdlr pfrl",
      },
    });

    // Fetch guest list from the database
    let guestList = await GuestList.find();
    guestList = guestList[0];
    const guests = guestList.guests;
    const venue = await Venues.findById(guestList.venue);

    // Iterate through the guest list
    for (const guest of guests) {
      try {
        // Render the HTML template for each guest
        const renderedHtml = ejs.render(htmlTemplate, {
          guest: guest.name,
          commonMessage: guestList.message,
          weddingDate: guestList.eventDate,
          weddingTime: guestList.eventTime,
          venue: venue.businessName,
          address: venue.address,
          meetingLink: guestList.meetingLink,
          inviterName: guestList.inviterName,
          rsvpDate: guestList.rsvpDate,
        });

        // Send the invitation email
        const info = await transporter.sendMail({
          from: "Poojamma@gmail.com",
          to: guest.email,
          subject: "Wedding Invitation",
          html: renderedHtml,
          attachments: [{
            filename: guestList.attachment,
            path: `email_attachments/${guestList.attachment}`
        }]
        });

        console.log("Invitation email sent to:", guest.email);
      } catch (error) {
        console.error(
          "Error sending email to",
          guest.email,
          ":",
          error.message
        );
      }
    }

    res.status(200).json({ message: "Invitations sent successfully" });
  } catch (error) {
    console.error("Error sending invitations:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/saveReview', (req, res) => {
  // Extract the review data from the request body
  const { author, rating, comment, serviceId, user } = req.body;
  
  // Add your logic here to save the review to your database
  // For demonstration purposes, let's assume you have a Review model
  // and you're using Mongoose to interact with MongoDB
 // Import your Review model
  const newReview = new Review({
    author: author,
    rating: rating,
    comment: comment,
    serviceId: serviceId,
    user: user
  });
  newReview.save()
    .then(savedReview => {
      console.log("Review saved successfully:", savedReview);
      res.status(201).json(savedReview); // Respond with the saved review
    })
    .catch(error => {
      console.error("Error saving review:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get('/api/getReviews', (req, res) => {
  // Extract the venueId from the query parameters
  const { serviceId } = req.query;

// Import your Review model
  Review.find({ serviceId: serviceId })
    .then(reviews => {
      console.log("Fetched reviews:", reviews);
      res.status(200).json(reviews); // Respond with the fetched reviews
    })
    .catch(error => {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
});

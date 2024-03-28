import React from 'react';
import { Typography, Box, Container, Button, MenuItem, FormControl, FormLabel, Select, Chip, InputLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const CuisineSelect = ({ control, errors, defaultValue, placeholderValue }) => {
  const [cuisines, setCuisines] = React.useState(defaultValue || []);
  const names = ['Italian', 'Mexican', 'Indian'];

  const handleChange = (event) => {
    const selectedCuisines = event.target.value;
    setCuisines(selectedCuisines);
  };

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      {/* <FormLabel id="cuisines-available-label">Cuisines Available</FormLabel> */}
      <InputLabel id="cuisines-available-label">Cuisines Available</InputLabel>
      <Controller
        name="cuisinesAvailable"
        control={control}
        defaultValue={defaultValue || []}
        rules={{ required: 'Cuisines Available is required' }}
        render={({ field }) => (
          <Select
            {...field}
            labelId="cuisines-available-label"
            id="cuisines-available"
            multiple
            error={!!errors.cuisinesAvailable}
            placeholder={placeholderValue}
            sx={{ minWidth: 120 }}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.cuisinesAvailable && (
        <Typography variant="caption" color="error">
          {errors.cuisinesAvailable.message}
        </Typography>
      )}
    </FormControl>
  );
};

export default CuisineSelect;

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const Blog = () => {
    const filePath = './test.txt';
  const [blogContent, setBlogContent] = useState('');

  useEffect(() => {
    // Fetch the content of the blog file
    debugger
    fetch(filePath)
      .then(response => response.text())
      .then(text => setBlogContent(text))
      .catch(error => console.error('Error fetching blog content:', error));
  }, [filePath]);

  const renderBlogContent = () => {
    // Split the content into paragraphs
    const paragraphs = blogContent.split('\n\n');

    // Map each paragraph to a Typography component
    return paragraphs.map((paragraph, index) => {
      // Detecting headings and subheadings
      if (paragraph.startsWith('# ')) {
        return <Typography key={index} variant="h4" component="h2" gutterBottom>{paragraph.slice(2)}</Typography>;
      } else if (paragraph.startsWith('## ')) {
        return <Typography key={index} variant="h5" component="h3" gutterBottom>{paragraph.slice(3)}</Typography>;
      }
      
      // Detecting bold text
      if (paragraph.startsWith('**')) {
        return <Typography key={index} variant="body1" gutterBottom><strong>{paragraph.slice(2, -2)}</strong></Typography>;
      }

      // Regular paragraph
      return <Typography key={index} variant="body1" gutterBottom>{paragraph}</Typography>;
    });
  };

  return (
    <Container maxWidth="md">
        
    <div dangerouslySetInnerHTML={{ __html: blogContent }} />
  </Container>
  );
};

export default Blog;

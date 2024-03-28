import React, { useState, useEffect } from 'react';
//import TestHTML from './test.html'; 


function HomepageIndex() {
  const [htmlContent, setHtmlContent] = useState('');

  var __html = '<h1>Hi<h1/>'//require('./test.html');
  var template = { __html: __html };
  
  React.module.exports = React.createClass({
    render: function() {
      return(
        <div dangerouslySetInnerHTML={template} />
      );
    }
  });
  
}

export default HomepageIndex;

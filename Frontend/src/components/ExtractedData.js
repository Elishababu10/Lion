import React from 'react';

const ExtractedData = ({ text }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Extracted Content:</h3>
      <pre style={{ background: "#f4f4f4", padding: "10px" }}>{text}</pre>
    </div>
  );
};

export default ExtractedData;
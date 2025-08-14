import React, { useState } from 'react';
import Login from './components/Login';
import UploadDocument from './components/UploadDocument';
import ExtractedData from './components/ExtractedData';

function App() {
  const [token, setToken] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  return (
    <div style={{ padding: "30px" }}>
      <h1>Doxtract Mini</h1>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <UploadDocument setExtractedText={setExtractedText} />
          <ExtractedData text={extractedText} />
        </>
      )}
    </div>
  );
}

export default App;
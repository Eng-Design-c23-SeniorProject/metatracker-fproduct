import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FileViewer from 'react-file-viewer';
import '../App.css';

const DisplayDocs = () => {
  const [docURL, setDocURL] = useState(null);
  const [summary, setSummary] = useState('');
  const { id } = useParams();
  const file = {
    url: docURL,
    type: 'docx',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/display-doc/${id}`);
        setDocURL(`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${response.data.docData}`);
        setSummary(response.data.summary);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = docURL;
    link.download = `document_${id}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='filesDisplay'>
      {docURL ? (
        <div>
          <h2>Docx file:</h2>
          <hr />
          <FileViewer fileType={file.type} filePath={file.url} className='textfcon' />
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {summary && (
        <div className='summaryCon'>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}

      <button onClick={downloadFile} className='downloadbtt'>Download</button>
    </div>
  );
};

export default DisplayDocs;

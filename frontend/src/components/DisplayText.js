import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';

const DisplayText = () => {
  const [textData, setTextData] = useState('');
  const [summary, setSummary] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/display-text/${id}`);
        setTextData(response.data.textData);
        setSummary(response.data.summary);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([textData], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'text_file.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className='filesDisplay'>
      {textData && (
        <div>
          <h2>Text file:</h2>
          <hr/>
          <textarea
            readOnly
            value={textData}
            rows={50} //height
            cols={118} //width
            style={{ resize: 'none' }} //disable textarea resizing
            className='textfcon'
          />
        </div>
      )}

      {summary && (
        <div className='summaryCon'>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}

      <div>
        <button onClick={handleDownload} className='downloadbtt'>Download</button>
      </div>
    </div>
  );
};

export default DisplayText;
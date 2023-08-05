import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';

const DisplayPDF = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [summary, setSummary] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/display-pdf/${id}`);
        setPdfUrl(`data:application/pdf;base64,${response.data.pdfData}`);
        setSummary(response.data.summary);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'file.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='filesDisplay'>
      <h1>Pdf file:</h1>
      <hr/>
      {pdfUrl && (
        <div>
          <embed src={pdfUrl} type="application/pdf" className='textfdis' />
        </div>
      )}

      {summary && (
        <div className='summaryCon'>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}

      <button onClick={handleDownload} className='downloadbtt'>Download</button>
    </div>
  );
};

export default DisplayPDF;
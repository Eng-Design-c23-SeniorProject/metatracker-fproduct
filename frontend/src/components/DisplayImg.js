import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';

const DisplayImg = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [labels, setLabels] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/display-image/${id}`, {
          responseType: 'blob',
        });

        const reader = new FileReader();

        reader.onloadend = async () => {
          setImageUrl(reader.result);
          await classifyImage(reader.result);
        };

        reader.readAsDataURL(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const classifyImage = async (imageData) => {
    try {
      const response = await axios.post('http://localhost:5000/classify-image', { image: imageData });

      if (response.data.labels) {
        setLabels(response.data.labels);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image-${id}.png`;
    link.click();
  };

  return (
    <div className='filesDisplay'>
      {imageUrl && (
        <div>
          <h2>Image file:</h2>
          <hr/>
          <img src={imageUrl} alt="search display placeholder" className='mediafdis' />

          {labels.length > 0 && (
            <div className='mediasumdis'>
              <h2>Image classification tags:</h2>
              <ul>
                {labels.map((label, index) => (
                  <li key={index}>{label}</li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={downloadImage} className='downloadbtt'>Download</button>
        </div>
      )}
    </div>
  );
};

export default DisplayImg;
import React from 'react';
import axios from 'axios';
import '../App.css';

class UploadImg extends React.Component {
  state = {
    message: '',
  };

  handleFileUpload = async (event) => {
    event.preventDefault();
    const fileInput = event.target.image.files[0];

    const formData = new FormData();
    formData.append('image', fileInput);

    try {
      const response = await axios.post('http://localhost:5000/upload-image', formData);
      console.log(response.data);

      if (response.data === 'Image already uploaded and stored in the database.') {
        this.setState({ message: 'File is a duplicate. Upload skipped.' });

        //refresh the page after displaying the duplicate message
        setTimeout(() => window.location.reload(), 2000);
      } else {
        this.setState({ message: 'Upload successful!' });

        //refresh the page after 2 seconds, only if the response is successful
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      console.error(error);
      this.setState({ message: 'Upload failed.' });

      //refresh the page after 2 seconds
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1 className='UploadTitle'>Upload an Image</h1>
        <hr/>
        <form onSubmit={this.handleFileUpload}>
          <input className="uploadForm" type="file" name="image" />
          <button className="uploadSubmit" type="submit">Upload</button>
        </form>
        {message && <p className='uploadmsg'>{message}</p>}
      </div>
    );
  }
}

export default UploadImg;
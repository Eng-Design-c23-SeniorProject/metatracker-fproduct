import React from 'react';
import axios from 'axios';
import '../App.css';

class UploadPDF extends React.Component {
  state = {
    message: '',
  };

  handleFileUpload = async (event) => {
    event.preventDefault();
    const fileInput = event.target.file.files[0];

    const formData = new FormData();
    formData.append('file', fileInput);

    try {
      const response = await axios.post('http://localhost:5000/upload-pdf', formData);

      //check the response data to see if the file is a duplicate
      if (response.data === 'PDF file already uploaded and stored in the database.') {
        this.setState({ message: 'File is a duplicate. Upload skipped.' });
      } else {
        this.setState({ message: 'Upload successful!' });
      }
    } catch (error) {
      console.error(error);
      this.setState({ message: 'Upload failed.' });
    }

    //refresh the page after a short delay, regardless of the response
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  render() {
    return (
      <div>
        <h1 className='UploadTitle'>Upload a Pdf</h1>
        <hr/>
        <form onSubmit={this.handleFileUpload}>
          <input className="uploadForm" type="file" name="file" />
          <button className="uploadSubmit" type="submit">Upload</button>
        </form>
        {this.state.message && <p className='uploadmsg'>{this.state.message}</p>}
      </div>
    );
  }
}

export default UploadPDF;
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../App.css';
import SearchAll from './SearchAll';
import UploadPDF from './UploadPDF';
import DisplayPDF from './DisplayPDF';
import UploadImg from './UploadImg';
import DisplayImg from './DisplayImg';
import UploadText from './UploadText';
import DisplayText from './DisplayText';
import UploadVideo from './UploadVideo';
import DisplayVideo from './DisplayVideo';
import UploadDocs from './UploadDocs';
import DisplayDocs from './DisplayDocs';
import Dashboard from './Dashboard';

const BodyContent = () => {
  return (
    <div className="body">
      <div className="grid1">
        <ul>
            <li><p className='titletwo'>Upload</p></li>
            <hr/>
            <li><Link to="/UploadPDF">Pdf</Link></li>
            <li><Link to="/UploadImg">Image</Link></li>
            <li><Link to="/UploadText">Txt</Link></li>
            <li><Link to="/UploadVideo">Video</Link></li>
            <li><Link to="/UploadDocs">Docx</Link></li>
            <hr/>
            <li><p className='titletwo'>Dashboard</p></li>
            <hr/>
            <li><Link to="/Dashboard">View Dashboard</Link></li>
        </ul>
      </div>
      <div className="grid2">
        <Routes>
          <Route path="/SearchAll" element={<SearchAll />} />
          <Route path="/UploadPDF" element={<UploadPDF />} />
          <Route path="/DisplayPDF/:id" element={<DisplayPDF />} />
          <Route path="/UploadImg" element={<UploadImg />} />
          <Route path="/DisplayImg/:id" element={<DisplayImg />} />
          <Route path="/UploadText" element={<UploadText />} />
          <Route path="/DisplayText/:id" element={<DisplayText />} />
          <Route path="/UploadVideo" element={<UploadVideo />} />
          <Route path="/DisplayVideo/:id" element={<DisplayVideo />} />
          <Route path="/UploadDocs" element={<UploadDocs />} />
          <Route path="/DisplayDocs/:id" element={<DisplayDocs />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};
export default BodyContent;
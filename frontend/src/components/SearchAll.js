import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const SearchAll = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [searchType, setSearchType] = useState('pdf');
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      switch (searchType) {
        case 'pdf':
          response = await axios.post('http://localhost:5000/search-pdf', { query });
          break;
        case 'img':
          response = await axios.post('http://localhost:5000/search-image', { query });
          break;
        case 'text':
          response = await axios.post('http://localhost:5000/search-text', { query });
          break;
        case 'video':
          response = await axios.post('http://localhost:5000/search-video', { query });
          break;
        case 'docs':
          response = await axios.post('http://localhost:5000/search-doc', { query });
          break;
        default:
          console.error('Invalid search type');
          return;
      }
      setResult(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFileClick = (id) => {
    navigate(`/Display${capitalize(searchType)}/${id}`);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <div className='allFileSearch'>
      <form onSubmit={handleFormSubmit}>
        <input
          className='inputplace'
          type="text"
          name="query"
          value={query}
          onChange={handleInputChange}
          placeholder={`Search a ${capitalize(searchType)}`}
          required
        />
        <button type="submit" className='inputbutton'><b>Search</b></button>
      </form>
      <div>
        <label>
          <input
            type="radio"
            value="pdf"
            checked={searchType === 'pdf'}
            onChange={handleSearchTypeChange}
          />
          PDF
        </label>
        <label>
          <input
            type="radio"
            value="img"
            checked={searchType === 'img'}
            onChange={handleSearchTypeChange}
          />
          Image
        </label>
        <label>
          <input
            type="radio"
            value="text"
            checked={searchType === 'text'}
            onChange={handleSearchTypeChange}
          />
          Text
        </label>
        <label>
          <input
            type="radio"
            value="video"
            checked={searchType === 'video'}
            onChange={handleSearchTypeChange}
          />
          Video
        </label>
        <label>
          <input
            type="radio"
            value="docs"
            checked={searchType === 'docs'}
            onChange={handleSearchTypeChange}
          />
          Docs
        </label>
      </div>

      {result.length > 0 ? (
        <div>
          <h2>{capitalize(searchType)}s found:</h2>
          <ul>
            {result.map((item) => (
              <li className='searchfound' key={item._id}>
                <Link to={`/Display${capitalize(searchType)}/${item._id}`} onClick={() => handleFileClick(item._id)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className='searchMsg1'>Please search a {searchType} file.</p>
      )}
    </div>
  );
};

export default SearchAll;
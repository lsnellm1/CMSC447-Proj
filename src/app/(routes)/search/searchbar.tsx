import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  defaultText?: string;
  className?: string;
  width?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, defaultText = "", className = "", width = "50px"}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder={defaultText}
      value={searchTerm}
      onChange={handleInputChange}
      style={{
        paddingLeft: '5px', 
        borderRadius: '5px',
        border: '2px solid light-grey',
        marginRight: '10px',
        width: `${width}%`
      }}
      className={className}
    />
  );
};

export default SearchBar;
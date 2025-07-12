'use client'

import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  searchable = false,
  className = "",
  optionKey = "value",
  optionLabel = "label",
  maxHeight = "200px"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter(option =>
        (option[optionLabel] || option).toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleSelect = (option) => {
    const selectedValue = typeof option === 'object' ? option[optionKey] : option;
    onChange(selectedValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;
    
    const selectedOption = options.find(option => 
      (typeof option === 'object' ? option[optionKey] : option) === value
    );
    
    return selectedOption 
      ? (typeof selectedOption === 'object' ? selectedOption[optionLabel] : selectedOption)
      : value;
  };

  return (
    <div className={`dropdown-container ${className}`} ref={dropdownRef}>
      <div
        className={`dropdown-trigger ${disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="dropdown-value">{getDisplayValue()}</span>
        <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu" style={{ maxHeight }}>
          {searchable && (
            <div className="dropdown-search">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className="dropdown-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const optionValue = typeof option === 'object' ? option[optionKey] : option;
                const optionDisplay = typeof option === 'object' ? option[optionLabel] : option;
                
                return (
                  <div
                    key={index}
                    className={`dropdown-option ${value === optionValue ? 'selected' : ''}`}
                    onClick={() => handleSelect(option)}
                  >
                    {optionDisplay}
                  </div>
                );
              })
            ) : (
              <div className="dropdown-no-options">No options found</div>
            )}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .dropdown-container {
          position: relative;
          width: 100%;
        }
        
        .dropdown-trigger {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: white;
          cursor: pointer;
          min-height: 40px;
        }
        
        .dropdown-trigger:hover {
          border-color: #999;
        }
        
        .dropdown-trigger.open {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        
        .dropdown-trigger.disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        .dropdown-value {
          flex: 1;
          text-align: left;
          color: #333;
        }
        
        .dropdown-arrow {
          margin-left: 8px;
          transition: transform 0.2s;
          font-size: 12px;
        }
        
        .dropdown-arrow.up {
          transform: rotate(180deg);
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ccc;
          border-top: none;
          border-radius: 0 0 4px 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          overflow: hidden;
        }
        
        .dropdown-search {
          padding: 8px;
          border-bottom: 1px solid #eee;
        }
        
        .dropdown-search input {
          width: 100%;
          padding: 6px 8px;
          border: 1px solid #ccc;
          border-radius: 3px;
          outline: none;
        }
        
        .dropdown-options {
          max-height: inherit;
          overflow-y: auto;
        }
        
        .dropdown-option {
          padding: 10px 12px;
          cursor: pointer;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .dropdown-option:hover {
          background-color: #f8f9fa;
        }
        
        .dropdown-option.selected {
          background-color: #007bff;
          color: white;
        }
        
        .dropdown-no-options {
          padding: 10px 12px;
          color: #999;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
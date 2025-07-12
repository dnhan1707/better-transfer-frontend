"use client"

import { useState } from "react";
import DropDown from "./components/Dropdown";
import UniMajorPair from "./components/UniMajorPair";

export default function Home() {
  const [chosenCollege, setChosenCollege] = useState("")
  const [uniMajorPairs, setUniMajorPairs] = useState([{}]) // Start with one empty pair
  
  // State for custom options
  const [universities, setUniversities] = useState([
    "University of California, Los Angeles",
    "University of California, Berkeley"
  ])
  const [majors, setMajors] = useState([
    "Computer Science",
    "Data Science", 
    "Business Administration",
    "Engineering"
  ])
  
  const addNewPair = () => {
    setUniMajorPairs([...uniMajorPairs, {}])
  }

  const updatePair = (index, pairData) => {
    const newPairs = [...uniMajorPairs]
    newPairs[index] = pairData
    setUniMajorPairs(newPairs)
  }

  const removePair = (index) => {
    if (uniMajorPairs.length > 1) {
      const newPairs = uniMajorPairs.filter((_, i) => i !== index)
      setUniMajorPairs(newPairs)
    }
  }

  const clearAll = () => {
    setChosenCollege("")
    setUniMajorPairs([{}])
  }

  const handleSearch = () => {
    const validPairs = uniMajorPairs.filter(pair => pair.university && pair.major)
    console.log("College:", chosenCollege)
    console.log("University-Major Pairs:", validPairs)
    // Add your search logic here
  }

  return (
    <div className="page-container">
      <div className="header">
        <h1>Better Transfer</h1>
        <p>Find your perfect transfer path</p>
      </div>
      
      <div className="form-container">
        {/* Community College Selection */}
        <div className="college-section">
          <label>Community College</label>
          <DropDown
            options={[
              "Pasadena City College",
              "Santa Monica College",
              "Los Angeles City College"
            ]}  
            value={chosenCollege}
            onChange={setChosenCollege}
            placeholder="Select community college"
            className="college-dropdown"
            searchable={true}
          />
        </div>

        {/* University-Major Pairs */}
        <div className="pairs-section">
          <div className="section-header">
            <h3>University & Major Pairs</h3>
            <button onClick={addNewPair} className="add-pair-btn">
              + Add Another Pair
            </button>
          </div>

          <div className="pairs-container">
            {uniMajorPairs.map((pair, index) => (
              <UniMajorPair
                key={index}
                pairData={pair}
                onPairChange={(pairData) => updatePair(index, pairData)}
                onRemove={() => removePair(index)}
                universities={universities}
                majors={majors}
                showRemoveButton={uniMajorPairs.length > 1}
              />
            ))}
          </div>
        </div>


        <div className="action-buttons">
          <button className="search-btn" onClick={handleSearch}>Find Transfer Paths</button>
          <button className="clear-btn" onClick={clearAll}>Clear All</button>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 2rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
          color: #2c3e50;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          letter-spacing: -0.025em;
        }

        .header p {
          font-size: 1.1rem;
          color: #6c757d;
          font-weight: 400;
        }

        .form-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          padding: 2.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
        }

        .college-section {
          margin-bottom: 2.5rem;
        }

        .college-section label {
          display: block;
          font-weight: 500;
          margin-bottom: 0.75rem;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        .pairs-section {
          margin-bottom: 2.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-header h3 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.2rem;
        }

        .add-pair-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .add-pair-btn:hover {
          background: #218838;
        }

        .pairs-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .add-options-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2.5rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .add-option-group h4 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
          font-size: 1rem;
        }

        .add-option {
          display: flex;
          gap: 0.5rem;
        }

        .add-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .add-input:focus {
          border-color: #2c3e50;
        }

        .add-btn {
          background: #2c3e50;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .add-btn:hover {
          background: #34495e;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .search-btn {
          background: #2c3e50;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .search-btn:hover {
          background: #34495e;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(44, 62, 80, 0.2);
        }

        .clear-btn {
          background: white;
          color: #6c757d;
          border: 1px solid #dee2e6;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .clear-btn:hover {
          border-color: #adb5bd;
          color: #495057;
          background: #f8f9fa;
        }

        @media (max-width: 768px) {
          .page-container {
            padding: 1rem;
          }
          
          .header h1 {
            font-size: 2rem;
          }
          
          .form-container {
            padding: 1.5rem;
          }

          .section-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          
          .action-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .search-btn, .clear-btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}
"use client"

import { useState, useCallback } from "react";
import InputFormContainer from "./components/InputFormContainer";
import CoursePlanner from "./components/CoursePlanner";
import sampleData from "./data/multi_university_sample.json";

export default function Home() {
  const [chosenCollege, setChosenCollege] = useState("")
  const [uniMajorPairs, setUniMajorPairs] = useState([{}])
  const [errorMessage, setErrorMessage] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [courseData, setCourseData] = useState(null)
  const [completedCourses, setCompletedCourses] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
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
    setErrorMessage("")
  }

  const updatePair = useCallback((index, pairData) => {
    setUniMajorPairs(prevPairs => {
      const newPairs = [...prevPairs]
      newPairs[index] = pairData
      return newPairs
    })
    setErrorMessage("")
  }, [])

  const removePair = (index) => {
    if (uniMajorPairs.length > 1) {
      const newPairs = uniMajorPairs.filter((_, i) => i !== index)
      setUniMajorPairs(newPairs)
      setErrorMessage("")
    }
  }

  const clearAll = () => {
    setChosenCollege("")
    setUniMajorPairs([{}])
    setErrorMessage("")
    setShowResults(false)
    setCourseData(null)
    setCompletedCourses([])
  }

  const toggleCourseCompletion = (courseCode) => {
    setCompletedCourses(prev => {
      if (prev.includes(courseCode)) {
        return prev.filter(code => code !== courseCode)
      } else {
        return [...prev, courseCode]
      }
    })
  }

  const handleSearch = () => {
    setErrorMessage("")
    
    if (!chosenCollege) {
      setErrorMessage("Please select your current college first.")
      return
    }
    
    const validPairs = uniMajorPairs.filter(pair => pair.university && pair.major)
    
    if (validPairs.length === 0) {
      setErrorMessage("Please add at least one university-major combination.")
      return
    }
    
    setCourseData(sampleData)
    setShowResults(true)
    
    // Auto-collapse sidebar on mobile after search
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
    
    console.log("College:", chosenCollege)
    console.log("University-Major Pairs:", validPairs)
    console.log("Completed Courses:", completedCourses)
  }

  return (
    <div className="app-layout">
      {/* Sidebar Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle configuration panel"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="toggle-icon"
        >
          {sidebarOpen ? (
            // Left arrow when sidebar is open (to close it)
            <path d="M15 18l-6-6 6-6"/>
          ) : (
            // Right arrow when sidebar is closed (to open it)
            <path d="M9 18l6-6-6-6"/>
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <InputFormContainer
          errorMessage={errorMessage}
          chosenCollege={chosenCollege}
          setChosenCollege={setChosenCollege}
          addNewPair={addNewPair}
          uniMajorPairs={uniMajorPairs}
          updatePair={updatePair}
          removePair={removePair}
          universities={universities}
          majors={majors}
          handleSearch={handleSearch}
          clearAll={clearAll}
          isCompact={true}
        />
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
        {!showResults ? (
          <div className="welcome-screen">
            <div className="welcome-header">
              <h1 className="app-title">Transfer Planner</h1>
              <p className="app-subtitle">Plan your academic transfer journey with precision</p>
            </div>
            <div className="quick-start">
              <h3>Get Started</h3>
              <ol>
                <li>Select your current community college</li>
                <li>Add target universities and majors</li>
                <li>Generate your personalized course plan</li>
              </ol>
            </div>
          </div>
        ) : (
          <CoursePlanner 
            data={courseData}
            completedCourses={completedCourses}
            onToggleCourse={toggleCourseCompletion}
            onBack={() => setShowResults(false)}
          />
        )}
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .app-layout {
          display: flex;
          min-height: 100vh;
          background: #fafafa;
          font-family: 'Inter', sans-serif;
          position: relative;
        }
        .sidebar-toggle {
          position: fixed;
          top: 3%;
          left: ${sidebarOpen ? '380px' : '0px'};
          transform: translateY(-50%) ${sidebarOpen ? 'translateX(0)' : 'translateX(0)'};
          z-index: 1001;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: ${sidebarOpen ? '0 6px 6px 0' : '0 6px 6px 0'};
          border-left: ${sidebarOpen ? '1px solid #e5e5e5' : 'none'};
          padding: 0.75rem 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
        }


        .sidebar-toggle:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
          // transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .sidebar {
          width: 380px;
          background: #ffffff;
          border-right: 1px solid #e5e5e5;
          transition: transform 0.3s ease;
          overflow-y: auto;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .main-content {
          flex: 1;
          transition: all 0.3s ease;
          padding: 1rem 2rem;
          min-height: 100vh;
        }

        .main-content.with-sidebar {
          margin-left: 380px;
        }

        .main-content.full-width {
          margin-left: 0;
        }

        .welcome-screen {
          max-width: 800px;
          margin: 3rem auto;
          text-align: center;
        }

        .welcome-header {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e5e5e5;
        }

        .app-title {
          font-size: 3.5rem;
          font-weight: 300;
          margin: 0 0 1rem 0;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }

        .app-subtitle {
          font-size: 1.1rem;
          font-weight: 400;
          color: #666;
          margin: 0;
        }

        .quick-start {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 2rem;
          text-align: left;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .quick-start h3 {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
          font-weight: 500;
          color: #1a1a1a;
        }

        .quick-start ol {
          margin: 0;
          padding-left: 1.5rem;
          color: #666;
        }

        .quick-start li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .sidebar-overlay {
          display: none;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            max-width: 400px;
          }

          .main-content.with-sidebar {
            margin-left: 0;
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }

          .welcome-screen {
            margin: 2rem auto;
          }

          .app-title {
            font-size: 2.5rem;
          }

          .main-content {
            padding: 1rem;
          }

          .quick-start {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .app-title {
            font-size: 2rem;
          }

          .app-subtitle {
            font-size: 1rem;
          }

          .quick-start {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
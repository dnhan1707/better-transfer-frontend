"use client"

import { useState, useCallback, useEffect } from "react";
import InputFormContainer from "./components/InputFormContainer";
import CoursePlanner from "./components/CoursePlanner";
import { fetchingUniversities, fetchingColleges } from "./service/fetchingFunctions";
import { fetchTransferPlan } from "./service/fetchingFunctions";
import { loadingMessages } from "../../public/messageLoading";

export default function Home() {
  const [chosenCollege, setChosenCollege] = useState(null) 
  const [uniMajorPairs, setUniMajorPairs] = useState([{}])
  const [errorMessage, setErrorMessage] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [courseData, setCourseData] = useState(null)
  const [completedCourses, setCompletedCourses] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false) 
  const [loadingMessage, setLoadingMessage] = useState("") 
  const [numberOfterm, setNumberOfTerm] = useState('8')
  const [universities, setUniversities] = useState([])
  const [colleges, setColleges] = useState([])
  const [loadingUniCol, setLoadingUniCol] = useState(false)


  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoadingUniCol(true)
        const [fetchedUniversities, fetchedColleges] = await Promise.all([
          fetchingUniversities(), fetchingColleges()
        ]);
        
        setUniversities(fetchedUniversities)
        setColleges(fetchedColleges)

      } catch (error) {
        throw new Error(`Something wrong with fetchInitial: ${error}`)
      } finally {
        setLoadingUniCol(false)
      }
    }

    fetchInitial()

  }, [])

  const handleDataUpdate = (newData) => {
    setCourseData(newData);
  };

  const handleClearCompleted = () => {
    setCompletedCourses([]);
  };

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
    setChosenCollege(null)
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

  const handleSearch = async () => {

    setErrorMessage("")
    setIsLoading(true)
    
    // Close sidebar when search is submitted
    setSidebarOpen(false)
    
    if (!chosenCollege || !chosenCollege.id) {
      setErrorMessage("Please select your current college first.")
      setIsLoading(false)
      return
    }
    
    const validPairs = uniMajorPairs.filter(pair => 
      pair.university && pair.major && pair.university_id && pair.major_id
    )

    if (validPairs.length === 0) {
      setErrorMessage("Please add at least one complete university-major combination.")
      setIsLoading(false)
      return
    }

    if (parseInt(numberOfterm) <= 0) {
      setErrorMessage("Please set at least one semester")
      setIsLoading(false)
      return
    }

    // Cycle through loading messages
    let messageIndex = 0;
    setLoadingMessage(loadingMessages[messageIndex]);
    
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex]);
    }, 1500);

    try {
      const transferRequest = {
        request: validPairs.map(pair => ({
          college_id: chosenCollege.id,
          major_id: pair.major_id,
          university_id: pair.university_id
        })),
        number_of_terms: parseInt(numberOfterm)
      }      
      const fetchedData = await fetchTransferPlan(transferRequest)
      
      clearInterval(messageInterval)
      setCourseData(fetchedData)
      setShowResults(true)
      
    } catch (error) {
      clearInterval(messageInterval)
      console.error("Failed to fetch transfer plan:", error)
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
      
      setErrorMessage("Failed to generate transfer plan. Please try again.")
    } finally {
      setIsLoading(false)
      setLoadingMessage("")
    }
  }

  return (
    <div className="app-layout">
      {/* Mobile-Friendly Sidebar Toggle Button */}
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
            <path d="M15 18l-6-6 6-6"/>
          ) : (
            <path d="M9 18l6-6-6-6"/>
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {loadingUniCol ? (
          <div className="sidebar-loading">
            <div className="loading-spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : (
          <InputFormContainer
            errorMessage={errorMessage}
            chosenCollege={chosenCollege}
            setChosenCollege={setChosenCollege}
            addNewPair={addNewPair}
            uniMajorPairs={uniMajorPairs}
            updatePair={updatePair}
            removePair={removePair}
            universities={universities}
            colleges={colleges}
            handleSearch={handleSearch}
            clearAll={clearAll}
            numberOfSemester={numberOfterm}
            setNumberOfTerm={setNumberOfTerm}
            isCompact={true}
          />
        )}
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
        {isLoading ? (
          <div className="loading-screen">
            <div className="loading-content">
              <div className="loading-animation"></div>
              <h2 className="loading-title">Creating Your Transfer Plan</h2>
              <p className="loading-subtitle">This usually takes about 20 seconds</p>
              <p className="loading-message">{loadingMessage}</p>
              <div className="loading-progress">
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        ) : !showResults ? (
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
            onDataUpdate={handleDataUpdate} 
            onClearCompleted={handleClearCompleted}
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
          top: 20px;
          left: ${sidebarOpen ? '380px' : '20px'};
          z-index: 1001;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
        }

        .sidebar-toggle:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
        }

        .sidebar-toggle:active {
          transform: translateY(0);
        }

        .toggle-icon {
          transition: transform 0.2s ease;
        }

        .sidebar {
          width: 30%;
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

        .loading-screen {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          padding: 2rem;
        }
        .loading-subtitle {
          font-size: 0.9rem;
          color: #9ca3af;
          margin: 0 0 1.5rem 0;
          font-weight: 400;
        }

        .loading-content {
          text-align: center;
          max-width: 500px;
        }

        .loading-animation {
          margin-bottom: 2rem;
          position: relative;
        }

        .loading-title {
          font-size: 2rem;
          font-weight: 500;
          color: #1a1a1a;
          margin: 0 0 1rem 0;
          letter-spacing: -0.01em;
        }

        .loading-message {
          font-size: 1.1rem;
          color: #666;
          margin: 0 0 2rem 0;
          min-height: 1.5rem;
          transition: opacity 0.3s ease;
        }

        .loading-progress {
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: #f3f4f6;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #10b981, #3b82f6);
          background-size: 200% 100%;
          animation: progressFlow 2s ease-in-out infinite;
          border-radius: 2px;
        }

        @keyframes progressFlow {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .sidebar-toggle {
            left: ${sidebarOpen ? '20px' : '20px'};
            top: 20px;
            background: ${sidebarOpen ? '#ffffff' : '#3b82f6'};
            color: ${sidebarOpen ? '#374151' : '#ffffff'};
            border-color: ${sidebarOpen ? '#e5e5e5' : '#3b82f6'};
            box-shadow: 0 4px 12px rgba(0, 0, 0, ${sidebarOpen ? '0.1' : '0.2'});
          }

          .sidebar-toggle:hover {
            background: ${sidebarOpen ? '#f3f4f6' : '#2563eb'};
            transform: scale(1.05);
          }

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
            opacity: ${sidebarOpen ? '1' : '0'};
            pointer-events: ${sidebarOpen ? 'auto' : 'none'};
            transition: opacity 0.3s ease;
          }

          .welcome-screen {
            margin: 2rem auto;
            padding: 0 1rem;
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

          .loading-title {
            font-size: 1.5rem;
          }

          .loading-message {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .sidebar-toggle {
            width: 40px;
            height: 40px;
            padding: 0.5rem;
          }

          .app-title {
            font-size: 2rem;
          }

          .app-subtitle {
            font-size: 1rem;
          }

          .quick-start {
            padding: 1.25rem;
          }

          .main-content {
            padding: 0.75rem;
          }

          .loading-screen {
            padding: 1rem;
          }
        }

        /* Tablet */
        @media (min-width: 769px) and (max-width: 1024px) {
          .sidebar-toggle {
            left: ${sidebarOpen ? '380px' : '20px'};
          }
        }
      `}</style>
    </div>
  );
}
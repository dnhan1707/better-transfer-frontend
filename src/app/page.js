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
  const [completedCourses, setCompletedCourses] = useState([]) // Array of course codes
  
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
    setCompletedCourses([]) // Clear completed courses
  }

  // Toggle course completion status
  const toggleCourseCompletion = (courseCode) => {
    setCompletedCourses(prev => {
      if (prev.includes(courseCode)) {
        // Remove from completed
        return prev.filter(code => code !== courseCode)
      } else {
        // Add to completed
        return [...prev, courseCode]
      }
    })
  }

  const handleSearch = () => {
    setErrorMessage("")
    
    if (!chosenCollege) {
      setErrorMessage("Please select a community college.")
      return
    }
    
    const validPairs = uniMajorPairs.filter(pair => pair.university && pair.major)
    
    if (validPairs.length === 0) {
      setErrorMessage("Please complete at least one university-major pair.")
      return
    }
    
    // Simulate API call - replace with actual API call later
    setCourseData(sampleData)
    setShowResults(true)
    
    console.log("College:", chosenCollege)
    console.log("University-Major Pairs:", validPairs)
    console.log("Completed Courses:", completedCourses)
  }

  return (
    <div className="page-container">
      <div className="header">
        <h1>Better Transfer</h1>
        <p>Find your perfect transfer path</p>
      </div>
      
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
      />

      {showResults && courseData && (
        <CoursePlanner 
          data={courseData}
          completedCourses={completedCourses}
          onToggleCourse={toggleCourseCompletion}
          onBack={() => setShowResults(false)}
        />
      )}

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

        @media (max-width: 768px) {
          .page-container {
            padding: 1rem;
          }
          
          .header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
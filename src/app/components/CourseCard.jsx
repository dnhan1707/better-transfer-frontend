import { useState } from 'react';
import CourseDetails from './CourseDetails';

export default function CourseCard({ course, isCompleted, onToggleComplete }) {
  const [showDetails, setShowDetails] = useState(false);

  const getDifficultyColor = (difficulty) => {
    if (difficulty <= 2) return '#28a745'; // Easy - Green
    if (difficulty <= 3) return '#ffc107'; // Medium - Yellow
    if (difficulty <= 4) return '#fd7e14'; // Hard - Orange
    return '#dc3545'; // Very Hard - Red
  };

  const getDifficultyLabel = (difficulty) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 3) return 'Medium';
    if (difficulty <= 4) return 'Hard';
    return 'Very Hard';
  };

  return (
    <>
      <div className={`course-card ${isCompleted ? 'completed' : ''}`}>
        <div className="course-header">
          <div className="course-left">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={onToggleComplete}
                className="course-checkbox"
              />
              <span className="checkmark"></span>
            </label>
            <div className="course-code">{course.code}</div>
          </div>
          <div className="course-actions">
            <div className="course-units">{course.units} units</div>
            <button 
              className="details-btn"
              onClick={() => setShowDetails(true)}
              title="View details"
            >
              <span className="dots">⋯</span>
            </button>
          </div>
        </div>
        
        <div className="course-name">{course.name}</div>
        
        <div className="course-footer">
          <div className="difficulty">
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(course.difficulty) }}
            >
              {getDifficultyLabel(course.difficulty)}
            </span>
          </div>
          
          {course.prerequisites.length > 0 && (
            <div className="has-prereqs">
              <span className="prereq-indicator">📋 Prerequisites</span>
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <CourseDetails 
          course={course}
          onClose={() => setShowDetails(false)}
        />
      )}

      <style jsx>{`
        .course-card {
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1rem;
          height: 140px;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
          position: relative;
        }

        .course-card.completed {
          background: #f8f9fa;
          border-color: #28a745;
          opacity: 0.8;
        }

        .course-card:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-color: #2c3e50;
        }

        .course-card.completed:hover {
          border-color: #28a745;
        }

        .course-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .course-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .checkbox-container {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        .course-checkbox {
          opacity: 0;
          position: absolute;
          cursor: pointer;
        }

        .checkmark {
          position: relative;
          height: 16px;
          width: 16px;
          background-color: #fff;
          border: 2px solid #dee2e6;
          border-radius: 3px;
          display: inline-block;
          transition: all 0.2s;
        }

        .checkbox-container:hover .checkmark {
          border-color: #28a745;
        }

        .course-checkbox:checked + .checkmark {
          background-color: #28a745;
          border-color: #28a745;
        }

        .course-checkbox:checked + .checkmark:after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .course-code {
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.9rem;
        }

        .course-card.completed .course-code {
          text-decoration: line-through;
          color: #6c757d;
        }

        .course-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .course-units {
          background: #e9ecef;
          color: #495057;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .course-card.completed .course-units {
          background: #28a745;
          color: white;
        }

        .details-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .details-btn:hover {
          background: #f8f9fa;
        }

        .dots {
          font-size: 16px;
          color: #6c757d;
          line-height: 1;
        }

        .course-name {
          font-size: 0.85rem;
          line-height: 1.4;
          color: #495057;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .course-card.completed .course-name {
          color: #6c757d;
          text-decoration: line-through;
        }

        .course-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .difficulty-badge {
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .prereq-indicator {
          font-size: 0.7rem;
          color: #6c757d;
          background: #fff3cd;
          padding: 2px 6px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .course-card {
            height: 120px;
            padding: 0.75rem;
          }

          .course-name {
            font-size: 0.8rem;
          }

          .checkmark {
            height: 14px;
            width: 14px;
          }

          .course-checkbox:checked + .checkmark:after {
            left: 3px;
            top: 0px;
            width: 3px;
            height: 7px;
          }
        }
      `}</style>
    </>
  );
}
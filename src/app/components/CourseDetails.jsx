export default function CourseDetails({ course, onClose }) {
  const getDifficultyColor = (difficulty) => {
    if (difficulty <= 2) return '#28a745';
    if (difficulty <= 3) return '#ffc107';
    if (difficulty <= 4) return '#fd7e14';
    return '#dc3545';
  };

  const getDifficultyLabel = (difficulty) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 3) return 'Medium';
    if (difficulty <= 4) return 'Hard';
    return 'Very Hard';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="course-info">
            <h3>{course.code}</h3>
            <span className="units">{course.units} units</span>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="course-title">
            <h4>{course.name}</h4>
          </div>

          <div className="difficulty-section">
            <span className="section-label">Difficulty:</span>
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(course.difficulty) }}
            >
              {getDifficultyLabel(course.difficulty)} ({course.difficulty}/5)
            </span>
          </div>

          {course.prerequisites.length > 0 && (
            <div className="section">
              <h5>Prerequisites</h5>
              <div className="prereq-list">
                {course.prerequisites.map((prereq, index) => (
                  <span key={index} className="prereq-item">{prereq}</span>
                ))}
              </div>
            </div>
          )}

          {course.satisfies.length > 0 && (
            <div className="section">
              <h5>Transfers To</h5>
              <div className="transfer-list">
                {course.satisfies.map((transfer, index) => (
                  <div key={index} className="transfer-item">
                    <div className="transfer-header">
                      <span className="university-name">{transfer.university}</span>
                      <span className="major-name">{transfer.major}</span>
                    </div>
                    <div className="transfer-courses">
                      <strong>Equivalent courses:</strong> {transfer.university_courses.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {course.alternatives.length > 0 && (
            <div className="section">
              <h5>Alternative Options</h5>
              <div className="alternatives-list">
                {course.alternatives.map((alt, index) => (
                  <div key={index} className="alternative-item">
                    {alt.need_placement && (
                      <span className="placement-note">
                        📝 Placement test may be required
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .course-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .course-info h3 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.2rem;
        }

        .units {
          background: #2c3e50;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6c757d;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .close-btn:hover {
          background: #e9ecef;
        }

        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          max-height: calc(80vh - 100px);
        }

        .course-title h4 {
          margin: 0 0 1rem 0;
          color: #495057;
          font-size: 1rem;
          line-height: 1.4;
        }

        .difficulty-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .section-label {
          font-weight: 500;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .difficulty-badge {
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .section {
          margin-bottom: 1.5rem;
        }

        .section h5 {
          margin: 0 0 0.75rem 0;
          color: #2c3e50;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .prereq-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .prereq-item {
          background: #ffc107;
          color: #212529;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .transfer-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .transfer-item {
          background: #e7f3ff;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #007bff;
        }

        .transfer-header {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .university-name {
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.9rem;
        }

        .major-name {
          font-size: 0.8rem;
          color: #6c757d;
          font-style: italic;
        }

        .transfer-courses {
          font-size: 0.85rem;
          color: #495057;
        }

        .alternatives-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .alternative-item {
          background: #fff3cd;
          padding: 0.75rem;
          border-radius: 6px;
          border-left: 3px solid #ffc107;
        }

        .placement-note {
          font-size: 0.85rem;
          color: #856404;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .modal-overlay {
            padding: 0.5rem;
          }

          .modal-content {
            max-height: 90vh;
          }

          .modal-header {
            padding: 1rem;
          }

          .course-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .modal-body {
            padding: 1rem;
          }

          .transfer-header {
            gap: 0.125rem;
          }
        }
      `}</style>
    </div>
  );
}
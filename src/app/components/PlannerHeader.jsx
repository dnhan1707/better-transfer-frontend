export default function PlannerHeader({ data, completedCount, totalCourses, onBack, onReorderPlan }) {
  const progressPercentage = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0;

  return (
    <div className="planner-header">
      <div className="header-actions">
        <button onClick={onBack} className="back-btn">
          ← Back to Search
        </button>
        <button onClick={onReorderPlan} className="reorder-btn">
          Re-order Plan
        </button>
      </div>
      
      <div className="header-content">
        <div className="title-section">
          <h2>Transfer Plan</h2>
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="progress-text">
              {completedCount} of {totalCourses} courses completed ({progressPercentage}%)
            </span>
          </div>
        </div>
        
        <div className="plan-info">
          <div className="info-item">
            <span className="label">From:</span>
            <span className="value">{data.source_college}</span>
          </div>
          <div className="targets">
            <span className="label">To:</span>
            <div className="target-list">
              {data.targets.map((target, index) => (
                <div key={index} className="target-item">
                  <span className="university">{target.university}</span>
                  <span className="major">{target.major}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .planner-header {
          padding: 2rem;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
        }

        .header-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .reorder-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .reorder-btn:hover {
          background: #0056b3;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
        }

        .title-section {
          margin-bottom: 1.5rem;
        }

        .header-content h2 {
          margin: 0 0 1rem 0;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .progress-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #28a745;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .plan-info {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .targets {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .label {
          font-weight: 500;
          opacity: 0.9;
        }

        .value {
          font-weight: 600;
        }

        .target-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .target-item {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 12px;
          border-radius: 6px;
        }

        .university {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .major {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .planner-header {
            padding: 1.5rem;
          }

          .header-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          .plan-info {
            flex-direction: column;
            gap: 1rem;
          }

          .header-content h2 {
            font-size: 1.5rem;
          }

          .reorder-btn {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
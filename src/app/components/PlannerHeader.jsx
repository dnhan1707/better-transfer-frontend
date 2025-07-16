export default function PlannerHeader({ data, completedCount, totalCourses, onBack, onReorderPlan }) {
  const progressPercentage = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0;
  const hasCompletedCourses = completedCount > 0;

  return (
    <div className="planner-header">
      <div className="header-main">
        <div className="plan-info">
          <div className="plan-title">
            <h3>{data.university}</h3>
            <span className="major">{data.major}</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="progress-compact">
            <span className="progress-text">{completedCount}/{totalCourses}</span>
            <div className="progress-bar-mini">
              <div 
                className="progress-fill-mini" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="progress-percent">{progressPercentage}%</span>
          </div>
          
          <button 
            className={`reorder-button ${!hasCompletedCourses ? 'disabled' : ''}`}
            onClick={hasCompletedCourses ? onReorderPlan : undefined}
            disabled={!hasCompletedCourses}
            title={hasCompletedCourses ? "Optimize plan based on completed courses" : "Mark some courses as completed to optimize"}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            </svg>
            Optimize
          </button>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .planner-header {
          background: #f8f9fa;
          border-bottom: 1px solid #e5e5e5;
          font-family: 'Inter', sans-serif;
          height: 50px;
          display: flex;
          align-items: center;
        }

        .header-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem;
          width: 100%;
          gap: 1rem;
        }

        .plan-info {
          flex: 1;
          min-width: 0;
          text-align: left;
        }

        .plan-title h3 {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .major {
          font-size: 0.75rem;
          color: #666;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          margin-top: 0.1rem;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .progress-compact {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
        }

        .progress-text {
          color: #666;
          font-weight: 500;
          font-family: 'JetBrains Mono', monospace;
        }

        .progress-bar-mini {
          width: 80px;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill-mini {
          height: 100%;
          background: #10b981;
          transition: width 0.3s ease;
          border-radius: 1.5px;
        }

        .progress-percent {
          color: #666;
          font-weight: 500;
          min-width: 28px;
          text-align: right;
        }

        .reorder-button {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.7rem;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          color: #374151;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          height: 32px;
        }

        .reorder-button:hover:not(.disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .reorder-button.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #f9fafb;
          color: #9ca3af;
          border-color: #e5e7eb;
        }

        @media (max-width: 768px) {
          .planner-header {
            height: auto;
            min-height: 50px;
          }

          .header-main {
            padding: 0.5rem 1rem;
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .plan-info {
            width: 100%;
            text-align: center;
            margin-bottom: 0.5rem;
          }

          .plan-title h3 {
            font-size: 0.85rem;
          }

          .major {
            font-size: 0.7rem;
          }

          .header-right {
            width: 100%;
            justify-content: space-between;
            gap: 0.75rem;
          }

          .progress-bar-mini {
            width: 40px;
          }

          .reorder-button {
            padding: 0.3rem 0.5rem;
            font-size: 0.7rem;
            height: 28px;
          }
        }

        @media (max-width: 480px) {
          .header-main {
            padding: 0.4rem 0.75rem;
          }

          .header-right {
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
          }

          .progress-compact {
            order: 1;
          }

          .reorder-button {
            order: 2;
            width: 100%;
            justify-content: center;
            max-width: 120px;
          }

          .progress-bar-mini {
            width: 60px;
          }
        }
      `}</style>
    </div>
  );
}
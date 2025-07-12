import TermColumn from "./TermColumn";

export default function TermGrid({ termPlan, getTermName, completedCourses, onToggleCourse }) {
  return (
    <div className="term-grid">
      <div className="grid-container">
        {termPlan.map((term) => (
          <TermColumn
            key={term.term}
            term={term}
            termName={getTermName(term.term)}
            completedCourses={completedCourses}
            onToggleCourse={onToggleCourse}
          />
        ))}
      </div>

      <style jsx>{`
        .term-grid {
          padding: 2rem;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
          max-height: 80vh;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .term-grid {
            padding: 1rem;
          }

          .grid-container {
            grid-template-columns: 1fr;
            gap: 1rem;
            max-height: none;
          }
        }
      `}</style>
    </div>
  );
}
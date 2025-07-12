import CourseCard from "./CourseCard";

export default function TermColumn({ term, termName, completedCourses, onToggleCourse }) {
  const totalUnits = term.courses.reduce((sum, course) => sum + course.units, 0);
  const completedInTerm = term.courses.filter(course => completedCourses.includes(course.code)).length;

  return (
    <div className="term-column">
      <div className="term-header">
        <h3>{termName}</h3>
        <div className="term-stats">
          <span className="course-count">{completedInTerm}/{term.courses.length} courses</span>
          <span className="unit-count">{totalUnits} units</span>
        </div>
      </div>
      
      <div className="courses-list">
        {term.courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isCompleted={completedCourses.includes(course.code)}
            onToggleComplete={() => onToggleCourse(course.code)}
          />
        ))}
      </div>

      <style jsx>{`
        .term-column {
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
          overflow: hidden;
        }

        .term-header {
          background: #2c3e50;
          color: white;
          padding: 1rem;
        }

        .term-header h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .term-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .courses-list {
          padding: 1rem;
          display: grid;
          gap: 0.75rem;
          max-height: 600px;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .courses-list {
            max-height: none;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
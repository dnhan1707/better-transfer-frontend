import PlannerHeader from "./PlannerHeader";
import TermGrid from "./TermGrid";

export default function CoursePlanner({ data, completedCourses, onToggleCourse, onBack }) {
  const getTermName = (termNumber) => {
    const terms = ['Spring', 'Summer', 'Fall', 'Winter'];
    return `${terms[(termNumber - 1) % 4]} Year ${Math.ceil(termNumber / 4)}`;
  };

  // Calculate completion statistics
  const totalCourses = data.term_plan.reduce((sum, term) => sum + term.courses.length, 0);
  const completedCount = data.term_plan.reduce((sum, term) => {
    return sum + term.courses.filter(course => completedCourses.includes(course.code)).length;
  }, 0);

  // Empty function for re-ordering - to be implemented later
  const handleReorderPlan = () => {
    console.log("Re-order plan requested");
    console.log("Completed courses:", completedCourses);
    // TODO: Implement re-ordering logic
    // This could involve:
    // - Analyzing completed courses
    // - Rearranging remaining courses based on prerequisites
    // - Optimizing course load per term
    // - Making API call to backend for new plan
  };

  return (
    <div className="course-planner">
      <PlannerHeader 
        data={data}
        completedCount={completedCount}
        totalCourses={totalCourses}
        onBack={onBack}
        onReorderPlan={handleReorderPlan}
      />
      
      <TermGrid 
        termPlan={data.term_plan}
        getTermName={getTermName}
        completedCourses={completedCourses}
        onToggleCourse={onToggleCourse}
      />

      <style jsx>{`
        .course-planner {
          max-width: 1400px;
          margin: 3rem auto 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .course-planner {
            margin: 2rem auto 0;
          }
        }
      `}</style>
    </div>
  );
}
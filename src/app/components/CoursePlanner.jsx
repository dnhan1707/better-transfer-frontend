import PlannerHeader from "./PlannerHeader";
import TermGrid from "./TermGrid";
import { fetchReOrderTransferPlan } from "../service/fetchingFunctions";

export default function CoursePlanner({ 
  data, 
  completedCourses, 
  onToggleCourse, 
  onBack, 
  onDataUpdate,
  onClearCompleted 
}) {
  const getTermName = (termNumber) => {
    const terms = ['Spring', 'Summer', 'Fall', 'Winter'];
    return `${terms[(termNumber - 1) % 4]} Year ${Math.ceil(termNumber / 4)}`;
  };

  // Calculate completion statistics
  const totalCourses = data.term_plan.reduce((sum, term) => sum + term.courses.length, 0);
  const completedCount = data.term_plan.reduce((sum, term) => {
    return sum + term.courses.filter(course => completedCourses.includes(course.code)).length;
  }, 0);

  // Helper function to flatten prerequisite/alternative objects to arrays of strings
  const flattenCourseArray = (courseArray) => {
    if (!Array.isArray(courseArray)) return [];
    
    return courseArray.flatMap(item => {
      if (typeof item === 'string') {
        return item; // Already a string
      } else if (item && item.prerequisite_courses) {
        return item.prerequisite_courses; // Extract courses from object
      } else if (item && typeof item === 'object') {
        // Handle other object structures
        return Object.values(item).filter(val => typeof val === 'string');
      }
      return []; // Skip invalid items
    });
  };

  // Helper function to clean course data for backend
  const cleanCourseData = (course) => {
    return {
      ...course,
      prerequisites: flattenCourseArray(course.prerequisites || []),
      alternatives: flattenCourseArray(course.alternatives || [])
    };
  };

  // Helper function to clean term plan
  const cleanTermPlan = (termPlan) => {
    return termPlan.map(term => ({
      ...term,
      courses: term.courses.map(cleanCourseData)
    }));
  };

  const handleReorderPlan = async () => {
    try {
      // Clean the data to match backend expectations
      const cleanedTermPlan = cleanTermPlan(data.term_plan);
      
      // Build the request in the exact format the backend expects
      const reOrderRequest = {
        original_plan: {
          targets: data.targets || [],
          source_college: data.source_college || "",
          term_plan: cleanedTermPlan,
          unscheduled_courses: data.unscheduled_courses ? 
            data.unscheduled_courses.map(cleanCourseData) : []
        },
        taken_classes: completedCourses
      };

      const res = await fetchReOrderTransferPlan(reOrderRequest);

      // Update the data in the parent component
      onDataUpdate(res);
      // Clear completed courses
      onClearCompleted();
    } catch (error) {
      console.error("Error fetching data in handleReorderPlan:", error);
      // You might want to show a user-friendly error message here
    }
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
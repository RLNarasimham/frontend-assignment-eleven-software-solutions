import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit2, Trash2, Plus } from 'lucide-react';

export const CourseOfferings = () => {
  const {
    state,
    addCourseOffering,
    updateCourseOffering,
    deleteCourseOffering,
    getCourseById,
    getCourseTypeById,
  } = useApp();

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCourse, setEditCourse] = useState('');
  const [editCourseType, setEditCourseType] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!selectedCourse) {
      setError('Please select a course');
      return;
    }
    if (!selectedCourseType) {
      setError('Please select a course type');
      return;
    }

    const exists = state.courseOfferings.some(
      (co) => co.courseId === selectedCourse && co.courseTypeId === selectedCourseType
    );
    if (exists) {
      setError('This course offering already exists');
      return;
    }

    addCourseOffering(selectedCourse, selectedCourseType);
    setSelectedCourse('');
    setSelectedCourseType('');
    setError('');
  };

  const handleUpdate = (id: string) => {
    if (!editCourse) {
      setError('Please select a course');
      return;
    }
    if (!editCourseType) {
      setError('Please select a course type');
      return;
    }

    const exists = state.courseOfferings.some(
      (co) => co.id !== id && co.courseId === editCourse && co.courseTypeId === editCourseType
    );
    if (exists) {
      setError('This course offering already exists');
      return;
    }

    updateCourseOffering(id, editCourse, editCourseType);
    setEditingId(null);
    setEditCourse('');
    setEditCourseType('');
    setError('');
  };

  const handleDelete = (id: string) => {
    const registrations = state.studentRegistrations.filter(
      (sr) => sr.courseOfferingId === id
    );
    if (registrations.length > 0) {
      if (!window.confirm(`This will delete ${registrations.length} student registration(s). Continue?`)) {
        return;
      }
    }
    deleteCourseOffering(id);
  };

  const startEdit = (id: string, courseId: string, courseTypeId: string) => {
    setEditingId(id);
    setEditCourse(courseId);
    setEditCourseType(courseTypeId);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCourse('');
    setEditCourseType('');
    setError('');
  };

  const getOfferingName = (courseId: string, courseTypeId: string) => {
    const course = getCourseById(courseId);
    const courseType = getCourseTypeById(courseTypeId);
    return `${courseType?.name || 'Unknown'} - ${course?.name || 'Unknown'}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Course Offerings</h2>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add New Course Offering
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation bg-white"
            >
              <option value="">Select Course</option>
              {state.courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <select
              value={selectedCourseType}
              onChange={(e) => setSelectedCourseType(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation bg-white"
            >
              <option value="">Select Course Type</option>
              {state.courseTypes.map((courseType) => (
                <option key={courseType.id} value={courseType.id}>
                  {courseType.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={(e) => {
              if (state.courses.length === 0 || state.courseTypes.length === 0) return;
              e.preventDefault();
              e.stopPropagation();
              handleAdd();
            }}
            disabled={state.courses.length === 0 || state.courseTypes.length === 0}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:pointer-events-none font-medium text-sm sm:text-base touch-manipulation min-h-[44px] sm:min-h-0 cursor-pointer relative z-10"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            <span>Add Course Offering</span>
          </button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {state.courses.length === 0 && (
            <p className="text-amber-600 text-sm mt-2">Please add courses first</p>
          )}
          {state.courseTypes.length === 0 && (
            <p className="text-amber-600 text-sm mt-2">Please add course types first</p>
          )}
        </div>

        <div className="space-y-2 sm:space-y-3">
          {state.courseOfferings.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm sm:text-base">No course offerings added yet</p>
          ) : (
            state.courseOfferings.map((offering) => (
              <div
                key={offering.id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {editingId === offering.id ? (
                  <>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                      <select
                        value={editCourse}
                        onChange={(e) => setEditCourse(e.target.value)}
                        className="px-3 py-2.5 sm:py-2 text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation bg-white"
                      >
                        <option value="">Select Course</option>
                        {state.courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={editCourseType}
                        onChange={(e) => setEditCourseType(e.target.value)}
                        className="px-3 py-2.5 sm:py-2 text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation bg-white"
                      >
                        <option value="">Select Course Type</option>
                        {state.courseTypes.map((courseType) => (
                          <option key={courseType.id} value={courseType.id}>
                            {courseType.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleUpdate(offering.id);
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 sm:py-1 bg-green-600 text-white rounded hover:bg-green-700 active:bg-green-800 transition-colors font-medium text-sm sm:text-base touch-manipulation min-h-[44px] sm:min-h-0 cursor-pointer relative z-10"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          cancelEdit();
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 sm:py-1 bg-gray-600 text-white rounded hover:bg-gray-700 active:bg-gray-800 transition-colors font-medium text-sm sm:text-base touch-manipulation min-h-[44px] sm:min-h-0 cursor-pointer relative z-10"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-gray-800 font-medium text-sm sm:text-base break-words">
                      {getOfferingName(offering.courseId, offering.courseTypeId)}
                    </span>
                    <div className="flex gap-2 sm:flex-shrink-0 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          startEdit(offering.id, offering.courseId, offering.courseTypeId);
                        }}
                        className="p-2.5 sm:p-2 text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center cursor-pointer relative z-10"
                        title="Edit"
                        aria-label="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(offering.id);
                        }}
                        className="p-2.5 sm:p-2 text-red-600 hover:bg-red-50 active:bg-red-100 rounded transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center cursor-pointer relative z-10"
                        title="Delete"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserPlus, Users, Filter } from 'lucide-react';

export const StudentRegistration = () => {
  const {
    state,
    addStudentRegistration,
    getCourseById,
    getCourseTypeById,
  } = useApp();

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');
  const [filterCourseType, setFilterCourseType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [viewMode, setViewMode] = useState<'register' | 'view'>('register');

  const handleRegister = () => {
    if (!studentName.trim()) {
      setError('Student name is required');
      return;
    }
    if (!studentEmail.trim()) {
      setError('Student email is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!selectedOffering) {
      setError('Please select a course offering');
      return;
    }

    addStudentRegistration(studentName.trim(), studentEmail.trim(), selectedOffering);
    setSuccess(`Successfully registered ${studentName} for the course!`);
    setStudentName('');
    setStudentEmail('');
    setSelectedOffering('');
    setError('');

    setTimeout(() => setSuccess(''), 3000);
  };

  const getOfferingName = (courseId: string, courseTypeId: string) => {
    const course = getCourseById(courseId);
    const courseType = getCourseTypeById(courseTypeId);
    return `${courseType?.name || 'Unknown'} - ${course?.name || 'Unknown'}`;
  };

  const filteredOfferings = filterCourseType
    ? state.courseOfferings.filter((co) => co.courseTypeId === filterCourseType)
    : state.courseOfferings;

  const getRegistrationsForOffering = (offeringId: string) => {
    return state.studentRegistrations.filter((sr) => sr.courseOfferingId === offeringId);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors">Student Registration</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setViewMode('register');
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base touch-manipulation min-h-[44px] sm:min-h-0 cursor-pointer relative z-10 ${
                viewMode === 'register'
                  ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500'
              }`}
            >
              <UserPlus size={18} />
              <span>Register</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setViewMode('view');
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base touch-manipulation min-h-[44px] sm:min-h-0 cursor-pointer relative z-10 ${
                viewMode === 'view'
                  ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500'
              }`}
            >
              <Users size={18} />
              <span>View All</span>
            </button>
          </div>
        </div>

        {viewMode === 'register' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                Student Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                Student Email
              </label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="Enter student email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors">
                <Filter size={16} />
                Filter by Course Type
              </label>
              <select
                value={filterCourseType}
                onChange={(e) => {
                  setFilterCourseType(e.target.value);
                  setSelectedOffering('');
                }}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3 touch-manipulation bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
              >
                <option value="">All Course Types</option>
                {state.courseTypes.map((courseType) => (
                  <option key={courseType.id} value={courseType.id}>
                    {courseType.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                Select Course Offering
              </label>
              <select
                value={selectedOffering}
                onChange={(e) => setSelectedOffering(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
              >
                <option value="">Select a course offering</option>
                {filteredOfferings.map((offering) => (
                  <option key={offering.id} value={offering.id}>
                    {getOfferingName(offering.courseId, offering.courseTypeId)}
                  </option>
                ))}
              </select>
              {filterCourseType && filteredOfferings.length === 0 && (
                <p className="text-amber-600 dark:text-amber-400 text-sm mt-2 transition-colors">
                  No course offerings available for the selected course type
                </p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg transition-colors">
                <p className="text-red-600 dark:text-red-400 text-sm transition-colors">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg transition-colors">
                <p className="text-green-600 dark:text-green-400 text-sm transition-colors">{success}</p>
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                if (state.courseOfferings.length === 0) return;
                e.preventDefault();
                e.stopPropagation();
                handleRegister();
              }}
              disabled={state.courseOfferings.length === 0}
              className="w-full px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:pointer-events-none font-medium text-sm sm:text-base touch-manipulation min-h-[44px] cursor-pointer relative z-10"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <UserPlus size={18} className="sm:w-5 sm:h-5" />
              <span>Register Student</span>
            </button>

            {state.courseOfferings.length === 0 && (
              <p className="text-amber-600 dark:text-amber-400 text-sm text-center transition-colors">
                Please add course offerings before registering students
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {state.courseOfferings.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8 text-sm sm:text-base transition-colors">No course offerings available</p>
            ) : (
              state.courseOfferings.map((offering) => {
                const registrations = getRegistrationsForOffering(offering.id);
                return (
                  <div key={offering.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 transition-colors">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3 break-words transition-colors">
                      {getOfferingName(offering.courseId, offering.courseTypeId)}
                    </h3>
                    {registrations.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-sm italic transition-colors">No students registered yet</p>
                    ) : (
                      <div className="space-y-2">
                        {registrations.map((registration) => (
                          <div
                            key={registration.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded gap-2 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 dark:text-gray-100 text-sm sm:text-base break-words transition-colors">{registration.studentName}</p>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-all transition-colors">{registration.studentEmail}</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 sm:ml-4 transition-colors">
                              {new Date(registration.registeredAt).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 transition-colors">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors">
                        Total Students: <span className="font-semibold">{registrations.length}</span>
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

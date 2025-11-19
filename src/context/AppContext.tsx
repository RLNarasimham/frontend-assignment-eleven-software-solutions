import { createContext, useContext, ReactNode } from 'react';
import { AppState, CourseType, Course, CourseOffering, StudentRegistration } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateUUID } from '../utils/uuid';

interface AppContextType {
  state: AppState;
  addCourseType: (name: string) => void;
  updateCourseType: (id: string, name: string) => void;
  deleteCourseType: (id: string) => void;
  addCourse: (name: string) => void;
  updateCourse: (id: string, name: string) => void;
  deleteCourse: (id: string) => void;
  addCourseOffering: (courseId: string, courseTypeId: string) => void;
  updateCourseOffering: (id: string, courseId: string, courseTypeId: string) => void;
  deleteCourseOffering: (id: string) => void;
  addStudentRegistration: (studentName: string, studentEmail: string, courseOfferingId: string) => void;
  getCourseById: (id: string) => Course | undefined;
  getCourseTypeById: (id: string) => CourseType | undefined;
  getCourseOfferingById: (id: string) => CourseOffering | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { state, setState } = useLocalStorage();

  const addCourseType = (name: string) => {
    const newCourseType: CourseType = {
      id: generateUUID(),
      name,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      courseTypes: [...prev.courseTypes, newCourseType],
    }));
  };

  const updateCourseType = (id: string, name: string) => {
    setState((prev) => ({
      ...prev,
      courseTypes: prev.courseTypes.map((ct) =>
        ct.id === id ? { ...ct, name } : ct
      ),
    }));
  };

  const deleteCourseType = (id: string) => {
    const offeringsToDelete = state.courseOfferings.filter(
      (co) => co.courseTypeId === id
    );
    const offeringIds = offeringsToDelete.map((co) => co.id);

    setState((prev) => ({
      ...prev,
      courseTypes: prev.courseTypes.filter((ct) => ct.id !== id),
      courseOfferings: prev.courseOfferings.filter((co) => co.courseTypeId !== id),
      studentRegistrations: prev.studentRegistrations.filter(
        (sr) => !offeringIds.includes(sr.courseOfferingId)
      ),
    }));
  };

  const addCourse = (name: string) => {
    const newCourse: Course = {
      id: generateUUID(),
      name,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      courses: [...prev.courses, newCourse],
    }));
  };

  const updateCourse = (id: string, name: string) => {
    setState((prev) => ({
      ...prev,
      courses: prev.courses.map((c) =>
        c.id === id ? { ...c, name } : c
      ),
    }));
  };

  const deleteCourse = (id: string) => {
    const offeringsToDelete = state.courseOfferings.filter(
      (co) => co.courseId === id
    );
    const offeringIds = offeringsToDelete.map((co) => co.id);

    setState((prev) => ({
      ...prev,
      courses: prev.courses.filter((c) => c.id !== id),
      courseOfferings: prev.courseOfferings.filter((co) => co.courseId !== id),
      studentRegistrations: prev.studentRegistrations.filter(
        (sr) => !offeringIds.includes(sr.courseOfferingId)
      ),
    }));
  };

  const addCourseOffering = (courseId: string, courseTypeId: string) => {
    const newOffering: CourseOffering = {
      id: generateUUID(),
      courseId,
      courseTypeId,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      courseOfferings: [...prev.courseOfferings, newOffering],
    }));
  };

  const updateCourseOffering = (id: string, courseId: string, courseTypeId: string) => {
    setState((prev) => ({
      ...prev,
      courseOfferings: prev.courseOfferings.map((co) =>
        co.id === id ? { ...co, courseId, courseTypeId } : co
      ),
    }));
  };

  const deleteCourseOffering = (id: string) => {
    setState((prev) => ({
      ...prev,
      courseOfferings: prev.courseOfferings.filter((co) => co.id !== id),
      studentRegistrations: prev.studentRegistrations.filter(
        (sr) => sr.courseOfferingId !== id
      ),
    }));
  };

  const addStudentRegistration = (studentName: string, studentEmail: string, courseOfferingId: string) => {
    const newRegistration: StudentRegistration = {
      id: generateUUID(),
      studentName,
      studentEmail,
      courseOfferingId,
      registeredAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      studentRegistrations: [...prev.studentRegistrations, newRegistration],
    }));
  };

  const getCourseById = (id: string) => state.courses.find((c) => c.id === id);
  const getCourseTypeById = (id: string) => state.courseTypes.find((ct) => ct.id === id);
  const getCourseOfferingById = (id: string) => state.courseOfferings.find((co) => co.id === id);

  return (
    <AppContext.Provider
      value={{
        state,
        addCourseType,
        updateCourseType,
        deleteCourseType,
        addCourse,
        updateCourse,
        deleteCourse,
        addCourseOffering,
        updateCourseOffering,
        deleteCourseOffering,
        addStudentRegistration,
        getCourseById,
        getCourseTypeById,
        getCourseOfferingById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

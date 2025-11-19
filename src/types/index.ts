export interface CourseType {
  id: string;
  name: string;
  createdAt: string;
}

export interface Course {
  id: string;
  name: string;
  createdAt: string;
}

export interface CourseOffering {
  id: string;
  courseId: string;
  courseTypeId: string;
  createdAt: string;
}

export interface StudentRegistration {
  id: string;
  studentName: string;
  studentEmail: string;
  courseOfferingId: string;
  registeredAt: string;
}

export interface AppState {
  courseTypes: CourseType[];
  courses: Course[];
  courseOfferings: CourseOffering[];
  studentRegistrations: StudentRegistration[];
}

import { useState, useEffect } from 'react';
import { AppState } from '../types';

const STORAGE_KEY = 'student-registration-system';

const defaultState: AppState = {
  courseTypes: [],
  courses: [],
  courseOfferings: [],
  studentRegistrations: [],
};

export const useLocalStorage = () => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [state]);

  return { state, setState };
};

import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { CourseTypes } from './components/CourseTypes';
import { Courses } from './components/Courses';
import { CourseOfferings } from './components/CourseOfferings';
import { StudentRegistration } from './components/StudentRegistration';

function App() {
  const [activeTab, setActiveTab] = useState('course-types');

  const renderContent = () => {
    switch (activeTab) {
      case 'course-types':
        return <CourseTypes />;
      case 'courses':
        return <Courses />;
      case 'course-offerings':
        return <CourseOfferings />;
      case 'registration':
        return <StudentRegistration />;
      default:
        return <CourseTypes />;
    }
  };

  return (
    <AppProvider>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </Layout>
    </AppProvider>
  );
}

export default App;

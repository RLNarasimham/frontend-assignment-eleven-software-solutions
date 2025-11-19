import { ReactNode, useState } from "react";
import { Menu, X, BookOpen, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "course-types", label: "Course Types" },
  { id: "courses", label: "Courses" },
  { id: "course-offerings", label: "Course Offerings" },
  { id: "registration", label: "Student Registration" },
];

export const Layout = ({ children, activeTab, onTabChange }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    onTabChange("course-types");
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <BookOpen className="text-blue-600 dark:text-blue-400 flex-shrink-0 transition-colors" size={28} />
              <h1
                className="text-base sm:text-lg md:text-xl lg:text-2xl cursor-pointer font-bold text-gray-800 dark:text-gray-100 truncate touch-manipulation transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleHomeClick();
                }}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Student Registration System
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTheme();
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 transition-colors touch-manipulation flex-shrink-0 cursor-pointer relative z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle theme"
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-gray-700 dark:text-gray-200" />
                ) : (
                  <Sun size={20} className="text-yellow-500 dark:text-yellow-400" />
                )}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 transition-colors touch-manipulation flex-shrink-0 cursor-pointer relative z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={24} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>

            <div className="hidden lg:flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTabClick(tab.id);
                  }}
                  className={`px-3 xl:px-4 py-2 rounded-lg font-medium transition-colors text-sm xl:text-base whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-blue-600 dark:bg-blue-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 transition-colors">
              <div className="flex flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabClick(tab.id);
                    }}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors text-left touch-manipulation cursor-pointer relative z-10 min-h-[44px] flex items-center ${
                      activeTab === tab.id
                        ? "bg-blue-600 dark:bg-blue-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200 mt-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm transition-colors">
            Student Registration System 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

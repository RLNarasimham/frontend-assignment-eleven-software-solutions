import { ReactNode, useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

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

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    onTabChange("course-types");
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <BookOpen className="text-blue-600 flex-shrink-0" size={28} />
              <h1
                className="text-base sm:text-lg md:text-xl lg:text-2xl cursor-pointer font-bold text-gray-800 truncate touch-manipulation"
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

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation flex-shrink-0 cursor-pointer relative z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

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
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-200 mt-2 pt-2">
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
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
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

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            Student Registration System 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

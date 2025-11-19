import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit2, Trash2, Plus } from 'lucide-react';

export const CourseTypes = () => {
  const { state, addCourseType, updateCourseType, deleteCourseType } = useApp();
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) {
      setError('Course type name is required');
      return;
    }
    if (state.courseTypes.some(ct => ct.name.toLowerCase() === newName.trim().toLowerCase())) {
      setError('Course type already exists');
      return;
    }
    addCourseType(newName.trim());
    setNewName('');
    setError('');
  };

  const handleUpdate = (id: string) => {
    if (!editingName.trim()) {
      setError('Course type name is required');
      return;
    }
    if (state.courseTypes.some(ct => ct.id !== id && ct.name.toLowerCase() === editingName.trim().toLowerCase())) {
      setError('Course type already exists');
      return;
    }
    updateCourseType(id, editingName.trim());
    setEditingId(null);
    setEditingName('');
    setError('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure? This will delete all related course offerings and student registrations.')) {
      deleteCourseType(id);
    }
  };

  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setError('');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Course Types</h2>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add New Course Type
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="e.g., Individual, Group, Special"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAdd();
              }}
              className="px-4 sm:px-6 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base touch-manipulation min-h-[44px] sm:min-h-0 cursor-pointer relative z-10"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Plus size={18} className="sm:w-5 sm:h-5" />
              <span>Add</span>
            </button>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        <div className="space-y-2 sm:space-y-3">
          {state.courseTypes.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm sm:text-base">No course types added yet</p>
          ) : (
            state.courseTypes.map((courseType) => (
              <div
                key={courseType.id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {editingId === courseType.id ? (
                  <>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleUpdate(courseType.id)}
                      className="flex-1 px-3 py-2.5 sm:py-2 text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation"
                      autoFocus
                    />
                    <div className="flex gap-2 sm:flex-shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleUpdate(courseType.id);
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
                    <span className="flex-1 text-gray-800 font-medium text-sm sm:text-base break-words">{courseType.name}</span>
                    <div className="flex gap-2 sm:flex-shrink-0 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          startEdit(courseType.id, courseType.name);
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
                          handleDelete(courseType.id);
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

// DragDropExample.tsx
import React, { useState } from 'react';
import { DragDropProvider } from '../components/DragDrop/DragDropContext';
import { Draggable, DragHandle } from '../components/DragDrop/Draggable';
import { Droppable } from '../components/DragDrop/Droppable';
import { Sortable } from '../components/DragDrop/Sortable';
import { DragOverlay } from '../components/DragDrop/DragOverlay';
import { DragEndEvent, DragStartEvent, DragItem } from '../components/DragDrop/types';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export const DragDropExample: React.FC = () => {
  // Initial data for the kanban board
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 'task-1', title: 'Research competitors', description: 'Analyze top 5 competitor products', priority: 'high' },
        { id: 'task-2', title: 'User interviews', description: 'Schedule calls with 10 potential users', priority: 'medium' },
        { id: 'task-3', title: 'Setup analytics', description: 'Implement tracking for key metrics', priority: 'low' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: 'task-4', title: 'UI design', description: 'Create wireframes for main screens', priority: 'high' },
        { id: 'task-5', title: 'API documentation', description: 'Document endpoints and parameters', priority: 'medium' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 'task-6', title: 'Project setup', description: 'Initialize repository and tooling', priority: 'medium' },
        { id: 'task-7', title: 'Team onboarding', description: 'Brief team members on project goals', priority: 'high' },
      ],
    },
  ]);

  // Current task being dragged
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { item } = event;
    if (item.type === 'task') {
      // Find the task that's being dragged
      for (const column of columns) {
        const task = column.tasks.find(t => t.id === item.id);
        if (task) {
          setDraggingTask(task);
          break;
        }
      }
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { item, over } = event;
    
    if (!over || !item) {
      setDraggingTask(null);
      return;
    }

    if (item.type === 'task') {
      // Extract column ID from the droppable ID
      const targetColumnId = over.id.replace('column-', '');
      
      // Find the source column and task
      let sourceColumnIndex = -1;
      let taskIndex = -1;
      
      for (let i = 0; i < columns.length; i++) {
        const taskIdx = columns[i].tasks.findIndex(t => t.id === item.id);
        if (taskIdx !== -1) {
          sourceColumnIndex = i;
          taskIndex = taskIdx;
          break;
        }
      }
      
      if (sourceColumnIndex !== -1 && taskIndex !== -1) {
        // Create a copy of the columns
        const newColumns = [...columns];
        
        // Remove the task from the source column
        const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(taskIndex, 1);
        
        // Find the target column index
        const targetColumnIndex = newColumns.findIndex(col => col.id === targetColumnId);
        
        if (targetColumnIndex !== -1) {
          // Add the task to the target column
          newColumns[targetColumnIndex].tasks.push(movedTask);
          
          // Update the state
          setColumns(newColumns);
        }
      }
    }
    
    // Reset dragging task
    setDraggingTask(null);
  };

  // Handle task reordering within a column
  const handleReorderTasks = (columnId: string, newTasks: Task[]) => {
    const newColumns = columns.map(column => {
      if (column.id === columnId) {
        return { ...column, tasks: newTasks };
      }
      return column;
    });
    
    setColumns(newColumns);
  };

  // Handle new task creation
  const handleNewTaskDrop = (targetColumnId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`, // Generate a unique ID
      title: 'New Task',
      description: 'Task description',
      priority: 'medium'
    };
    
    const newColumns = columns.map(column => {
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, newTask]
        };
      }
      return column;
    });
    
    setColumns(newColumns);
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Drag & Drop Kanban Board</h1>
        
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {columns.map(column => (
            <Droppable
              key={column.id}
              id={`column-${column.id}`}
              type="column"
              accept={["task", "new-task"]}
              className="bg-white rounded-lg shadow-md flex-shrink-0 w-80"
              onDrop={() => {
                if (draggingTask && draggingTask.id === 'new-task') {
                  handleNewTaskDrop(column.id);
                }
              }}
            >
              {({ isOver, canDrop }) => (
                <div
                  className={`h-full p-4 rounded-lg transition-colors ${
                    isOver && canDrop ? 'bg-blue-50' : ''
                  }`}
                >
                  <h2 className="font-bold text-lg mb-4 text-gray-700">{column.title}</h2>
                  
                  <Sortable
                    items={column.tasks}
                    keyExtractor={(task) => task.id}
                    onReorder={(newTasks) => handleReorderTasks(column.id, newTasks)}
                    className="space-y-3"
                  >
                    {(task, { isDragging, dragHandleProps }) => (
                      <div
                        className={`bg-white border rounded-md p-3 shadow-sm ${
                          isDragging ? 'opacity-50' : 'opacity-100'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800">{task.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          </div>
                          
                          {/* Drag handle */}
                          <DragHandle className="cursor-grab text-gray-400 hover:text-gray-600 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="8" cy="6" r="2" />
                              <circle cx="8" cy="12" r="2" />
                              <circle cx="8" cy="18" r="2" />
                              <circle cx="16" cy="6" r="2" />
                              <circle cx="16" cy="12" r="2" />
                              <circle cx="16" cy="18" r="2" />
                            </svg>
                          </DragHandle>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <span className={`text-xs text-white font-medium px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    )}
                  </Sortable>
                </div>
              )}
            </Droppable>
          ))}
        </div>
        
        {/* Example of a standalone draggable element */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Task</h2>
          
          <Draggable
            id="new-task"
            type="new-task"
            data={{ title: "New Task", description: "Drag me to a column", priority: "medium" }}
            className="bg-white border border-gray-300 rounded-md p-4 shadow-md w-64 cursor-grab hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
              <span className="font-medium">Create New Task</span>
            </div>
          </Draggable>
        </div>
        
        {/* Drag overlay for better UX during dragging */}
        <DragOverlay>
          {(props) => (
            draggingTask && (
              <div className="bg-white border rounded-md p-3 shadow-lg w-72">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{draggingTask.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{draggingTask.description}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <span className={`text-xs text-white font-medium px-2 py-1 rounded-full ${getPriorityColor(draggingTask.priority)}`}>
                    {draggingTask.priority}
                  </span>
                </div>
              </div>
            )
          )}
        </DragOverlay>
      </div>
    </DragDropProvider>
  );
};

export default DragDropExample;
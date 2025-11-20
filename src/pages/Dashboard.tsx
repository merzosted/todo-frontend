/**
 * Dashboard Component
 * Main application interface for managing todos
 * Features: Create, Read, Update, Delete, and Toggle todo completion
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/authStore';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo, useToggleTodo } from '../hooks/useTodos';
import { createTodoSchema, CreateTodoInput, Todo } from '../schemas/todo.schema';

export default function Dashboard() {
  // Get user data and logout function from Zustand store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  
  // Local state for managing todo editing
  const [editingId, setEditingId] = useState<string | null>(null); // ID of todo being edited
  const [editTitle, setEditTitle] = useState(''); // Temporary title during editing

  // React Query hooks for todo operations
  const { data: todos, isLoading } = useTodos(); // Fetch all todos with automatic caching
  const { mutate: createTodo } = useCreateTodo(); // Create new todo mutation
  const { mutate: updateTodo } = useUpdateTodo(); // Update todo mutation
  const { mutate: deleteTodo } = useDeleteTodo(); // Delete todo mutation
  const { mutate: toggleTodo } = useToggleTodo(); // Toggle completion mutation

  // React Hook Form setup with Zod validation
  const {
    register, // Register input fields
    handleSubmit, // Handle form submission
    reset, // Reset form after submission
    formState: { errors }, // Form validation errors
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema), // Use Zod schema for validation
  });

  /**
   * Handle new todo creation
   * Submits form data and resets form on success
   */
  const onSubmit = (data: CreateTodoInput) => {
    createTodo(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  /**
   * Enter edit mode for a todo
   * Sets the todo ID and populates edit input with current title
   */
  const handleEdit = (todo: Todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
  };

  /**
   * Save edited todo
   * Updates todo in database and exits edit mode on success
   */
  const handleUpdate = (id: string) => {
    if (editTitle.trim()) {
      updateTodo(
        { id, data: { title: editTitle } },
        {
          onSuccess: () => {
            setEditingId(null); // Exit edit mode
            setEditTitle(''); // Clear edit input
          },
        }
      );
    }
  };

  /**
   * Cancel editing
   * Exits edit mode without saving changes
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>📝 Todo App</h1>
          </div>
          <div className="navbar-user">
            {user && (
              <div className="navbar-user-info">
                <span className="navbar-user-name">Welcome back, {user.name}! 👋</span>
                <span className="navbar-user-email">{user.email}</span>
              </div>
            )}
            <button onClick={logout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Create Todo Form */}
        <div className="todo-form-card">
          <h3>✨ Add New Todo</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
            <div style={{ flex: 1 }}>
              <input
                {...register('title')}
                placeholder="What needs to be done?"
                className="form-input"
                style={{ marginBottom: errors.title ? '4px' : '0' }}
              />
              {errors.title && (
                <span className="error-message">{errors.title.message}</span>
              )}
            </div>
            <button type="submit" className="btn-add">
              Add Todo
            </button>
          </form>
        </div>

        {/* Todos List */}
        <div className="todos-section">
          <div className="todos-header">
            <h3>Your Tasks</h3>
            <span className="todos-count">{todos?.length || 0}</span>
          </div>

          {isLoading && (
            <div className="loading-state">
              <p>Loading your todos...</p>
            </div>
          )}

          {!isLoading && todos && todos.length === 0 && (
            <div className="empty-state">
              <p>🎉 No todos yet. Create one above to get started!</p>
            </div>
          )}

          {todos && todos.length > 0 && (
            <div className="todos-list">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo._id)}
                    className="todo-checkbox"
                  />

                  {editingId === todo._id ? (
                    <div className="todo-edit-wrapper">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="todo-edit-input"
                        autoFocus
                      />
                      <div className="todo-edit-actions">
                        <button onClick={() => handleUpdate(todo._id)} className="btn-save">
                          Save
                        </button>
                        <button onClick={handleCancelEdit} className="btn-cancel">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.title}
                      </span>
                      <div className="todo-actions">
                        <button onClick={() => handleEdit(todo)} className="btn-edit">
                          Edit
                        </button>
                        <button onClick={() => deleteTodo(todo._id)} className="btn-delete">
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

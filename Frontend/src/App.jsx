import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const BASE_URL = "https://backend-todo-api.vercel.app";
  const [darkMode, setDarkMode] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await axios(`${BASE_URL}/get-all-todos`);
      setTodos(response?.data?.data || []);
    } catch (error) {
      toast.error("Todos not found");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return toast.error("Todo content is required");
    try {
      await axios.post(`${BASE_URL}/add-todo`, { todo: newTodo });
      setNewTodo(""); // Clear input
      getTodos(); // Refresh todos
    } catch (error) {
      toast.error("Error adding todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-todo/${id}`);
      getTodos(); // Refresh todos
      toast("Todo Deleted");
    } catch (error) {
      toast.error("Error deleting todo");
    }
  };

  const editTodo = async (id, updatedContent) => {
    try {
      await axios.patch(`${BASE_URL}/edit-todo/${id}`, {
        todo: updatedContent,
      });
      getTodos(); // Refresh todos
      toast.success("Todo Edited");
    } catch (error) {
      toast.error("Todo content is required");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "e" || e.key === "E" || e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div
          className={`shadow-lg rounded-lg w-full max-w-md transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <header
            className={`text-center py-4 rounded-t-lg transition-colors duration-300 ${
              darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"
            }`}
          >
            <h1 className="text-2xl font-semibold">Todo App</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mt-2 px-4 py-2 text-sm rounded-md border focus:outline-none focus:ring-2"
            >
              Toggle {darkMode ? "Light" : "Dark"} Mode
            </button>
          </header>

          <div className="p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a new task..."
                className={`flex-1 px-4 py-2 border rounded-md ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              />
              <button
                type="button"
                onClick={addTodo}
                className="px-4 py-2 rounded-md bg-blue-500 text-white"
              >
                Add
              </button>
            </div>

            {loading ? (
              <div className="text-center mt-4">Loading...</div>
            ) : (
              <ul className="mt-6 space-y-4">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`flex items-center justify-between p-3 rounded-md shadow-sm ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <span>{todo.todoContent}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          editTodo(
                            todo.id,
                            prompt("Edit Todo:", todo.todoContent)
                          )
                        }
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <footer className="text-center py-2">
            <p className="text-sm">&copy; 2025 Todo App</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

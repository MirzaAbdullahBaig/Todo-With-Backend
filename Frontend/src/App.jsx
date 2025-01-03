import React, { useState } from "react";


function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
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
            className={`mt-2 px-4 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 ${
              darkMode
                ? "border-gray-500 text-gray-100 hover:bg-gray-600"
                : "border-blue-100 text-blue-100 hover:bg-blue-600"
            }`}
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </header>

        <div className="p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add a new task..."
              className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-gray-500"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
              }`}
            />
            <button
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-600 text-gray-100 hover:bg-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Add
            </button>
          </div>

          <ul className="mt-6 space-y-4">
            {/* Example of Todo Item */}
            {["Buy groceries", "Walk the dog", "Read a book"].map(
              (todo, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-md shadow-sm transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <span>{todo}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className={`transition-colors duration-300 ${
                        darkMode
                          ? "text-gray-300 hover:text-gray-100"
                          : "text-blue-500 hover:text-blue-600"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      className={`transition-colors duration-300 ${
                        darkMode
                          ? "text-red-400 hover:text-red-500"
                          : "text-red-500 hover:text-red-600"
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>

        <footer
          className={`text-center py-2 rounded-b-lg transition-colors duration-300 ${
            darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"
          }`}
        >
          <p className="text-sm">&copy; 2025 Todo App</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

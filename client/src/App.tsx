import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Election Tracker Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Real-time election tracking and candidate management platform
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Elections</h3>
            <p className="text-gray-600">Track elections across all levels</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Candidates</h3>
            <p className="text-gray-600">Manage candidate information</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">Real-time voter insights</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
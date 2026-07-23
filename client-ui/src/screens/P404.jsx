import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-indigo-700">
      <div className="text-center text-white px-6 py-12 bg-opacity-75 rounded-lg shadow-xl">
        <h1 className="text-9xl font-extrabold leading-none mb-4">404</h1>
        <p className="text-3xl font-semibold mb-6">Oops! We can't seem to find that page.</p>
        <p className="text-lg mb-6">The page you're looking for has either been moved or doesn't exist.</p>
        <a 
          href="/" 
          className="inline-block px-8 py-4 bg-indigo-800 text-white font-semibold rounded-lg text-xl transition-all hover:bg-indigo-700 hover:scale-105"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;

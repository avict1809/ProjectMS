import React from 'react';
const date = new Date();
const year = date.getFullYear()

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-black">
      <div className="text-center text-white">
        <h1 className="text-9xl font-extrabold leading-tight tracking-wide text-shadow-xl">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-white opacity-80">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <a
            href="/dashboard"
            className="text-lg font-semibold text-blue-400 hover:text-blue-600 transition duration-300 transform hover:scale-105"
          >
            Go Back Home
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-white opacity-50">
      <span className="font-bold text-md">
            <span className="text-blue-500">Arusha</span>&nbsp;<span className="text-yellow-500">Science</span>  &copy; {year}
          </span>
      </div>
    </div>
  );
};

export default NotFoundPage;

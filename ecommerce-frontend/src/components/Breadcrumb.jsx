// src/components/Breadcrumb.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Filter out the numeric ID from the last segment
  const filteredPathnames = pathnames.filter((value, index) => {
    if (index === pathnames.length - 1 && /^\d+$/.test(value)) {
      return false; // Exclude the ID segment
    }
    return true; // Include other segments
  });

  return (
    <nav className=" p-3 rounded px-5 md:px-40 bg-gray-100 ">
      <ol className="list-reset flex text-gray-700">
        <li className="breadcrumb-item">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm md:text-md ">Home</Link>
        </li>
        {filteredPathnames.map((value, index) => {
          const to = `/${filteredPathnames.slice(0, index + 1).join('/')}`;
          const label = value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <li key={to} className="breadcrumb-item flex items-center">
              <span className="mx-2">{'>'}</span>
              {index === filteredPathnames.length - 1 ? (
                <span>{label}</span>
              ) : (
                <Link to={to} className="text-blue-600 hover:text-blue-800 text-sm md:text-md ">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

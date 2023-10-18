import React from 'react';

const ProfileEducation = ({ education }) => {
    return (
      <div className="bg-white p-4 mb-4 border border-gray-300 rounded-lg shadow-md">
        <div className="flex items-start mb-4">
          <img
            src={education.image}
            alt={`${education.title} Logo`}
            className="w-12 h-12 border	 border-black mr-4"
          />
          <div>
            <p className="text-xl font-semibold text-left ">{education.degree}</p>
            <p className="text-gray-600 text-left">{education.title}</p>
            <p className="text-gray-600 text-left">{education.duration}</p>
            <p className="text-gray-600 mb-2 text-left">{education.grade}</p>
            {education.description && (
          <div>
            <p className="text-gray-600 text-left">{education.description}</p>
          </div>
        )}
          </div>
        </div>
  
  
  
      </div>
    );
  };

export default ProfileEducation;

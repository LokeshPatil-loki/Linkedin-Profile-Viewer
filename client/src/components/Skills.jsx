import React from 'react';

const Skills = ({ skills }) => {
  return (
    <div className="bg-white p-4 mb-4 border border-gray-300 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-2">
        {skills.map((skill, index) => (
          <div key={index} className="bg-gray-100 text-gray-600 py-1 px-2 text-xs rounded-full">
            {skill.title}
            {skill.appliedIn.length > 0 && (
              <div className="text-xs text-blue-500 mt-1">
                {skill.appliedIn.map((application, appIndex) => (
                  <p key={appIndex}>{application.name}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

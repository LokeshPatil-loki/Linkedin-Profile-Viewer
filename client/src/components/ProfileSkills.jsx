import React from 'react';

const ProfileSkills = ({ skills }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <div className="flex flex-wrap">
        {skills.map((skill, index) => (
          <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 mb-2">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkills;

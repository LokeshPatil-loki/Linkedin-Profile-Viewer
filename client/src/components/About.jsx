import React from 'react';

const ProfileAbout = ({ about }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-2">About Me</h2>
      <p>{about}</p>
    </div>
  );
};

export default ProfileAbout;

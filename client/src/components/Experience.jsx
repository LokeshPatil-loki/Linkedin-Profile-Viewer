import React from 'react';

const Experience = ({ experience }) => {
  return (
    <div className="bg-white p-4 mb-4 border border-gray-300 rounded-lg shadow-md">
      <div className="flex gap-10 justify-between items-start">
        <div>
          <div className="flex items-start justify-center mb-2">
            <img src={experience.image} alt={experience.title} className="w-12 h-12 mr-4" />
            <div className="text-left">
              <p className="text-xl font-semibold">{experience.title}</p>
              <p className="text-gray-600">{experience.subtitle}</p>
              <p className="text-gray-600">{experience.duration}</p>
              <div className="flex mt-2">
                {experience.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-600 py-1 px-2 text-xs rounded-full mr-2"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                {experience.certificates.map((certificate, index) => (
                  <a
                    key={index}
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2  py-1 px-2 text-xs  mr-2"
                  >
                    <img src={certificate.url} alt={certificate.name} className="w-20 h-20 object-contain" />
                    {certificate.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Experience;

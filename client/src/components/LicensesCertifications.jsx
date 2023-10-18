import React from 'react';

const LicensesCertifications = ({ certification }) => {
  const openCertificateLink = () => {
    window.open(certification.certificate, '_blank');
  };

  return (
    <div className="bg-white p-4 mb-4 border border-gray-300 rounded-lg shadow-md">
      <div className="flex gap-10 justify-between items-start">
        <div>
          <div className="flex items-start justify-center mb-2">
            <img src={certification.image} alt={certification.title} className="w-12 h-12 mr-4" />
            <div className='text-left'>
              <p className="text-xl font-semibold">{certification.title}</p>

              <p className="text-gray-600">Credential ID: {certification.credentialID}</p>
              <p className="text-gray-600">Issue Date: {certification.issueDate}</p>
              <div className="flex mt-2">
                {certification.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-600 py-1 px-2 text-xs rounded-full mr-2"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <button
                onClick={openCertificateLink}
                className="bg-blue-500 hover:bg-blue-600 mt-2 text-white py-1 px-4 rounded-full text-sm"
              >
                Show Credential
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LicensesCertifications;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';
import Profile from './Profile';

import React from 'react';
import ProfileEducation from './components/ProfileEducation';
import LicensesCertifications from './components/LicensesCertifications';

import profileData from './Profile';
import Post from './components/Post/Post';
import Experience from './components/Experience';
import Skills from './components/Skills';
import SearchBox from './components/SearchBox';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './ProfilePage';




const postData = [
  {
    "firstName": "Priya",
    "lastName": "Saw",
    "profilePicture": "https://media.licdn.com/dms/image/C4D03AQEhZ9WRN6X7nA/profile-displayphoto-shrink_400_400/0/1661583518580?e=1698278400&v=beta&t=bj-2kq8nwNdm5kzqJ-sY7CdmgBFHhWeYGZT5yqPrSA0",
    "headline": "web development |React.js |C++ |python | ML |B.E-IT '24 | BVCOE NM| VJTI '21", // Your headline here
    "dashEntityUrn": "urn:li:activity:6995625390853525504",
    "description": "Hello Connections,\n\nI'm glad to share that I've completed my internship under the project Breast cancer detection with Convolution neural network and gained an internship completion certificate upon The successful  completion of our project from The VOIS Vodafone Idea foundation as artificial intelligence and machine learning intern from August 2022 to oct 2022 batch.\n\nIt was an amazing experience and i would like to thank Vodafone Idea Foundation  , connecting dreams and VOIS for providing this wonderful opportunity. I also would like to thank all of my team members Lokesh patil, tejaswi jadhav and Anuja landge. \n\n#share #experience #opportunity #team #connections #team #machinelearning #internship #like #artificialintelligence", // Your post description here
    "pastActivityOn": "10mo •   ",
    "images": [
      "https://media.licdn.com/dms/image/C4D22AQGq3dDhikdIYg/feedshare-shrink_2048_1536/0/1667887061229?e=1695859200&v=beta&t=2LBLWYrrOQvsNW0-dpAepBxzxGdYtLybUSZjlHLyh4A",
      "https://media.licdn.com/dms/image/C4D22AQGRD9vtNlRSJw/feedshare-shrink_2048_1536/0/1667887064063?e=1695859200&v=beta&t=WKByrJNZXwPE5jD92dA0aJh2pickBRn9BHAWLqUFu28",
      "https://media.licdn.com/dms/image/C4D22AQGq3dDhikdIYg/feedshare-shrink_2048_1536/0/1667887061229?e=1695859200&v=beta&t=2LBLWYrrOQvsNW0-dpAepBxzxGdYtLybUSZjlHLyh4A",
      "https://media.licdn.com/dms/image/C4D22AQGRD9vtNlRSJw/feedshare-shrink_2048_1536/0/1667887064063?e=1695859200&v=beta&t=WKByrJNZXwPE5jD92dA0aJh2pickBRn9BHAWLqUFu28",
      "https://media.licdn.com/dms/image/C4D22AQGq3dDhikdIYg/feedshare-shrink_2048_1536/0/1667887061229?e=1695859200&v=beta&t=2LBLWYrrOQvsNW0-dpAepBxzxGdYtLybUSZjlHLyh4A",
      "https://media.licdn.com/dms/image/C4D22AQGRD9vtNlRSJw/feedshare-shrink_2048_1536/0/1667887064063?e=1695859200&v=beta&t=WKByrJNZXwPE5jD92dA0aJh2pickBRn9BHAWLqUFu28",
      "https://media.licdn.com/dms/image/C4D22AQGq3dDhikdIYg/feedshare-shrink_2048_1536/0/1667887061229?e=1695859200&v=beta&t=2LBLWYrrOQvsNW0-dpAepBxzxGdYtLybUSZjlHLyh4A",
      "https://media.licdn.com/dms/image/C4D22AQGRD9vtNlRSJw/feedshare-shrink_2048_1536/0/1667887064063?e=1695859200&v=beta&t=WKByrJNZXwPE5jD92dA0aJh2pickBRn9BHAWLqUFu28"
    ],
    "videos": [
      "https://dms-exp3.licdn.com/playlist/vid/D4D05AQFv8CrJcUXm0Q/feedshare-ambry-analyzed_servable_progressive_video/0/1676919290214?e=1693332000&v=beta&t=6YeWLoxaCkDwQrc5KW6Q3ltXJGY9cSZU1Grj8TSalyA"
    ],
    "likes": 45
  },
  // Add more post data here
];



// function App() {

//   return (
//     <div className="bg-gray-100 min-h-screen w-2/3">
//       <div id="modal-root"></div>
//       <Skills skills={profileData.skills.skills} />

//       <Experience experience={    {
//       "title": "Future ready talent intern",
//       "subtitle": "Microsoft · Internship",
//       "duration": "Feb 2023 - Apr 2023 · 3 mos",
//       "skills": [
//         "Azure Cosmos DB",
//         "azure web",
//         "Microsoft Azure"
//       ],
//       "image": "https://media.licdn.com/dms/image/C560BAQE88xCsONDULQ/company-logo_200_200/0/1618231291419?e=1700697600&v=beta&t=ZlkG1Y1KgCWWgK4zDWHWb4nyG3uH0KS7o3XvKH478W8",
//       "certificates": [
//         {
//           "name": "FRT INTERNSHIP CERTIFICATE",
//           "url": "https://media.licdn.com/dms/image/D4D2DAQG_2rg82-_JtQ/profile-treasury-image-shrink_800_800/0/1685477980470?e=1693332000&v=beta&t=s4Ck2cXb0UOnY3gPdFvc9gRciU-iGV8k6ikxWszuaEA"
//         }
//       ]
//     }} />
//       <Post post={postData[0]} />

//       {/* ... (other profile components) */}
//       {
//         profileData.certifications.map(certification => <LicensesCertifications certification={certification}/>)
//       }

//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Education</h2>
//         {profileData.education.map((edu, index) => (
//           <ProfileEducation key={index} education={edu} />
//         ))}
//       </div>

//     </div>

//   )
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div className="bg-gray-100">
          <SearchBox />
        </div>} />

        <Route path='/profile' element={<ProfilePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

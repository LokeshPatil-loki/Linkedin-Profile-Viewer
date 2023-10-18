import { useEffect, useState } from 'react'

import './App.css'
import './index.css';

import React from 'react';
import ProfileEducation from './components/ProfileEducation';
import LicensesCertifications from './components/LicensesCertifications';

import Post from './components/Post/Post';
import Experience from './components/Experience';
import Skills from './components/Skills';
import PostHeader from './components/Post/PostHeader';
const Seperator = (props) => <h2 className="text-2xl font-semibold mb-4 mt-14">{props.name}</h2>

function ProfilePage() {
    const query = new URLSearchParams(location.search).get('query');
    console.log({ query })
    const [profileData, setProfileData] = useState(null)


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "url": query
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/api/profile", requestOptions)
            .then(response => response.text())
            .then(result => {
                setProfileData(JSON.parse(result).profile)
                console.log(JSON.parse(result).profile)
            })
            .catch(error => console.log('error', error));
    }, [])
    if (!profileData) {
        return <h1>404</h1>
    }
    return (
        <div className="bg-gray-100 p-44">
            <div id="modal-root"></div>
            <div className="bg-white shadow rounded-lg p-4 m-4">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img
                            src={profileData.profilePicture}
                            alt="Profile Picture"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="ml-4 ">
                        <h2 className="text-xl font-semibold ">{`${profileData.firstName} ${profileData.lastName}`}</h2>
                        <p className="text-gray-700 ">{profileData.publicIdentifier}</p>
                    </div>
                </div>
                <p className="text-gray-700 text-center mt-5">{profileData.headline}</p>
            </div>
            <Seperator name="About" />

            <div className="bg-white shadow rounded-lg p-4 m-4">
                <p className="text-gray-700 mt-2 text-justify">
                    {profileData.about}
                </p>
            </div>

            <Seperator name="Skills" />

            <Skills skills={profileData.skills.skills} />
            <Seperator name="Experiences" />

            {
                profileData.experiences.map((experience, index) => <Experience experience={experience} key={index} />)
            }

            <Seperator name="Certification" />
            {
                profileData.certifications.map(certification => <LicensesCertifications certification={certification} />)
            }
            <Seperator name="Education" />

            <div className="mb-8">
                {profileData.education.map((edu, index) => (
                    <ProfileEducation key={index} education={edu} />
                ))}
            </div>

            <Seperator name="Posts" />

            {
                profileData.posts.map((postData, index) => <Post postheader={{ headline: profileData.headline, firstName: profileData.firstName, lastName: profileData.lastName, profilePicture: profileData.profilePicture }} key={index} post={postData} />)
            }

        </div>

    )
}

export default ProfilePage
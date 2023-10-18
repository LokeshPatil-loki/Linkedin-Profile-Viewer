// src/components/SearchBox.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchBox = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "url": query
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        // fetch("http://localhost:4000/api/profile", requestOptions)
        //     .then(response => response.text())
        //     .then(result => navigate('/profile',{postData: result}))
        //     .catch(error => console.log('error', error));
        window.location.href = `/profile?query=${encodeURIComponent(query)}`;

    };

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="w-full p-48">
                <h1 className="text-5xl text-center mb-4 text-linkedin-blue">
                    Search LinkedIn Profile
                </h1>
                <div className="bg-white rounded-lg flex items-center">
                    <input
                        type="text"
                        className="rounded-l-full w-full py-2 px-4 outline-none focus:ring focus:ring-linkedin-blue"
                        placeholder="URL or Userhandle"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-linkedin-blue  rounded-r-full p-2 hover:bg-linkedin-darker-blue focus:ring focus:ring-linkedin-darker-blue"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;

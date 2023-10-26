const PostHeader = ({ profilePicture, fullName, headline }) => {
  console.log(profilePicture)
    return (
      <div className="flex items-center">
        <img src={profilePicture.length > 0 ? profilePicture :"https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} alt="Profile" className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{fullName}</h2>
          <p className="text-gray-600">{headline}</p>
        </div>
      </div>
    );
  };

export default PostHeader;
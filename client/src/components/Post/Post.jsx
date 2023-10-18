import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";

const Posts = ({ post, postheader }) => {
    const { description, images, videos, likes } = post;
    const { profilePicture, firstName, lastName, headline} =  postheader
    console.log({profilePicture})
    const fullName = `${firstName} ${lastName}`;
    const mediaItems = [];
    for (let url of images) {
        mediaItems.push({ type: "image", url })
    }
    for (let url of videos) {
        mediaItems.push({ type: "video", url })
    }

    return (
        <div className="bg-white p-4 mb-4 border border-gray-300 rounded-lg shadow-md text-justify">
            <PostHeader profilePicture={profilePicture} fullName={fullName} headline={headline} />
            <p className="mt-4 text-gray-800">{description}</p>
            <PostMedia mediaItems={mediaItems} />
            <div className="mt-2 text-gray-600">
                {likes} {likes === 1 ? 'Like' : 'Likes'}
            </div>
        </div>
    );
};

export default Posts;
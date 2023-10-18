import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';
import Modal from '../Modal/Modal'; // Import the Modal component

const PostMedia = ({ mediaItems }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleMediaClick = (url,type) => {
    setModalContent(
      <div>
        {type == "video" ? (
          <video controls className="w-full h-auto">
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={url} alt="Media" className="w-full h-auto" />
        )}
      </div>
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalOpen(false);
  };

  return (
    <div className="mt-4">
      <Carousel showThumbs={false} showStatus={false}>
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className="mb-4 cursor-pointer"
            onClick={() => handleMediaClick(item.url,item.type)}
          >
            <div className="w-full h-64 flex justify-center items-center">
              {item.type === 'image' && (
                <img
                  src={item.url}
                  alt={`Media ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              )}
              {item.type === 'video' && (
                <video  className="max-w-full max-h-full object-contain">
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        ))}
      </Carousel>
      <Modal open={modalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default PostMedia;

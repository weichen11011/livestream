import React, { useRef } from 'react';
import usePictureInPicture from 'react-use-pip';

function VideoPlayer() {
  const videoRef = useRef(null);
  const options = {
    // 在這裡設定選項
    enterOnPlay: true,
  };

  const {
    isPictureInPictureActive,
    isPictureInPictureAvailable,
    togglePictureInPicture,
  } = usePictureInPicture(videoRef, options);

  return (
    <div className="VideoPlayer">
      <video ref={videoRef} autoPlay muted controls loop width="100%">
        <source src="video-sample.mp4" />
      </video>
      {isPictureInPictureAvailable && (
        <button onClick={() => togglePictureInPicture(!isPictureInPictureActive)}>
          {isPictureInPictureActive ? 'Disable' : 'Enable'} Picture in Picture
        </button>
      )}
    </div>
  );
}

export default VideoPlayer;


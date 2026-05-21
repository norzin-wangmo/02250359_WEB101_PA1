import { useRef, useState } from "react";
import heroImage from "../assets/Pindarika.jpg";
import pindarikaVideo from "../assets/pindarika.mp4";

function HeroBanner({ movie, onMoreInfo, onPlay }) {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  const handleMouseEnter = async () => {
    setShowVideo(true);

    if (videoRef.current) {
      try {
        videoRef.current.muted = true;
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideo(false);
  };

  const handlePlayWithSound = async () => {
    if (videoRef.current) {
      try {
        setShowVideo(true);
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch (error) {
        console.log(error);
      }
    }
    onPlay();
  };

  return (
    <header
      className="hero-banner"
      style={{ backgroundImage: `url(${heroImage})` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showVideo && (
        <video
          ref={videoRef}
          className="hero-video"
          src={pindarikaVideo}
          loop
          playsInline
          autoPlay
        />
      )}

      <div className="hero-overlay">
        <div className="hero-content">
          <h2 className="hero-title">{movie.title}</h2>
          <p className="hero-description">{movie.description}</p>
          <div className="hero-buttons">
            <button type="button" className="play-btn" onClick={handlePlayWithSound}>
              ▶ Play
            </button>
            <button type="button" className="info-btn" onClick={onMoreInfo}>
              More Info
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroBanner;

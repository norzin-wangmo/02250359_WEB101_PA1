import { useRef, useState } from "react";
import heroImage from "../assets/Pindarika.jpg";
import pindarikaVideo from "../assets/pindarika.mp4";

function HeroBanner() {
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
          <h2 className="hero-title">Pindarika</h2>
          <p className="hero-description">
            A love story between a serpent and a human. A story of love, loss,
            and revenge. Will their love be stronger or her revenge for her
            family? Watch Pindarika to find out.
          </p>
          <div className="hero-buttons">
            <button className="play-btn" onClick={handlePlayWithSound}>
              ▶ Play
            </button>
            <button className="info-btn">More Info</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroBanner;
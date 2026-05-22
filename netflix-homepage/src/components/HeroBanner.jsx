import { useRef, useState } from "react";
import heroImage from "../assets/Pindarika.jpg";
import pindarikaVideo from "../assets/pindarika.mp4";
import { ERROR_CODES } from "../utils/errorCodes";

function HeroBanner({ movie, onMoreInfo, onPlay, onVideoError }) {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const getVideo = () => videoRef.current;

  const playMutedPreview = async () => {
    if (soundOn) return;
    const video = getVideo();
    if (!video) return;

    try {
      video.pause();
      video.muted = true;
      video.volume = 1;
      video.currentTime = 0;
      await video.play();
    } catch {
      // hover preview only
    }
  };

  const handleMouseEnter = () => {
    setShowVideo(true);
    if (!soundOn) playMutedPreview();
  };

  const handleMouseLeave = (e) => {
    if (soundOn) return;
    if (e.currentTarget.contains(e.relatedTarget)) return;

    const video = getVideo();
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
    setShowVideo(false);
  };

  const startPlaybackWithSound = async () => {
    const video = getVideo();
    if (!video) return false;

    setShowVideo(true);
    setSoundOn(true);

    try {
      video.pause();
      video.muted = false;
      video.removeAttribute("muted");
      video.volume = 1;
      video.currentTime = 0;
      await video.play();

      if (video.muted) {
        video.muted = false;
        await video.play();
      }

      return !video.paused;
    } catch {
      setSoundOn(false);
      onVideoError?.(ERROR_CODES.ERR_VIDEO_PLAY);
      return false;
    }
  };

  const handlePlayWithSound = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const ok = await startPlaybackWithSound();
    if (ok) onPlay?.();
  };

  const handleStopSound = () => {
    const video = getVideo();
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
    setSoundOn(false);
    setShowVideo(false);
  };

  return (
    <header
      className="hero-banner"
      style={{ backgroundImage: `url(${heroImage})` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className={`hero-video ${showVideo || soundOn ? "is-visible" : ""}`}
        src={pindarikaVideo}
        loop
        playsInline
        preload="auto"
        controls={soundOn}
        onError={() => onVideoError?.(ERROR_CODES.ERR_VIDEO_PLAY)}
      />

      <div className="hero-overlay">
        <div className="hero-content">
          <h2 className="hero-title">{movie.title}</h2>
          <p className="hero-description">{movie.description}</p>
          <div className="hero-buttons">
            {!soundOn ? (
              <button
                type="button"
                className="play-btn"
                onPointerDown={handlePlayWithSound}
              >
                ▶ Play
              </button>
            ) : (
              <button
                type="button"
                className="play-btn"
                onClick={handleStopSound}
              >
                ⏸ Stop
              </button>
            )}
            <button type="button" className="info-btn" onClick={onMoreInfo}>
              More Info
            </button>
          </div>
          {soundOn && (
            <p className="sound-hint" aria-live="polite">
              🔊 Sound on — check device volume if you hear nothing
            </p>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeroBanner;

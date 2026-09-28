import React, { useRef, useState } from 'react';
import './ThemeToggleButton.css';

const MusicToggleButton: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const label = playing ? 'Pause music' : 'Play music';

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <button
        onClick={toggleMusic}
        className="theme-toggle-button music-toggle-button"
        aria-pressed={playing}
        aria-label={label}
        title={label}
      >
        <svg className="theme-toggle-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}Slow_Light_on_the_Ridge.mp3`}
        preload="none"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </>
  );
};

export default MusicToggleButton;

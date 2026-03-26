'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaGlobe, FaDiscord, FaGithub, FaTelegram, FaFacebook } from 'react-icons/fa';
import styles from './SocialGrid.module.css';

export default function SocialGrid() {
  const [isActive, setIsActive] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside the grid
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    if (isActive) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isActive]);

  const socials = [
    { id: 1, icon: FaInstagram, colorClass: styles.instagram, link: 'https://www.instagram.com/rajeswar_chowdary' },
    { id: 2, icon: FaTwitter, colorClass: styles.twitter, link: 'https://x.com/Charapalli87056' },
    { id: 3, icon: FaLinkedin, colorClass: styles.linkedin, link: 'https://linkedin.com/in/rajeswarcharapalli' },
    { id: 4, icon: FaEnvelope, colorClass: styles.gmail, link: 'mailto:rajeswarcharapalli@gmail.com' },
    { id: 5, icon: FaGlobe, colorClass: styles.uiverse, link: 'https://rajeswar.tech' },
    { id: 6, icon: FaDiscord, colorClass: styles.discord, link: 'https://discord.com/users/rajeswar_c' },
    { id: 7, icon: FaGithub, colorClass: styles.github, link: 'https://github.com/Rajj-c' },
    { id: 8, icon: FaTelegram, colorClass: styles.telegram, link: 't.me/Raj23005' },
    { id: 9, icon: FaFacebook, colorClass: styles.facebook, link: 'https://www.facebook.com/share/1DP14KPNpn/' }
  ];

  return (
    <div
      ref={gridRef}
      className={`${styles.main} ${isActive ? styles.active : ''}`}
      onClick={() => setIsActive((prev) => !prev)}
    >
      <div className={styles.main_back}></div>
      {socials.map((s, idx) => (
        <a
          key={s.id}
          href={isActive ? s.link : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.card} ${styles['card' + (idx + 1)]}`}
          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
          onClick={(e) => {
            if (!isActive) {
              e.preventDefault();
            }
            e.stopPropagation();
          }}
        >
          <s.icon className={`${styles.icon} ${s.colorClass}`} />
        </a>
      ))}
      <div className={styles.text}>
        HOVER<br />FOR<br />SOCIALS
      </div>
    </div>
  );
}

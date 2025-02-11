import React from 'react';
import styles from './styles.module.css';

export default function BilibiliEmbed({bvid}) {
  return (
    <div className={styles.videoContainer}>
      <iframe
        src={`https://player.bilibili.com/player.html?bvid=${bvid}&high_quality=1&danmaku=0&autoplay=0&poster=1`}
        scrolling="no"
        border="0"
        frameBorder="no"
        framespacing="0"
        allowFullScreen={true}
        className={styles.videoFrame}
      />
    </div>
  );
}
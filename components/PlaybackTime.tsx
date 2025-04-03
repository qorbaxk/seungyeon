'use client';

import { useEffect, useRef, useState } from 'react';

interface IPlaybackTime {
  duration: string;
  isPlaying: boolean;
  onEnded: () => void;
}

/**
 * 초를 분초로 포맷팅하는 함수
 */
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

/**
 * 재생시간 초단위로 파싱하는 함수
 */
const parseDuration = (isoDuration: string): number => {
  const match = isoDuration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  const minutes = match?.[1] ? parseInt(match[1]) : 0;
  const seconds = match?.[2] ? parseInt(match[2]) : 0;
  return minutes * 60 + seconds;
};

/**
 * 재생 시간 관리 컴포넌트
 */
const PlaybackTime = ({ duration, isPlaying, onEnded }: IPlaybackTime) => {
  const [currentTime, setCurrentTime] = useState<number>(() => parseDuration(duration));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentTime(parseDuration(duration));
  }, [duration]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            onEnded();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, onEnded]);

  return <div className="text-white text-xs">{formatTime(currentTime)}</div>;
};

export default PlaybackTime;

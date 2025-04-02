'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

/**
 * 최상단에 고정되어있는 음악 플레이어
 */
const MusicPlayer = () => {
  // 접근 시 자동 시작
  const [isPlaying, setIsPlaying] = useState(true);
  // TODO: replace with actual duration later
  const [currentTime, setCurrentTime] = useState(298);
  const [totalDuration] = useState(298);
  // lp 돌아가는 각도
  const [rotation, setRotation] = useState(0);

  // 다음 곡으로 넘기기
  const handleNextSong = useCallback(() => {
    setIsPlaying(true);
    // TODO: or set next song’s duration
    setCurrentTime(totalDuration);
    // TODO: Add logic to switch song here
  }, [totalDuration]);

  // LP 각도를 위한 설정
  useEffect(() => {
    let animationRef: number;

    const animate = () => {
      setRotation((prev) => (prev + 1) % 360);
      animationRef = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationRef = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationRef);
    };
  }, [isPlaying]);

  // 다음곡으로 넘기기 위한 설정
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime <= 1) {
            handleNextSong();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, handleNextSong]);

  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center pt-4 pl-4">
      {/* 앨범커버 */}
      <div className="w-[150px] h-[150px] relative">
        {/* LP 배경 */}
        <Image
          src="/images/LP.png"
          alt="LP Background"
          fill
          className="w-full h-full object-cover"
        />
        {/* 앨범 커버 테두리 형태 오버레이 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            // TODO: 추후에 가지고 있는 뮤직 DB 에서 리스트 가져올 것
            backgroundImage: "url('/images/17654886.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.97,
            transform: `rotate(${rotation}deg)`,
            maskImage:
              'radial-gradient(circle at center, transparent 20%, black 22%, black 58%, transparent 60%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, transparent 20%, black 22%, black 58%, transparent 60%)',
          }}
        />
      </div>
      {/* 노래제목 */}
      <div className="mt-1 text-center text-white font-semibold text-lg">
        {/* TODO: 추후에 가지고 있는 뮤직 DB 에서 리스트 가져올 것 */}
        Song name
      </div>
      {/* 남은 재생 시간 */}
      <div className="text-white text-xs">{formatTime(currentTime)}</div>
      {/* 버튼 목록 */}
      <div className="mt-2 flex flex-row gap-4 items-center justify-center">
        {/* 이전 음악으로 이동 버튼 */}
        <button type="button" onClick={() => {}} aria-label={'이전으로 버튼'}>
          ⏪️
        </button>
        {/* 재생, 정지 버튼 */}
        <button
          type="button"
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
          aria-label={isPlaying ? '일시정지버튼' : '재생버튼'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        {/* 다음 음악으로 이동 버튼 */}
        <button type="button" onClick={() => {}} aria-label={'다음으로 버튼'}>
          ⏩️
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;

// 현재 갖고있는 초를 분:초 로 표시
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

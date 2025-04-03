'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import Image from 'next/image';
import usePlaylist from '@/hooks/usePlaylist';
import { IYoutubeMusicItem } from '@/interface/music/interface';
// import PlaybackTime from './PlaybackTime';

/**
 * 뮤직 플레이어 컴포넌트
 */
const MusicPlayer = () => {
  const { data, isLoading } = usePlaylist();
  /**
   * 불러온 플레이리스트 데이터
   */
  const playList: IYoutubeMusicItem[] = useMemo(() => {
    if (!isLoading && data) {
      return data.items;
    } else return [];
  }, [data, isLoading]);

  /**
   * 현재 플레이 되고 있는 노래
   */
  const [currentTrack, setCurrentTrack] = useState<IYoutubeMusicItem>(
    playList[0]
  );

  console.log('데이터::::', currentTrack);

  // 접근 시 자동 시작
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const rotationRef = useRef<number>(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  /**
   * LP 각도를 위한 설정
   */
  useEffect(() => {
    let animationFrameId: number;
    const rotate = () => {
      rotationRef.current = (rotationRef.current + 1) % 360;
      if (overlayRef.current) {
        overlayRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
      animationFrameId = requestAnimationFrame(rotate);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(rotate);
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  /**
   * 음악의 재생, 일시정지를 담당하는 부분
   */
  useEffect(() => {
    const loadPlayer = () => {
      playerRef.current = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: currentTrack.snippet.resourceId.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: currentTrack.snippet.resourceId.videoId,
        },
        events: {
          onReady: (event: any) => {
            if (isPlaying) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = loadPlayer;
    } else {
      loadPlayer();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [currentTrack.snippet.resourceId.videoId]);

  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center pt-4 pl-4">
      {/* 앨범커버 */}
      <div className="w-[150px] h-[150px] relative">
        {/* LP 배경 */}
        <Image
          src="/images/LP.png"
          alt="LP Background"
          fill
          priority
          sizes="200px"
          className="w-full h-full object-cover"
        />
        {/* 앨범 커버 테두리 형태 오버레이 */}
        <div
          ref={overlayRef}
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage: `url('${currentTrack.snippet.thumbnails.maxres.url}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.97,
            maskImage:
              'radial-gradient(circle at center, transparent 20%, black 22%, black 58%, transparent 60%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, transparent 20%, black 22%, black 58%, transparent 60%)',
          }}
        />
      </div>
      {/* 노래제목 */}
      <div className="mt-1 text-center text-white font-semibold text-lg">
        {currentTrack.snippet.title}
      </div>
      {/* 남은 재생 시간 */}
      {/* <PlaybackTime /> */}
      {/* 버튼 목록 */}
      <div className="mt-2 flex flex-row gap-4 items-center justify-center">
        {/* 이전 음악으로 이동 버튼 */}
        <button
          type="button"
          // onClick={handlePrevSong}
          aria-label={'이전으로 버튼'}
        >
          ⏪️
        </button>
        {/* 재생, 정지 버튼 */}
        <button
          type="button"
          onClick={() => {
            setIsPlaying((prev) => {
              const next = !prev;
              if (next) {
                playerRef.current?.playVideo();
              } else {
                playerRef.current?.pauseVideo();
              }
              return next;
            });
          }}
          aria-label={isPlaying ? '일시정지버튼' : '재생버튼'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        {/* 다음 음악으로 이동 버튼 */}
        <button
          type="button"
          // onClick={handleNextSong}
          aria-label={'다음으로 버튼'}
        >
          ⏩️
        </button>
      </div>
      {/* 재생용 iframe (보이지 않게 숨김) */}
      <div id="youtube-player" aria-hidden/>
    </div>
  );
};

export default MusicPlayer;

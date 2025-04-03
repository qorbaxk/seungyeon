"use client"

import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useTrackInfo from '@/hooks/useTrackInfo';
import {
  IResYoutubeMusic,
  IYoutubeMusicItem,
} from '@/interface/music/interface';
import { api } from '@/utils/http';

export const getPlayList = async (): Promise<IResYoutubeMusic> => {
  const playlistId = 'PLguEu5wPVUEhQZ3g7j3fo1bk0G5fBbu4o';
  return await api.get('/playlistItems', {
    part: 'snippet',
    playlistId,
    maxResults: 50,
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  });
};

/**
 * 플레이 리스트 가져오는 커스텀 훅
 */
const usePlaylist = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ['getPlaylist'],
    queryFn: getPlayList,
    staleTime: 1000 * 60 * 5,
  });

  // 현재 트랙
  const currentTrack: IYoutubeMusicItem | undefined =
    data?.items?.[currentTrackIndex];

  /**
   * 현재 트랙의 상세 정보
   */
  const { data: detailData } = useTrackInfo(
    currentTrack?.snippet.resourceId.videoId || ''
  );

  // 다음 곡으로 넘기기
  const onNextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) =>
      data?.items ? (prev + 1) % data.items.length : 0
    );
  }, [data?.items]);

  // 이전 곡으로 넘기기
  const onPrevTrack = useCallback(() => {
    setCurrentTrackIndex((prev) =>
      data?.items
        ? (prev - 1 + data.items.length) % data.items.length
        : 0
    );
  }, [data?.items]);

  return { currentTrack, detailData, onPrevTrack, onNextTrack };
};

export default usePlaylist;

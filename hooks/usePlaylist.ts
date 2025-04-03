import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IResYoutubeMusic } from '@/interface/music/interface';
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
  // const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const { ...rest } = useQuery({
    queryKey: ['getPlaylist'],
    queryFn: getPlayList,
    staleTime: 1000 * 60 * 5,
  });

  // const currentTrack = data[currentTrackIndex];
  // const [currentTime, setCurrentTime] = useState(currentTrack.duration);

  // 다음 곡으로 넘기기
  const handleNextSong = useCallback(() => {
    // const nextIndex = (currentTrackIndex + 1) % data.length;
    // setCurrentTrackIndex(nextIndex);
    // setCurrentTime(data[nextIndex].duration);
    // setIsPlaying(true);
  }, []);

  // 이전 곡으로 넘기기
  const handlePrevSong = useCallback(() => {
    // const prevIndex = (currentTrackIndex - 1 + data.length) % data.length;
    // setCurrentTrackIndex(prevIndex);
    // setCurrentTime(data[prevIndex].duration);
    // setIsPlaying(true);
  }, []);

  return { ...rest, handlePrevSong, handleNextSong };
};

export default usePlaylist;

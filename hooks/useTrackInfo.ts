import { api } from '@/utils/http';
import { useQuery } from '@tanstack/react-query';

/**
 * 개별 트랙의 정보 찾기
 */
const useTrackInfo = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['getCurrentTrack', id],
    queryFn: async (): Promise<any> => {
      return await api.get('/videos', {
        part: 'contentDetails',
        id,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      });
    },
    enabled: id != undefined,
    staleTime: 1000 * 60 * 5,
  });

  return { data: data?.items?.[0]?.contentDetails, ...rest };
};
export default useTrackInfo;

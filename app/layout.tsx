import type { Metadata } from 'next';
import './globals.css';
import MusicPlayer from '@/components/MusicPlayer';
import ReactQueryProvider from '@/utils/ReactQueryProvider';
import Hydrate from '@/utils/Hydrate';
import { getPlayList } from '@/hooks/usePlaylist';

export const metadata: Metadata = {
  title:
    '프론트엔드 개발자 백승연의 포트폴리오 | Frontend Developer Seungyeon Baek',
  description:
    '프론트엔드 개발자 백승연의 포트폴리오 사이트입니다. Portfolio site of frontend developer Seungyeon Baek.',
  keywords: [
    '프론트엔드',
    '개발자',
    '백승연',
    '포트폴리오',
    '웹 개발',
    'Frontend',
    'Frontend Developer',
    'Seungyeon Baek',
    'Portfolio',
    'Web Development',
  ],
  authors: [{ name: '백승연' }],
  openGraph: {
    title:
      '프론트엔드 개발자 백승연의 포트폴리오 | Frontend Developer Seungyeon Baek',
    description:
      '프론트엔드 개발자 백승연의 포트폴리오 사이트입니다. Portfolio site of frontend developer Seungyeon Baek.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>
          {/* 어느 페이지든 확인가능한 뮤직플레이어: 서버에서 먼저 프리페칭 진행 */}
          <Hydrate queryKey={['getPlaylist']} queryFn={getPlayList}>
            <MusicPlayer />
          </Hydrate>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}

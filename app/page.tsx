import Search from '@/components/Search';

/**
 * 메인 페이지
 */
export default function Home() {
  return (
    <main className="h-screen w-full relative">
      {/* 음악 재생 */}

      {/* 배경 비디오 */}
      <video loop autoPlay muted className="h-screen w-full object-cover">
        <source src="/videos/car.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
        {/* h1 */}
        <h1 className="sr-only">백승연 포트폴리오</h1>
        {/* 검색창 */}
        <Search placeholder="반갑습니다 :) 궁금한 점 있으시면 언제든지 말씀해주세요!" />
      </div>
    </main>
  );
}

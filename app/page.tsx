/**
 * 메인 페이지
 * @returns 
 */
export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-black">
      <h1 className="sr-only">백승연 포트폴리오</h1>
      <p className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] animate-fadeInScale flex flex-col gap-4 justify-center items-center">
        <span>반갑습니다. </span>
        <span>프론트엔드 개발자 백승연입니다.</span>
      </p>
    </main>
  );
}

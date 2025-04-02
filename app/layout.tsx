import type { Metadata } from "next";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";

export const metadata: Metadata = {
  title: "Frontend Developer Seungyeon Baek | 프론트엔드 개발자 백승연의 포트폴리오",
  description: "Portfolio site of frontend developer Seungyeon Baek. 프론트엔드 개발자 백승연의 포트폴리오 사이트입니다.",
  keywords: [
    "프론트엔드", "개발자", "백승연", "포트폴리오", "웹 개발",
    "Frontend", "Frontend Developer", "Seungyeon Baek", "Portfolio", "Web Development"
  ],
  authors: [{ name: "백승연" }],
  openGraph: {
    title: "Frontend Developer Seungyeon Baek | 프론트엔드 개발자 백승연의 포트폴리오",
    description: "Portfolio site of frontend developer Seungyeon Baek. 프론트엔드 개발자 백승연의 포트폴리오 사이트입니다.",
    type: "website",
    locale: "ko_KR",
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
        {/* 어느 페이지든 확인가능한 뮤직플레이어 */}
        <MusicPlayer/>
        {children}
      </body>
    </html>
  );
}

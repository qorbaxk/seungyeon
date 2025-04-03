// global.d.ts

export {};

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }

  namespace YT {
    class Player {
      constructor(
        elementId: string | HTMLElement,
        options: {
          height?: string;
          width?: string;
          videoId?: string;
          playerVars?: Record<string, any>;
          events?: {
            onReady?: (event: any) => void;
            onStateChange?: (event: any) => void;
          };
        }
      );
      playVideo(): void;
      pauseVideo(): void;
      destroy(): void;
    }
  }
}

export interface IYoutubeMusicSnippetResourceId {
  kind: string;
  videoId: string;
}

export interface IThumbnailsInfo {
  url: string;
  width: number;
  height: number;
}

export interface IYoutubeMusicSnippetThumbnails {
  default: IThumbnailsInfo;
  medium: IThumbnailsInfo;
  high: IThumbnailsInfo;
  standard: IThumbnailsInfo;
  maxres: IThumbnailsInfo;
}

export interface IYoutubeMusicSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IYoutubeMusicSnippetThumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: IYoutubeMusicSnippetResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

/**
 * 유튜브 뮤직에서 가져온 노래의 개별 인터페이스
 */
export interface IYoutubeMusicItem {
  kind: string;
  etag: string;
  id: string;
  snippet: IYoutubeMusicSnippet;
}

/**
 * 유튜브 뮤직 응답 객체의 페이지 관련 정보
 */
export interface IYoutubeMusicPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

/**
 * 유튜브 뮤직 응답 객체
 */
export interface IResYoutubeMusic {
  kind: string;
  etag: string;
  items: IYoutubeMusicItem[];
  pageInfo: IYoutubeMusicPageInfo;
}

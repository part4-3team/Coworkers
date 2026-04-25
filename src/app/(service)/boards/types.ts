import { BOARD_DEVICE_TYPE, BOARD_ORDER_BY } from './constants';

export type Writer = {
  id: number;
  nickname: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  writer: Writer;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
};

export type PostListResponse = {
  totalCount: number;
  list: Post[];
};

export type OrderBy = (typeof BOARD_ORDER_BY)[keyof typeof BOARD_ORDER_BY];

export type BoardDeviceType =
  (typeof BOARD_DEVICE_TYPE)[keyof typeof BOARD_DEVICE_TYPE];

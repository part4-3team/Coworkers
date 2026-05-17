/** 게시글 상세 본문 컴포넌트입니다. */

import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import type { BoardDetailProps } from '@/app/(service)/boards/[articleId]/types';
import BoardPostImageWithFallback from '@/app/(service)/boards/components/BoardPostImageWithFallback';

export default function BoardDetailContent({ boardDetail }: BoardDetailProps) {
  return (
    <div className="min-h-50 min-w-0 py-4 md:py-7 lg:pb-10">
      <div
        className="prose prose-sm md:prose-base max-w-none min-w-0 wrap-anywhere text-text-primary
        prose-headings:text-text-primary
        prose-p:text-text-primary prose-p:leading-6
        prose-strong:text-text-primary
        prose-em:text-text-primary
        prose-code:text-text-primary prose-code:bg-background-secondary prose-code:rounded prose-code:px-1
        prose-pre:bg-background-secondary prose-pre:rounded-lg prose-pre:p-3
        prose-blockquote:border-brand-primary prose-blockquote:text-text-secondary
        prose-ul:text-text-primary prose-ol:text-text-primary
        prose-li:text-text-primary
        prose-a:text-brand-primary prose-a:underline
        prose-hr:border-border-primary"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {boardDetail.content}
        </ReactMarkdown>
      </div>
      {boardDetail.image && (
        <div className="w-35 h-35 mt-5 md:mt-6 md:w-50 md:h-50 rounded-xl overflow-hidden">
          <BoardPostImageWithFallback
            src={boardDetail.image}
            alt={`${boardDetail.title} 게시글 이미지`}
            width={140}
            height={140}
            className="object-cover object-center h-full w-full"
          />
        </div>
      )}
    </div>
  );
}

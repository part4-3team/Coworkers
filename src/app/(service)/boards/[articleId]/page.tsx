/**
 * 게시글 상세 페이지를 구성하는 파일입니다.
 */

export default async function BoardDetailPage() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center px-4 py-8 md:px-6.5 md:py-18 lg:py-17">
      <div className="w-full max-w-225 rounded-[20px] bg-background-primary px-5.5 py-9.75 md:px-10 md:py-13.5 lg:px-15">
        <div className="flex min-h-80 items-center justify-center text-center">
          <p className="text-base font-normal text-text-default md:text-lg">
            게시글 데이터를 아직 불러오지 못했어요.
          </p>
        </div>
      </div>
    </div>
  );
}

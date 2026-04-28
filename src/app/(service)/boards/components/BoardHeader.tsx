import BoardSearch from '@/app/(service)/boards/components/BoardSearch';

export default function BoardHeader() {
  return (
    <section className="max-w-324.5 px-4 pt-6.25 md:pt-19.25 md:px-6.5 lg:px-22.25 lg:pt-21.75">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <span className="shrink-0 block text-text-primary text-2xl font-bold leading-6 md:text-3xl md:leading-7">
          채용공고 / 홍보
        </span>
        <BoardSearch />
      </div>
    </section>
  );
}

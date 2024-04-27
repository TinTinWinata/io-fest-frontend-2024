import ReactLoading from 'react-loading';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getAllNews } from '../../api/news';

export default function NewsPage() {
  const heights = [
    'sm:col-span-2 sm:row-span-2',
    'sm:col-span-2',
    '',
    'sm:row-span-2',
    '',
  ];
  const { data, isLoading } = useQuery({
    queryFn: getAllNews,
    queryKey: ['all-news'],
  });

  return (
    <div className="mt-36 space-y-8 px-4 md:px-8">
      <div className="grid place-items-center gap-4">
        <h1 className="text-7xl sm:text-9xl font-black tracking-tighter">
          BERITA
        </h1>
        <p className=" md:w-[40rem] text-center text-lg sm:text-2xl text-secondary-text">
          Berita terkini dari bermacam-macam media siar Indonesia (CNBC, Detik,
          CNN, Kompas dan lainnya)
        </p>
      </div>
      {isLoading && (
        <div className="center">
          <ReactLoading color="#A5A5A5" className="opacity-30" />
        </div>
      )}
      {data && data.data && (
        <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-dense gap-4 w-full">
          {data.data.map((news, index) => {
            const height = heights[index % heights.length];
            const id = news.id.substring(
              'https://www.cnnindonesia.com/'.length
            );
            const imgUrl = news.links.filter((link) =>
              link.type.startsWith('image')
            )[0].href;

            return (
              <Link
                to={`/news/${id}`}
                key={id}
                className={`relative block ${height} grid grid-rows-[1fr_auto] gap-4 overflow-hidden p-4 isolate rounded-xl bg-white/10 transition-all duration-300 hover:bg-white/20 shadow-lg ring-1 ring-black/5`}
              >
                <img
                  src={imgUrl}
                  alt=""
                  className="h-full w-full object-cover rounded-xl"
                />
                <p className="text-secondary-text">{news.title}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getContentDetail } from '../../api/content';
import Back from '../../components/back';
import Paper from '../../components/paper';

export default function ContentDetailPage() {
  const { title } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => getContentDetail(`${title}`),
    queryKey: ['content-detail'],
  });

  const navigate = useNavigate();

  return (
    <>
      {isLoading && (
        <div className="animate-pulse w-full mt-32 sm:mt-36 space-y-12 flex flex-col items-center">
          <div className="w-full h-96 object-cover z-20 relative isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5" />
          <div className="max-w-screen-lg space-y-6">
            <div className="h-16 w-full isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5"></div>
            <div className="h-2 w-full isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5"></div>
            <div className="space-y-3">
              <p className="h-2 w-full isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5"></p>
              <p className="h-4 w-full isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5"></p>
              <p className="h-8 w-full isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5"></p>
              <p className="h-2 w-full isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5"></p>
            </div>
          </div>
        </div>
      )}

      {data && !('message' in data.data) && (
        <div className="w-full mt-32 sm:mt-36 space-y-12 flex flex-col items-center">
          <div className="max-w-screen-lg space-y-6">
            <Back handleBack={() => navigate('/home')} />
            <img
              src={data.data.image_url}
              alt=""
              className="rounded-xl w-full h-60 sm:h-96 object-cover z-20 relative"
            />
            <Paper className="px-8 py-12 flex flex-col gap-6">
              <h1 className="italic text-4xl sm:text-5xl font-bold">
                {data.data.title}
              </h1>
              <div className="font-normal space-y-3">
                <pre className="font-sans  whitespace-pre-wrap break-words max-w-full">
                  {data.data.content}
                </pre>
              </div>
            </Paper>
          </div>
        </div>
      )}
    </>
  );
}

import {
  useFirestoreDocument,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import ReactLoading from 'react-loading';
import { useMutation } from 'react-query';
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuiz } from '../../api/quiz';
import rank1 from '../../assets/Rank1.svg';
import rank2 from '../../assets/Rank2.svg';
import rank3 from '../../assets/Rank3.svg';
import Button from '../../components/button';
import { useUserAuth } from '../../contexts/user-context';
import { useFirebaseApp } from '../../utils/firebase';

export default function QuizRoomPage() {
  const { code } = useParams();
  const { changePlayerStatus, changeRoomStatus } = useQuiz();
  const { user } = useUserAuth();

  const app = useFirebaseApp();
  const db = getFirestore(app);

  const playersRef = query(
    collection(db, 'rooms', code ?? '', 'players'),
    orderBy('point', 'desc')
  );
  const playersQuery = useFirestoreQuery(['players', code], playersRef, {
    subscribe: true,
  });

  const changePlayerStatusMutation = useMutation({
    mutationFn: changePlayerStatus,
    mutationKey: ['change-player-status'],
  });

  const changeRoomStatusMutation = useMutation({
    mutationFn: changeRoomStatus,
    mutationKey: ['change-room-status'],
  });

  const onReady = () => {
    const status =
      playersQuery.data?.docs
        .find((playerDoc) => playerDoc.id === user?.uid)
        ?.data()?.status === 'ready'
        ? 'idle'
        : 'ready';
    changePlayerStatusMutation.mutate({ code: code ?? '', status });
  };

  const roomRef = doc(db, 'rooms', code ?? '');
  const roomQuery = useFirestoreDocument(['rooms', code], roomRef, {
    subscribe: true,
  });

  if (
    playersQuery.data?.docs
      .find((playerDoc) => playerDoc.id === user?.uid)
      ?.data()?.host &&
    playersQuery.data?.docs.every(
      (playerDoc) => playerDoc.data().status === 'ready'
    ) &&
    roomQuery.data?.data()?.status === 'lobby'
  ) {
    changeRoomStatusMutation.mutate({ code: code ?? '', status: 'play' });
  }

  if (roomQuery.data?.data()?.status === 'play') {
    return <Navigate to={`/quiz/room/${code}/1`} />;
  }

  return (
    <div className="center flex-col gap-8 h-screen w-full max-w-xl ">
      <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-center">
        Ruang Quiz #{code}
      </h1>
      <div className="flex flex-col gap-6 w-full p-8 isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5">
        <h2 className="text-center text-4xl font-bold">
          {roomQuery.data?.data()?.status === 'finish'
            ? 'Daftar Pemenang'
            : 'Daftar Pemain'}
        </h2>
        {playersQuery.isLoading && (
          <div className="center">
            <ReactLoading color="#A5A5A5" className="opacity-30" />
          </div>
        )}
        {playersQuery.data && (
          <div className="flex flex-col gap-4">
            {playersQuery.data.docs.map((playerDoc, index) => {
              const player = playerDoc.data();
              return (
                <div
                  key={playerDoc.id}
                  className="grid grid-cols-[1fr_4rem] p-4 items-center isolate rounded-full bg-white/10 shadow-lg ring-1 ring-black/5"
                >
                  <div className="flex h-8 ml-2 gap-4">
                    {roomQuery.data?.data()?.status === 'finish' && (
                      <Rank index={index + 1} />
                    )}
                    <p className="text-xl font-bold">{player.name}</p>
                  </div>
                  {roomQuery.data?.data()?.status === 'lobby' && (
                    <div className="flex justify-end">
                      <div
                        className={`rounded-full aspect-square w-10 bg-gradient-to-b ${
                          player.status === 'ready'
                            ? 'from-green-300 to-green-700'
                            : 'from-red-300 to-red-700'
                        }`}
                      ></div>
                    </div>
                  )}
                  {roomQuery.data?.data()?.status === 'finish' && (
                    <p className="text-2xl font-bold">{player.point}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {roomQuery.data?.data()?.status !== 'finish' && playersQuery.data ? (
          <Button
            onClick={onReady}
            className="text-4xl font-bold py-4"
            type={
              playersQuery.data &&
              playersQuery.data.docs
                .find((playerDoc) => playerDoc.id === user?.uid)
                ?.data().status === 'ready'
                ? 'secondary'
                : 'primary'
            }
          >
            {playersQuery.data &&
            playersQuery.data.docs
              .find((playerDoc) => playerDoc.id === user?.uid)
              ?.data().status === 'ready'
              ? 'Batal'
              : 'Siap!'}
          </Button>
        ) : (
          <Link className="grid" to={`/quiz/room/${code}/summary`}>
            <Button className="text-4xl font-bold py-4">Lihat Jawaban</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function Rank({ index }: { index: number }) {
  switch (index) {
    case 1:
      return <img src={rank1} alt="" />;
    case 2:
      return <img src={rank2} alt="" />;
    case 3:
      return <img src={rank3} alt="" />;
    default:
      return <div>{index}</div>;
  }
}

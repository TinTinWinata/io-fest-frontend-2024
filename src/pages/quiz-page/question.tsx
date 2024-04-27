import {
  useFirestoreDocument,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ReactLoading from "react-loading";
import { useMutation, useQuery } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router";
import { useQuiz } from "../../api/quiz";
import Button from "../../components/button";
import { useUserAuth } from "../../contexts/user-context";
import { useFirebaseApp } from "../../utils/firebase";

export default function QuizQuestionPage() {
  const { code, id } = useParams();
  const app = useFirebaseApp();
  const db = getFirestore(app);
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { addPlayerPointByAnswer, changeRoomStatus } = useQuiz();

  const roomRef = doc(db, "rooms", code || "");
  const roomQuery = useFirestoreDocument(["rooms", code], roomRef, {
    subscribe: true,
  });

  const questionId = roomQuery.data?.data()?.questions?.at(Number(id) - 1);

  const questionsRef = query(
    collection(db, "questions"),
    where("id", "==", questionId || ""),
    limit(1)
  );
  const questionsQuery = useQuery(
    ["questions", code, questionId],
    () => getDocs(questionsRef),
    { enabled: !!questionId }
  );

  const choicesRef = query(
    collection(
      db,
      "questions",
      questionsQuery.data?.docs.at(0)?.id || "F",
      "choices"
    )
  );
  const choicesQuery = useQuery(
    ["choices", questionsQuery.data?.docs.at(0)?.id],
    () => getDocs(choicesRef),
    { enabled: !!questionsQuery.data?.docs.at(0)?.id }
  );

  const playersRef = query(collection(db, "rooms", code ?? "", "players"));
  const playersQuery = useFirestoreQuery(["players", code], playersRef);

  const [choiceId, setChoiceId] = useState("");
  const [countDown, setCountDown] = useState(10);
  const [answerAt, setAnswerAt] = useState(10);

  const addPlayerPointMutation = useMutation({
    mutationFn: addPlayerPointByAnswer,
    mutationKey: ["add-player-point"],
  });

  const changeRoomStatusMutation = useMutation({
    mutationFn: changeRoomStatus,
    mutationKey: ["change-room-status"],
  });

  if (roomQuery.data?.data()?.status === "finish" && Number(id) >= 10) {
    return <Navigate to={`/quiz/room/${code}`} />;
  }

  return (
    <div className="center flex-col gap-8 h-screen w-full max-w-xl ">
      <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-center">
        Pertanyaan #{id}
      </h1>
      {roomQuery.isLoading ? (
        <div className="center">
          <ReactLoading
            color="#A5A5A5"
            className="opacity-30"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full p-8 isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5">
          <div className="center">
            <CountdownCircleTimer
              isPlaying={!!choicesQuery.data}
              duration={10}
              colors={["#004777", "#007714", "#F7B801", "#A30000"]}
              colorsTime={[10, 7, 3, 0]}
              trailStrokeWidth={16}
              strokeWidth={16}
              children={(props) => (
                <div className="text-2xl font-bold">{props.remainingTime}</div>
              )}
              onUpdate={(remainingTime) => setCountDown(remainingTime)}
              size={120}
              onComplete={() => {
                if (choiceId !== "") {
                  addPlayerPointMutation.mutate({
                    code: code || "",
                    questionId: questionsQuery.data?.docs.at(0)?.id || "",
                    answerAt,
                    choiceId,
                  });
                }

                if (Number(id) >= 10) {
                  if (
                    playersQuery.data?.docs
                      .find((playerDoc) => playerDoc.id === user?.uid)
                      ?.data()?.host
                  ) {
                    changeRoomStatusMutation.mutate({
                      code: code ?? "",
                      status: "finish",
                    });
                  }
                } else {
                  navigate(`/quiz/room/${code}/${Number(id) + 1}`);
                }

                return { shouldRepeat: false, delay: 1 };
              }}
            />
          </div>
          {choicesQuery.isLoading ? (
            <div className="center">
              <ReactLoading
                color="#A5A5A5"
                className="opacity-30"
              />
            </div>
          ) : (
            <h2 className="text-center text-2xl">
              {questionsQuery.data?.docs.at(0)?.data().text}
            </h2>
          )}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-48">
            {choicesQuery.isLoading ? (
              <div className="center col-span-2 row-span-2">
                <ReactLoading
                  color="#A5A5A5"
                  className="opacity-30"
                />
              </div>
            ) : (
              choicesQuery.data?.docs.map((choiceDoc) => {
                const choice = choiceDoc.data();

                return (
                  <Button
                    key={choiceDoc.id}
                    type={choiceDoc.id === choiceId ? "primary" : "secondary"}
                    onClick={() => {
                      setChoiceId(choiceDoc.id);
                      setAnswerAt(countDown);
                    }}
                    className="p-8 isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5"
                  >
                    <p className="text-center text-lg font-bold">
                      {choice.text}
                    </p>
                  </Button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

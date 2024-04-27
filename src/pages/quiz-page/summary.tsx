import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import ReactLoading from "react-loading";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/button";
import { useFirebaseApp } from "../../utils/firebase";

export default function QuizSummaryPage() {
  const { code } = useParams();
  const app = useFirebaseApp();
  const db = getFirestore(app);

  const roomRef = doc(db, "rooms", code || "");
  const roomQuery = useQuery(["rooms", code], () => getDoc(roomRef));

  const questionIds = roomQuery.data?.data()?.questions || [1];

  const questionsRef = query(
    collection(db, "questions"),
    where("id", "in", questionIds)
  );
  const questionsQuery = useQuery(
    ["questions", code, questionIds],
    () => getDocs(questionsRef),
    { enabled: !!questionIds }
  );

  return (
    <div className="mt-36 flex-col gap-6 flex h-fit w-full max-w-xl relative z-10">
      <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-center">
        QUIZ
      </h1>
      <p className=" text-center text-xl sm:text-2xl text-secondary-text">
        Rangkuman jawaban dari quiz yang telah kamu kerjakan tadi
      </p>
      {questionsQuery.isLoading && (
        <div className="center">
          <ReactLoading
            color="#A5A5A5"
            className="opacity-30"
          />
        </div>
      )}
      {questionsQuery.data &&
        questionsQuery.data.docs.map((questionDoc) => (
          <Summary questionDoc={questionDoc} />
        ))}
      <Link
        className="grid"
        to={`/quiz`}
      >
        <Button className="text-4xl font-bold py-4">Kembali</Button>
      </Link>
    </div>
  );
}

function Summary({
  questionDoc,
}: {
  questionDoc: QueryDocumentSnapshot<DocumentData>;
}) {
  const app = useFirebaseApp();
  const db = getFirestore(app);
  const question = questionDoc.data();

  const choicesRef = query(
    collection(db, "questions", questionDoc.id, "choices")
  );
  const choicesQuery = useQuery(["choices", questionDoc.id], () =>
    getDocs(choicesRef)
  );

  const answerRef = query(
    collection(db, "questions", questionDoc.id, "answer")
  );
  const answerQuery = useQuery(["answer", questionDoc.id], () =>
    getDocs(answerRef)
  );

  return (
    <div className="space-y-4 p-8 isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5">
      {choicesQuery.isLoading ? (
        <div className="center">
          <ReactLoading
            color="#A5A5A5"
            className="opacity-30"
          />
        </div>
      ) : (
        <h2 className="text-center text-2xl">{question.text}</h2>
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
                type={
                  choiceDoc.id === answerQuery.data?.docs?.at(0)?.id
                    ? "primary"
                    : "secondary"
                }
                disabled
                className="p-8 isolate rounded-xl bg-white/10 shadow-lg ring-1 ring-black/5"
              >
                <p className="text-center text-lg font-bold">{choice.text}</p>
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
}

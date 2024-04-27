import { getRandomNumbers } from "../utils/random";

import { doc, getDoc, getFirestore, increment, setDoc } from "firebase/firestore";
import { useUserAuth } from "../contexts/user-context";
import { useFirebaseApp } from "../utils/firebase";

export function useQuiz() {
  const app = useFirebaseApp();
  const db = getFirestore(app);
  const { user } = useUserAuth();

  const createRoom = async ({ code, name }: { code: string; name: string }) => {
    const randomQuestions = getRandomNumbers(42)

    await setDoc(doc(db, "rooms", code), {
      status: "lobby",
      questions: randomQuestions,
    });

    await setDoc(doc(db, "rooms", code, "players", user?.uid ?? ""), {
      name,
      status: "idle",
      point: 0,
      host: true
    });
  };

  const joinRoom = async ({ code, name }: { code: string; name: string }) => {
    await setDoc(doc(db, "rooms", code, "players", user?.uid ?? ""), {
      name,
      status: "idle",
      point: 0,
    });
  }

  const changePlayerStatus = async ({
    code,
    status
  }: {
    code: string;
    status: "idle" | "ready"
  }) => {
    await setDoc(doc(db, "rooms", code, "players", user?.uid ?? ""), {
      status,
    }, {merge: true});
  };

  const changeRoomStatus = async ({
    code,
    status,
  }: {
    code: string;
    status: "lobby" | "play" | "finish";
  }) => {
    await setDoc(
      doc(db, "rooms", code),
      {
        status,
      },
      { merge: true }
    );
  };

  const addPlayerPointByAnswer = async ({
    code,
    questionId,
    answerAt,
    choiceId
  }: {
    code: string;
    questionId: string;
    answerAt: number;
    choiceId: string;
  }) => {

    let point = 0
    const answerDoc = await getDoc(doc(db, "questions", questionId, "answer", choiceId));

    if (answerDoc.exists()) {
      point = 10
    }

    await setDoc(
      doc(db, "rooms", code, "players", user?.uid ?? ""),
      {
        point: increment(point * answerAt),
      },
      { merge: true }
    );
  };

  return { createRoom, joinRoom, changePlayerStatus, changeRoomStatus, addPlayerPointByAnswer };
}

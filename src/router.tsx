import { AnimatePresence } from 'framer-motion';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import FullLayout from './layouts/full-layout';
import MainLayout from './layouts/main-layout';
import CameraPage from './pages/camera-page/camera-page';
import ContentDetailPage from './pages/content-page/detail';
import FeedbackPage from './pages/feedback-page/feedback-page';
import HistoryPage from './pages/history-page/history-page';
import Home from './pages/home-page/home-page';
import NewsPage from './pages/news-page';
import NewsDetailPage from './pages/news-page/detail';
import NotFoundPage from './pages/not-found-page';
import QuizPage from './pages/quiz-page';
import CreateQuizPage from './pages/quiz-page/create';
import JoinQuizPage from './pages/quiz-page/join';
import QuizQuestionPage from './pages/quiz-page/question';
import QuizRoomPage from './pages/quiz-page/room';
import QuizSummaryPage from './pages/quiz-page/summary';

const FullLayoutWithOutlet = () => (
  <FullLayout>
    <Outlet />
  </FullLayout>
);

const MainLayoutWithOutlet = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

export default function MainRouter() {
  const location = useLocation();
  return (
    <AnimatePresence
      mode="wait"
      // initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Routes location={location} key={location.pathname}>
        <Route element={<FullLayoutWithOutlet />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route element={<MainLayoutWithOutlet />}>
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="content/:title" element={<ContentDetailPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="camera" element={<CameraPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="quiz">
            <Route index element={<QuizPage />} />
            <Route path="join" element={<JoinQuizPage />} />
            <Route path="create" element={<CreateQuizPage />} />
            <Route path="room/:code" element={<QuizRoomPage />} />
            <Route path="room/:code/summary" element={<QuizSummaryPage />} />
            <Route path="room/:code/:id" element={<QuizQuestionPage />} />
          </Route>
          <Route
            path="news/:category/:id/:title"
            element={<NewsDetailPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

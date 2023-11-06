import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/home/HomePage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';
import { PostDetail } from './components/post-detail/PostDetail';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="herous/:id" element={<PostDetail />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

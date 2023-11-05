import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/home/HomePage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} errorElement={<h1>aaaaaa</h1>} />
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

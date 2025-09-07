import './App.scss'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthForm } from './components/AuthForm/AuthForm';
import { useQuery } from '@tanstack/react-query';
import { fetchMe } from './api/User';
import { useDispatch } from 'react-redux';
import { setUser } from './store/authSlices';
import { lazy, Suspense, useEffect } from 'react';
import TrailerWindow from './components/TrailerWindow/TrailerWindow';
import { Loader } from './components/Loader/Loader';

const LazyMainPage = lazy(() => import('./pages/MainPage/MainPage'));
const LazyProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const LazyFilmPage = lazy(() => import('./pages/FilmPage/FilmPage'));
const LazyGenresPage = lazy(() => import('./pages/GenresPage/GenresPage'));
const LazyFilmsByGenre = lazy(() => import('./pages/FilmsByGenre/FilmsByGenre'));
function App() {
  const dispatch = useDispatch()

  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", 'me'],
    retry: 0,
  })

  useEffect(() => {
    if (meQuery.status === 'success') {
      dispatch(setUser(meQuery.data))
    }
  })

  return (
    <BrowserRouter>
      <Header />
      <AuthForm />
      <TrailerWindow />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<LazyMainPage />} />
            <Route path='/profile' element={<LazyProfilePage />} />
            <Route path="/films/:filmId" element={<LazyFilmPage />} />
            <Route path="/genres" element={<LazyGenresPage />} />
            <Route path="/genres/:genreId" element={<LazyFilmsByGenre />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App

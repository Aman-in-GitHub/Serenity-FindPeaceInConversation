import { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import Navbar from './elements/Navbar';
import Home from './pages/Home';
import Loader from './elements/Loader';

import { Toaster } from '@/components/ui/toaster';

const ChatSection = lazy(() => import('./pages/ChatSection'));
const Error = lazy(() => import('./pages/Error'));

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="chat/:identity"
          element={
            <Suspense fallback={<Loader />}>
              <ChatSection />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

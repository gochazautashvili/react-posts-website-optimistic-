import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-sky-500 absolute inset-0">
      <div className="w-12 h-12 rounded animate-spin border-2 border-white"></div>
    </div>
  );
};

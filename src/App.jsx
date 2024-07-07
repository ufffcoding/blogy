import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "./components/index";
import Header from "./components/Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isLoading = useSelector((state) => state.posts.isLoading);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  return !isLoading ? (
    <>
      <ScrollRestoration />
      <Header />
      <main className="min-h-screen bg-white font-poppins dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Outlet />
      </main>
      <Footer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </>
  ) : (
    <Loader />
  );
}

export default App;

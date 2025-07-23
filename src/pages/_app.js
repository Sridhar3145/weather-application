import "@/styles/globals.css";
import { useState, useEffect } from "react";
import Header from "../Component/Header";

export default function App({ Component, pageProps }) {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#101828]">
        <p className="text-4xl font-semibold text-white">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

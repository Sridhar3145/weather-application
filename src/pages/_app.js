import "@/styles/globals.css";
import Header from "../Component/Header";

export default function App({ Component, pageProps }) {
   return (
    <>
      <Header />         
     <Component {...pageProps} />
    </>
  );
}

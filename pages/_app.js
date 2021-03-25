import "tailwindcss/tailwind.css";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color="#ffc100"
        startPosition={0.3}
        stopDelayMs={200}
        height="5"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

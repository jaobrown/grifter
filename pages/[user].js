import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function User() {
  const router = useRouter();
  const { user } = router.query;

  const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token }),
      credentials: "same-origin",
    });
    return res.json();
  };

  const { data, error } = useSWR(["/api/tweets", user], fetcher);

  return (
    <div>
      <Head>
        <title>🔥🔥 Grifter 🔥🔥</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-gray-50 min-h-screen dark:bg-black p-10 flex flex-col items-center justify-center">
          {!data && !error && (
            <div className="p-10 animate-pulse">
              <p>Loading...</p>
            </div>
          )}
          {data && (
            <div className="flex items-center">
              {/* <img src={data?.user?.photo} alt={data?.user.name} /> */}
              <div className="ml-4 md:text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  🔥🔥 {data?.user?.name}'s grifty tweets 🔥🔥
                </h1>
                <h2 className="text-base md:text-xl mt-2 text-gray-600">
                  @{data?.user?.username} on twitter
                </h2>
              </div>
            </div>
          )}
          {data && (
            <section className="grid md:grid-cols-2 gap-12 md:gap-20 mt-12">
              {/* Tweet Start */}
              {data?.tweets &&
                data?.tweets.length > 0 &&
                data.tweets.map((tweet) => (
                  <article key={tweet.id}>
                    <div className="bg-white h-auto dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <img
                            className="h-11 w-11 rounded-full"
                            src={tweet.user.photo}
                          />
                          <div className="ml-1.5 text-sm leading-tight">
                            <span className="text-gray-800 dark:text-white font-bold block ">
                              {tweet.user.name}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 font-normal block">
                              @{tweet.user.username}
                            </span>
                          </div>
                        </div>
                        <svg
                          className="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current"
                          viewBox="0 0 24 24"
                        >
                          <g>
                            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                          </g>
                        </svg>
                      </div>
                      <div
                        className="text-gray-800 dark:text-white block text-xl leading-snug mt-3"
                        dangerouslySetInnerHTML={{ __html: tweet.text }}
                      ></div>
                      {tweet?.media && (
                        <img
                          className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 h-auto w-full"
                          src={tweet.media.url}
                          alt={tweet.text}
                        />
                      )}
                      <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
                        {/* 10:05 AM · Dec 19, 2020 */}
                        {tweet.created_at}
                      </p>
                      <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
                      <div className="text-gray-500 dark:text-gray-400 flex mt-3">
                        <div className="flex items-center mr-6">
                          <svg
                            className="fill-current h-5 w-auto"
                            viewBox="0 0 24 24"
                            style={{}}
                          >
                            <g>
                              <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
                            </g>
                          </svg>
                          <span className="ml-3">
                            {tweet.public_metrics.like_count}
                          </span>
                        </div>
                        <div className="flex items-center mr-6">
                          <svg
                            className="fill-current h-5 w-auto"
                            viewBox="0 0 24 24"
                          >
                            <g>
                              <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                            </g>
                          </svg>
                          <span className="ml-3">
                            {tweet.public_metrics.reply_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              {/* Tweet End */}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

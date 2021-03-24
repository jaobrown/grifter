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
  console.log("🚀 ~ file: [user].js ~ line 19 ~ User ~ data", data);

  return (
    <div>
      <Head>
        <title>🔥🔥 Grifter 🔥🔥</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Grifted</h1>

        {!data && <p>Loading...</p>}
        {error && <p>error...{error.message}</p>}
        {data && (
          <div>
            {data.tweets.map((tweet) => (
              <article>
                <img src={tweet?.user?.photo} alt={tweet?.user?.name} />
                <p>{tweet?.user?.name}</p>
                <p>@{tweet?.user?.username}</p>
                <p>{tweet.text}</p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

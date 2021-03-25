import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");

  function onChangeHandler(e) {
    setUsername(e.target.value);
  }

  function sendForGrifting() {
    const cleanedUserName = username.replace("@", "");
    router.push(`/${cleanedUserName}`);
  }

  return (
    <div>
      <Head>
        <title>🔥🔥 Grifter 🔥🔥</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-gray-50 min-h-screen dark:bg-black p-10 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800">🔥 grifty tweets</h1>
          <div className="mt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendForGrifting();
              }}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  What's your username?
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                    placeholder="username"
                    onChange={(e) => onChangeHandler(e)}
                    value={username}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex mt-4 items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                make me grifty 🔥
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

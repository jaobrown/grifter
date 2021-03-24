const needle = require("needle");

const token = process.env.BEARER_TOKEN;
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getTweets(username) {
  const params = {
    query: `from:${username} -is:retweet -is:reply`,
    "tweet.fields": "author_id,public_metrics,created_at",
    expansions: "author_id,attachments.media_keys",
    "media.fields":
      "duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width",
    "user.fields": "profile_image_url",
  };

  const res = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

// does this heavy lifting of the grifting
function makeTweetsGrifty(data) {
  const griftedTweets = data.data.map((tweet) => {
    return { ...tweet, text: `🔥🔥 ${tweet.text} 🔥🔥` };
  });
  const user = {
    name: data.includes.users[0].name,
    username: data.includes.users[0].username,
    photo: data.includes.users[0].profile_image_url,
  };
  //   return {
  //     user: user,
  //     tweets: griftedTweets,
  //   };
  return {
    data,
  };
}

export default async (req, res) => {
  try {
    // Get those tweets
    const tweets = await getTweets("wesbos");
    // res.status(200).json(tweets);
    // Grift those kiddos
    const griftedTweets = makeTweetsGrifty(tweets);
    res.status(200).json(griftedTweets);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
};

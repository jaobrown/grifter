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
function makeTweetsGrifty(tweets) {
  const griftedTweets = tweets.map((tweet) => {
    return { ...tweet, text: `🔥🔥 ${tweet.text} 🔥🔥` };
  });
  return griftedTweets;
}

// merge media items with tweets
// structure data how we want it
function formatTweets(data) {
  if (data.data) {
    const user = {
      name: data.includes.users[0].name,
      username: data.includes.users[0].username,
      photo: data.includes.users[0].profile_image_url,
    };

    const tweets = data.data.map((tweet) => {
      // if there's attachments, match photo to tweet
      if (tweet.attachments) {
        const media = data.includes.media.find(
          (media) => media.media_key === tweet.attachments.media_keys[0]
        );
        return {
          ...tweet,
          media: {
            ...media,
          },
        };
      }
      // if no attachments, return tweet as is
      return { ...tweet, user: user };
    });

    return {
      user: user,
      tweets: makeTweetsGrifty(tweets),
    };
  }
  return {};
}

export default async (req, res) => {
  const { token } = req.headers;
  try {
    // Get those tweets
    const results = await getTweets(`${token}`);
    // Grift those kiddos
    const formattedTweets = formatTweets(results);
    res.status(200).json(formattedTweets);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
};

import dotenv from "dotenv";
import fs from "fs";
import { getComments } from "./comments.js";
dotenv.config();

export async function getPosts(userHandle, authorProfileId, start = 0, count = 20) {
  const response = await fetch(`https://www.linkedin.com/voyager/api/identity/profileUpdatesV2?count=${count}&includeLongTermHistory=true&moduleKey=creator_profile_all_content_view%3Adesktop&numComments=0&profileUrn=urn%3Ali%3Afsd_profile%3A${authorProfileId}&q=memberShareFeed&start=${start}`, {
    "headers": {
      "accept": "application/vnd.linkedin.normalized+json+2.1",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "csrf-token": process.env.CSRF,
      "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookie": process.env.COOKIE,
      "Referer": `https://www.linkedin.com/in/${userHandle}/recent-activity/all/`,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
  const responseJSON = await response.json();
  // fs.writeFileSync("./post.json", JSON.stringify(responseJSON));
  const included = responseJSON?.included;

  const posts = [];
  const postElements = included?.filter(item => "commentary" in item);
  postElements?.forEach(async (postElement) => {
    let description = postElement?.commentary?.text?.text;
    let pastActivityOn = postElement?.actor?.subDescription?.text;
    let socialDetail = postElement?.["*socialDetail"].split(":");
    console.log(socialDetail)
    const dashEntityUrn = postElement?.updateMetadata?.urn;
    const videoPlayMetadata = postElement?.content?.["*videoPlayMetadata"];
    const socialDetailEntity = responseJSON?.included?.find(element => element?.socialDetailEntityUrn?.includes(socialDetail[6]));
    const likes = socialDetailEntity?.numLikes;
    const numComments = socialDetailEntity?.numComments;
    const videos = [];
    let images = [];
    postElement?.content?.images?.forEach(element => {
      const rootUrl = element?.attributes?.[0]?.vectorImage?.rootUrl;
      const fileIdentifyingUrlPathSegment = element?.attributes?.[0]?.vectorImage?.artifacts?.[0].fileIdentifyingUrlPathSegment;
      images.push(rootUrl + fileIdentifyingUrlPathSegment);
    });

    if (videoPlayMetadata) {
      const videoElement = responseJSON?.included?.find(element => element?.entityUrn?.includes(videoPlayMetadata));
      const videoUrl = videoElement?.progressiveStreams?.[0].streamingLocations?.[0]?.url;
      if (videoUrl) {
        videos.push(videoUrl);
      }
    }

    const comments = await getComments(userHandle,socialDetail[6],socialDetail[5],numComments,1);

    const post = {
      type: socialDetail[5] ?? null,
      postIdentifier: socialDetail[6] ?? null,
      dashEntityUrn: dashEntityUrn ?? null,
      likes: likes ?? 0,
      numComments: numComments ?? 0,
      description: description ?? null,
      pastActivityOn: pastActivityOn ?? null,
      images: images ?? [],
      videos: videos ?? [],
      comments: comments ?? []
    };
    posts.push(post)
  })
  return posts;
}
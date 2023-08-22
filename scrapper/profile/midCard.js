import dotenv from "dotenv";
dotenv.config();

function getAbout(json) {
  const aboutComponent = json?.included?.find((item) => item.entityUrn?.includes("ABOUT"));
  return aboutComponent?.topComponents?.[1]?.components?.textComponent?.text?.text;
}

export async function getMidCard(userHandle, authorProfileId) {
  const response = await fetch(
    `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:urn%3Ali%3Afsd_profile%3A${authorProfileId})&&queryId=voyagerIdentityDashProfileCards.a87416a0da58ce5c65ef0d291e34f8ac`,
    {
      headers: {
        accept: "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "en-US,en;q=0.9",
        "csrf-token": process.env.CSRF,
        "sec-ch-ua": '"Chromium";v="113", "Not-A.Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie: process.env.COOKIE,
        Referer: `https://www.linkedin.com/in/${userHandle}/`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );
  const responseJSON = await response.json();
  return getAbout(responseJSON);
}

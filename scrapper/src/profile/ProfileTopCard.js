import dotenv from "dotenv";

dotenv.config();

export async function getProfileTopCard(userHandle) {
  /**
   * userHandle is unique id given to each linkedin user.
   * you can find this userHandle from user profile url
   * for example:
   * profile url: https://www.linkedin.com/in/lokesh-patil-77221a24a/
   * userHanlde: lokesh-patil-77221a24a
   * **/
  const response = await fetch(
    `https://www.linkedin.com/voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=${userHandle}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.TopCardSupplementary-131`,
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
  if (response.status != 200) {
    throw new Error("Invalid profileIdentifier");
  }
  const responseJSON = await response.json();
  const includedData = responseJSON?.included?.find(
    (item) => item?.publicIdentifier && item?.publicIdentifier !== "lokesh-patil-77221a24a"
  );
  const reportData = includedData?.profileStatefulProfileActions?.overflowActions?.find(
    (item) => item.report != null
  );
 let profilePicture =  includedData.profilePicture.displayImageReference ? includedData.profilePicture.displayImageReference : includedData.profilePicture.displayImageWithFrameReferenceUnion;
  const rootUrl = profilePicture?.vectorImage?.rootUrl;
  const artifacts = profilePicture?.vectorImage?.artifacts;
  console.log(includedData.profilePicture)
  console.log(profilePicture,artifacts)
  profilePicture = "";
  
  profilePicture = rootUrl+artifacts[artifacts?.length-1]?.fileIdentifyingUrlPathSeg
  const ProfileTopCard = {
    firstName: includedData.firstName,
    lastName: includedData.lastName,
    headline: includedData.headline,
    publicIdentifier: includedData.publicIdentifier,
    url: `https://www.linkedin.com/in/${includedData.publicIdentifier}/`,
    authorProfileId: reportData.report?.authorProfileId,
    profilePicture
  };
  return ProfileTopCard;
}

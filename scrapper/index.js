import dotenv from "dotenv";
import fs from "fs";
import { getImageUrlByEntityUrn } from "./utils.js";
dotenv.config();

async function getProfileTopCard(userHandle) {
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
    console.log(response.status);
    throw new Error("Invalid profileIdentifier");
  }
  const responseJSON = await response.json();
  const includedData = responseJSON?.included?.find(
    (item) => item?.publicIdentifier && item?.publicIdentifier !== "lokesh-patil-77221a24a"
  );
  const reportData = includedData?.profileStatefulProfileActions?.overflowActions?.find(
    (item) => item.report != null
  );
  const ProfileTopCard = {
    firstName: includedData.firstName,
    lastName: includedData.lastName,
    headline: includedData.headline,
    publicIdentifier: includedData.publicIdentifier,
    url: `https://www.linkedin.com/in/${includedData.publicIdentifier}/`,
    authorProfileId: reportData.report?.authorProfileId,
  };
  return ProfileTopCard;
}

function getAbout(json) {
  const aboutComponent = json?.included?.find((item) => item.entityUrn?.includes("ABOUT"));
  return aboutComponent?.topComponents?.[1]?.components?.textComponent?.text?.text;
}

async function getMidCard(userHandle, authorProfileId) {
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

async function getExpriences(userHandle, authorProfileId) {
  const response = await fetch(
    `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:urn%3Ali%3Afsd_profile%3A${authorProfileId},sectionType:experience,locale:en_US)&&queryId=voyagerIdentityDashProfileComponents.5a1bb3fa1a6ecd38a0334ee28284805a`,
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
        "x-li-lang": "en_US",
        "x-li-page-instance":
          "urn:li:page:d_flagship3_profile_view_base_position_details;0sxsJZBPSZCKh1DJc8eq3w==",
        "x-li-track":
          '{"clientVersion":"1.13.1618","mpVersion":"1.13.1618","osName":"web","timezoneOffset":5.5,"timezone":"Asia/Calcutta","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":1,"displayWidth":1366,"displayHeight":768}',
        "x-restli-protocol-version": "2.0.0",
        cookie: process.env.COOKIE,
        Referer: `https://www.linkedin.com/in/${userHandle}/details/experience/`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  const responseJSON = await response.json();
  const elements = responseJSON?.included[0].components?.elements;
  const experiences = [];
  elements.forEach((element) => {
    const entityComponent = element.components?.entityComponent;
    const certificates = [];
    let skills = [];
    let description = "";
    let image = entityComponent?.image?.attributes?.[0].detailData["*companyLogo"];
    entityComponent?.subComponents?.components?.forEach((item) => {
      const fixedComponentsList = item?.components?.fixedListComponent?.components;
      fixedComponentsList?.forEach((fixedComponent) => {
        const text = fixedComponent?.components?.textComponent?.text?.text;
        if (text?.toLowerCase().includes("skills")) {
          const skillList = text.split("Skills: ")?.[1]?.split(" · ");
          skills = skillList;
        } else {
          description = text;
        }
        const mediaComponent = fixedComponent?.components?.mediaComponent;
        if (mediaComponent) {
          const entityImage = mediaComponent?.thumbnail?.entityImage;
          const fileIdentifyingUrlPathSegment =
            entityImage?.artifacts?.[0].fileIdentifyingUrlPathSegment;
          const rootUrl = entityImage?.rootUrl;
          const text = mediaComponent?.titleV2?.text?.text;
          if (fileIdentifyingUrlPathSegment && rootUrl) {
            const certificateUrl = rootUrl + fileIdentifyingUrlPathSegment;
            certificates.push({ name: text, url: certificateUrl });
          }
        }
      });
    });

    image = getImageUrlByEntityUrn(responseJSON, image);

    const experience = {
      title: entityComponent?.titleV2?.text?.text,
      subtitle: entityComponent?.subtitle?.text,
      duration: entityComponent?.caption?.text,
      description,
      skills,
      image,
      certificates,
    };

    experiences.push(experience);
  });
  return experiences;
}

async function getEducation(userHandle, authorProfileId) {
  const response = await fetch(
    `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:urn%3Ali%3Afsd_profile%3A${authorProfileId},sectionType:education,locale:en_US)&&queryId=voyagerIdentityDashProfileComponents.5a1bb3fa1a6ecd38a0334ee28284805a`,
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
        Referer: `https://www.linkedin.com/in/${userHandle}/details/education/`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );
  const responseJSON = await response.json();
  const elements = responseJSON?.included[0].components?.elements;
  const education = [];

  elements?.forEach((element) => {
    const entityComponent = element.components?.entityComponent;
    const subComponents = entityComponent?.subComponents.components;
    const title = entityComponent?.titleV2?.text?.text;
    const degree = entityComponent?.subtitle?.text;
    const duration = entityComponent?.caption?.text;
    let image = entityComponent?.image?.attributes?.[0]?.detailData?.["*companyLogo"];
    let grade = "";
    let description = "";

    subComponents?.forEach((subComponent) => {
      const insightComponent = subComponent?.components?.insightComponent;
      const text = insightComponent?.text?.text?.text;
      if (text) {
        if (text.toLowerCase().includes("grade:")) {
          grade = text.split("Grade: ")[1];
        } else {
          description = text;
        }
      }
    });

    image = getImageUrlByEntityUrn(responseJSON, image);
    education.push({
      title,
      image,
      degree,
      duration,
      grade,
      description,
    });
  });

  return education;
}

async function getCertifications(userHandle, authorProfileId) {
  const response = await fetch(
    `https://www.linkedin.com/voyager/api/graphql?variables=(profileUrn:urn%3Ali%3Afsd_profile%3A${authorProfileId},sectionType:certifications,locale:en_US)&&queryId=voyagerIdentityDashProfileComponents.5a1bb3fa1a6ecd38a0334ee28284805a`,
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
        "x-li-lang": "en_US",
        "x-li-page-instance":
          "urn:li:page:d_flagship3_profile_view_base_certifications_details;Fk+AS+ByRSiJiqFBJKKaog==",
        "x-li-track":
          '{"clientVersion":"1.13.1618","mpVersion":"1.13.1618","osName":"web","timezoneOffset":5.5,"timezone":"Asia/Calcutta","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":1,"displayWidth":1366,"displayHeight":768}',
        "x-restli-protocol-version": "2.0.0",
        cookie: process.env.COOKIE,
        Referer: `https://www.linkedin.com/in/${userHandle}/`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  const responseJSON = await response.json();
  const elements = responseJSON?.included[0].components?.elements;
  const certifications = [];

  elements?.forEach((element) => {
    const entityComponent = element?.components?.entityComponent;
    const credentialID = entityComponent?.metadata?.text?.split("Credential ID ")?.[1] ?? undefined;
    const issueDate = entityComponent?.caption?.text?.split("Issued ")?.[1] ?? undefined;
    const title = entityComponent?.titleV2?.text?.text;
    const certificate = entityComponent?.textActionTarget;
    let image = entityComponent?.image?.attributes?.[0]?.detailData?.["*companyLogo"];

    let skills = [];

    const subComponents = entityComponent?.subComponents?.components;
    subComponents?.forEach((subComponent) => {
      const component = subComponent?.components;
      const text =
        component?.fixedListComponent?.components?.[0].components?.textComponent?.text?.text;
      if (text && text.toLowerCase().includes("skills: ")) {
        skills = text.split("Skills: ")?.[1].split(" · ");
      }
    });
    image = getImageUrlByEntityUrn(responseJSON, image);
    const certification = {
      title,
      credentialID,
      image,
      issueDate,
      certificate,
      skills,
    };
    certifications.push(certification);
  });
  return certifications;
}

function extractSkillsFromJSON(json) {
  const elements = json?.data?.data?.identityDashProfileComponentsByPagedListComponent?.elements;
  const skills = [];
  elements?.forEach((element) => {
    const entityComponent = element?.components?.entityComponent;
    const title = entityComponent?.titleV2?.text?.text;
    const subComponents = entityComponent?.subComponents?.components;
    const appliedIn = [];
    subComponents?.forEach((subComponent) => {
      const insightComponent = subComponent?.components?.insightComponent;
      const name = insightComponent?.text?.text?.text;
      let image = insightComponent?.image?.attributes?.[0]?.detailData?.["*companyLogo"];
      image = getImageUrlByEntityUrn(json, image);
      name && appliedIn.push({ name, image });
    });

    const skill = {
      title,
      appliedIn,
    };
    skills.push(skill);
  });
  return skills;
}

async function getSkills(userHandle, authorProfileId, start = 0, count = 20) {
  const response = await fetch(
    `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(start:${start},count:${count},paginationToken:null,pagedListComponent:urn%3Ali%3Afsd_profilePagedListComponent%3A%28${authorProfileId}%2CSKILLS_VIEW_DETAILS%2Curn%3Ali%3Afsd_profileTabSection%3AALL_SKILLS%2CNONE%2Cen_US%29)&&queryId=voyagerIdentityDashProfileComponents.81f25ac6665af0e2616daf610d2af1b7`,
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
        Referer: `https://www.linkedin.com/in/${userHandle}/details/skills/`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );
  const responseJSON = await response.json();
  let skills = [];
  const totalCount =
    responseJSON?.data?.data?.identityDashProfileComponentsByPagedListComponent?.paging?.total;
  skills = extractSkillsFromJSON(responseJSON);
  if (totalCount > count) {
    let newStart = count;
    let newCount = (totalCount - (start + count));
    if (newCount > 0) {
      const moreSkills = await getSkills(userHandle, authorProfileId, start = newStart, count = newCount);
      skills = [...skills, ...moreSkills.skills];
    }

  }
  return { totalCount, skills };
}


async function getPosts(userHandle, authorProfileId, start = 0, count = 20) {
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
  const included = responseJSON?.included;

  const posts = [];
  const postElements = included?.filter(item => "commentary" in item);

  postElements?.forEach(postElement => {
    let description = postElement?.commentary?.text?.text;
    let pastActivityOn = postElement?.actor?.subDescription?.text;
    const dashEntityUrn = postElement?.updateMetadata?.urn;
    const videoPlayMetadata = postElement?.content?.["*videoPlayMetadata"];
    const likes = responseJSON?.included?.find(element => element?.dashEntityUrn?.includes(dashEntityUrn) && "likes" in element)?.likes?.paging?.total;
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

    const post = {
      dashEntityUrn,
      description,
      pastActivityOn,
      images,
      videos,
      likes
    };
    posts.push(post)
  })
  return posts;
}

try {
  const userHandle = "priya-saw-875476209";
  const profileTopCard = await getProfileTopCard(userHandle);
  const about = await getMidCard(userHandle, profileTopCard.authorProfileId);
  const experiences = await getExpriences(userHandle, profileTopCard.authorProfileId);
  const education = await getEducation(userHandle, profileTopCard.authorProfileId);
  const certifications = await getCertifications(userHandle, profileTopCard.authorProfileId);
  const skills = await getSkills(userHandle, profileTopCard.authorProfileId);
  const posts = await getPosts(userHandle,profileTopCard.authorProfileId);
  const profile = {
    ...profileTopCard,
    about,
    experiences,
    education,
    certifications,
    skills,
    posts
  };
  // console.log(skills)
  console.log(profile);
  // console.log(JSON.stringify(skills,null,2));
} catch (err) {
  console.log(err);
}

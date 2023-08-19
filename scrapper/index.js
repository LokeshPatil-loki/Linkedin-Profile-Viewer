import dotenv from "dotenv";
import fs from "fs";
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
        "csrf-token": "ajax:0339146501893923207",
        "sec-ch-ua": '"Chromium";v="113", "Not-A.Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-li-deco-include-micro-schema": "true",
        "x-li-lang": "en_US",
        "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base;UsbPw9HCSsWHH7/JiONMNA==",
        "x-li-pem-metadata": "Voyager - Profile=profile-top-card-supplementary",
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
  console.log(response.status);
  const responseJSON = await response.json();
  fs.writeFileSync("res.json", JSON.stringify(responseJSON));
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
  return aboutComponent?.topComponents?.[1].components?.textComponent?.text?.text;
}

async function getMidCard(userHandle, authorProfileId) {
  const response = await fetch(
    `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:urn%3Ali%3Afsd_profile%3A${authorProfileId})&&queryId=voyagerIdentityDashProfileCards.a87416a0da58ce5c65ef0d291e34f8ac`,
    {
      headers: {
        accept: "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "en-US,en;q=0.9",
        "csrf-token": "ajax:0339146501893923207",
        "sec-ch-ua": '"Chromium";v="113", "Not-A.Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          'bscookie="v=1&20220924175311f48bea8a-36dc-431d-8a97-e1632fe58d61AQFxvkm1_nLz2ASpqVs6Mm_OkxK48nDf"; G_ENABLED_IDPS=google; li_theme=light; li_theme_set=app; li_rm=AQFE_GxE476mBgAAAYPXEm807iLNl4NQJVBluGnHhs2530mvuxzKk_vNc0kWSLaG_kqevrXf8gwiW0yYTO_xV_Y88c6bwjHo7tDDD0o2Sf5PM4sFqWGQ-ozPPLu7V1uaEZqMmNTDkv7t6emqVtK_0E8uoOidepKpTTbWCxlwv6AfUW5fya9Y-BY9AhbHhv6RlQr1x41ZP_F0bKY6TgWFjq3E_Yio9JDqqNLKUIJg0wRFuXdt4O5txupN9nhG5pmTbpMDDUIXrZmHitbVXk4CoQSusXpCcdZWslyZfOtBQZOjH77Gb_HG4dj5j1xf12tzsee_aM5eDQ5l3UpUqBs; g_state={"i_l":1,"i_p":1680629761912}; timezone=Asia/Calcutta; JSESSIONID="ajax:0339146501893923207"; li_sugr=77c0cda2-1ef9-4e79-bcaa-4869568465c7; bcookie="v=2&cf3ebe28-9aa0-4f24-817d-6511606be78c"; _guid=87874a71-1fdf-45d0-a8de-c98b0fa43e18; aam_uuid=16996825379985366332488143928725919732; liap=true; _gcl_au=1.1.1638695277.1689251229; gpv_pn=www.linkedin.com%2Flearning%2Fgpt-4-foundations-building-ai-powered-apps%2Fbuilding-a-no-code-chatbot; s_tp=625; s_ips=625; s_tslv=1690101393501; li_at=AQEDAT2c0MYDMJ8_AAABiOOoD8wAAAGKDuEvD00ArqnnrcgJTaplBwPjM2vSDAV5na8L7PFNLPE8ChrgjqmSuR4EC0avZgua0RzAEkFwaPzxT2A5WjtFjKH5ah7F5LhCUXz7enrXzzk-zseEcDhgRGzv; AnalyticsSyncHistory=AQIXRWHuizbfUAAAAYoMQvN4w5sHvejoZltC1KmAgJFN4u86FhuTpmsx99avwBdoV7afP-74P9m2xa08Gs2C-A; lms_ads=AQGgvhpBiqzIUgAAAYoMQvUEpeaLwBxT3XHuGCBDx4AunQVeyEoo4ZvvTzJyf0q8q6B-E77XIHW8o1KjzoWgVLWykwfHjvSu; lms_analytics=AQGgvhpBiqzIUgAAAYoMQvUEpeaLwBxT3XHuGCBDx4AunQVeyEoo4ZvvTzJyf0q8q6B-E77XIHW8o1KjzoWgVLWykwfHjvSu; lang=v=2&lang=en-us; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19589%7CMCMID%7C16824677446286531702470372300616246335%7CMCAAMLH-1693041343%7C12%7CMCAAMB-1693041343%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1692443743s%7CNONE%7CMCCIDH%7C562732078%7CvVersion%7C5.1.1; UserMatchHistory=AQIx5_TMuoWICgAAAYoNaBU4q7eN424WPKX1WyYbb-LhbDWFcOFt5DvQL6mIaA0_z5AZT5XTqLiPnm_U1_SlfsTNuGx-O9LGMEgB__X_nkU9IgcmJji7ywfAjJpea3zgx6IXFv_kUarwVobLBUGb2MOB4WbodM9-abd2aq1rc0LilCostewZU8p_dtc_Qi3cxTxApWfJ5fUcS5YC6CHbMu4wOCSJXQxr7kDW14RGxgpGdQOsaa3zeSwAC-Ic3pOxR-hrALjpQUpu-hshs9twjKTrdwai46GReZkixdGV3bQVIuJPhzVZ4DAUkWHEUNtXQIA0QnqT1_TPiqZBWSThqikx09BnDkY; lidc="b=VB38:s=V:r=V:a=V:p=V:g=4292:u=182:x=1:i=1692442041:t=1692459771:v=2:sig=AQH5jo9ZQr0Yr3y_rZUZupsbd3a-wsyh"',
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

async function getExpriences(userHandle,authorProfileId) {
  const response = await fetch(
    `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:urn%3Ali%3Afsd_profile%3A${authorProfileId},sectionType:experience,locale:en_US)&&queryId=voyagerIdentityDashProfileComponents.5a1bb3fa1a6ecd38a0334ee28284805a`,
    {
      headers: {
        accept: "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "en-US,en;q=0.9",
        "csrf-token": "ajax:0339146501893923207",
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
    entityComponent.subComponents.components.forEach((item) => {
      const fixedComponentsList = item?.components?.fixedListComponent?.components;
      fixedComponentsList?.forEach((fixedComponent) => {
        const text = fixedComponent?.components?.textComponent?.text?.text;
        if (text?.toLowerCase().includes("skills")) {
          const skillList = text.split("Skills: ")[1].split(" · ");
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

    const experience = {
      title: entityComponent?.titleV2?.text?.text,
      subtitle: entityComponent?.subtitle?.text,
      duration: entityComponent?.caption?.text,
      description,
      skills,
      image: entityComponent?.image?.attributes?.[0].detailData["*companyLogo"],
      certificates,
    };
    experiences.push(experience);
  });
  return experiences;
}

try {
  const userHandle = "priya-saw-875476209";
  const profileTopCard = await getProfileTopCard(userHandle);
  const about = await getMidCard(userHandle, profileTopCard.authorProfileId);
  const experiences = await getExpriences(userHandle, profileTopCard.authorProfileId);
  const profile = {
    ...profileTopCard,
    about,
    experiences
  };
  console.log(profile);
} catch (err) {
  console.log(err);
}

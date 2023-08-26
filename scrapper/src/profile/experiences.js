import dotenv from "dotenv";
import { getImageUrlByEntityUrn } from "../utils.js";
dotenv.config();
export async function getExpriences(userHandle, authorProfileId) {
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
              certificates.push({ name: text, url: certificateUrl ?? null });
            }
          }
        });
      });
  
      image = getImageUrlByEntityUrn(responseJSON, image);
  
      const experience = {
        title: entityComponent?.titleV2?.text?.text ?? null,
        subtitle: entityComponent?.subtitle?.text ?? null,
        duration: entityComponent?.caption?.text ?? null,
        description: description ?? null,
        skills: skills ?? [],
        image: image ?? [],
        certificates: certificates ?? [],
      };
  
      experiences.push(experience);
    });
    return experiences;
  }
import dotenv from "dotenv";
import fs from "fs";
import { getImageUrlByEntityUrn } from "../utils.js";
dotenv.config();
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
  
  export async function getSkills(userHandle, authorProfileId, start = 0, count = 20) {
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
    return { totalCount: totalCount ?? 0, skills: skills ?? [] };
  }
  
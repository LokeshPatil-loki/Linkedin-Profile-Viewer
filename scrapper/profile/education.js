import { getImageUrlByEntityUrn } from "../utils.js";
import dotenv from "dotenv";
dotenv.config();

export async function getEducation(userHandle, authorProfileId) {
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

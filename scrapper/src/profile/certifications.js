import { getImageUrlByEntityUrn } from "../utils.js";
import dotenv from "dotenv";
dotenv.config();


export async function getCertifications(userHandle, authorProfileId) {
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
        "x-li-page-instance": "urn:li:page:d_flagship3_profile_view_base_certifications_details;Fk+AS+ByRSiJiqFBJKKaog==",
        "x-li-track": '{"clientVersion":"1.13.1618","mpVersion":"1.13.1618","osName":"web","timezoneOffset":5.5,"timezone":"Asia/Calcutta","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":1,"displayWidth":1366,"displayHeight":768}',
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
      const text = component?.fixedListComponent?.components?.[0].components?.textComponent?.text?.text;
      if (text && text.toLowerCase().includes("skills: ")) {
        skills = text.split("Skills: ")?.[1].split(" · ");
      }
    });
    image = getImageUrlByEntityUrn(responseJSON, image);
    const certification = {
      title: title ?? null,
      credentialID: credentialID ?? null,
      image: image ?? image,
      issueDate: issueDate ?? null,
      certificate: certificate ?? null,
      skills: skills ?? [],
    };
    certifications.push(certification);
  });
  return certifications;
}

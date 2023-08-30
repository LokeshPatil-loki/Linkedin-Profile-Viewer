export async function getProjects(userHandle, authorProfileId) {
  const response = await fetch(`https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:urn%3Ali%3Afsd_profile%3A${authorProfileId},sectionType:projects,locale:en_US)&&queryId=voyagerIdentityDashProfileComponents.5a1bb3fa1a6ecd38a0334ee28284805a`, {
    "headers": {
      "accept": "application/vnd.linkedin.normalized+json+2.1",
      "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,bn-IN;q=0.6,bn;q=0.5",
      "csrf-token": process.env.CSRF,
      "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookie": process.env.COOKIE,
      "Referer": `https://www.linkedin.com/in/${userHandle}/details/projects/`,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  const responseJSON = await response.json();
  const projects = [];

  const included = responseJSON?.included;
  const elements = included?.[0]?.components?.elements;
  elements?.forEach((element) => {
    const entityComponent = element?.components?.entityComponent;
    const subComponents = entityComponent?.subComponents?.components;
    const title = entityComponent?.titleV2?.text?.text;
    const duration = entityComponent?.subtitle?.text;

    const projectComponent = subComponents?.find(component => {
      return component?.components?.actionComponent?.action?.navigationAction?.actionControlName === "see_project_link"
    });

    const descriptionComponent = subComponents?.find(component => {
      return !(!component?.components?.fixedListComponent?.components?.[0].components?.textComponent?.text?.text)
    })



    const project_link = projectComponent?.components?.actionComponent?.action?.navigationAction?.actionTarget;
    const description = descriptionComponent.components?.fixedListComponent?.components?.[0].components?.textComponent?.text?.text;

    projects.push({
      title: title ?? null,
      duration: title ?? null,
      project_link: project_link ?? null,
      description: description ?? null
    });
  });

  return projects;

};
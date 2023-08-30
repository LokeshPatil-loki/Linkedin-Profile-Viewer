const responseJSON = require("./projects.json");

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

    const descriptionComponent = subComponents?.find(component=> {
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

console.log(projects);
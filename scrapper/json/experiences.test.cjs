const json = require("./experiences.json");
console.clear();
const elements = json?.included[0].components?.elements;

elements.forEach(element => {
    const entityComponent = element.components?.entityComponent;
    let image = entityComponent?.image?.attributes?.[0]?.detailData?.["*companyLogo"];
    const certificates = [];
    let skills = [];
    let description = "";
    entityComponent.subComponents.components.forEach(item => {
        const fixedComponentsList = item?.components?.fixedListComponent?.components;
        fixedComponentsList?.forEach(fixedComponent => {
            const text = fixedComponent?.components?.textComponent?.text?.text
            if(text?.toLowerCase().includes("skills")){
                const skillList = text.split("Skills: ")[1].split(" · ");
                skills = skillList;
            }else{
                description = text;
            }
            const mediaComponent = fixedComponent?.components?.mediaComponent;
            if(mediaComponent){
                const entityImage = mediaComponent?.thumbnail?.entityImage;
                const fileIdentifyingUrlPathSegment = entityImage?.artifacts?.[0].fileIdentifyingUrlPathSegment
                const rootUrl = entityImage?.rootUrl;
                const text = mediaComponent?.titleV2?.text?.text;
                if(fileIdentifyingUrlPathSegment && rootUrl){
                    const certificateUrl = rootUrl+fileIdentifyingUrlPathSegment;
                    certificates.push({name: text, url: certificateUrl});
                }
            }
        })
    });

    const experience = {
        title: entityComponent?.titleV2?.text?.text,
        subtitle: entityComponent?.subtitle?.text,
        duration: entityComponent?.caption?.text,
        description,
        skills,
        image:entityComponent?.image?.attributes?.[0].detailData["*companyLogo"],
        certificates
    }
    console.log(experience);
});

// const entityComponent = elements[0].components?.entityComponent;
// const experience = {
//     duration: entityComponent?.caption?.text,
// }

// entityComponent.subComponents.components.forEach(item => {
//     const fixedComponentsList = item?.components?.fixedListComponent?.components;
//     fixedComponentsList?.forEach(fixedComponent => {
//         console.log(fixedComponent?.components?.textComponent?.text?.text,"\n\n");
//     })
// })


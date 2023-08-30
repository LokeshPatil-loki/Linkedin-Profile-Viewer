const responseJSON = require("./projects.json");

const included = responseJSON?.included;

const elements = included?.[0]?.components?.elements;

elements?.forEach((element) => {
    const title = element?.components?.entityComponent?.titleV2?.text?.text;
    console.log(title);
});
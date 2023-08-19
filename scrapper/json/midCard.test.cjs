const midCard = require("./midCard.json");

// const about = midCard?.included[5].topComponents[1].components.textComponent.text.text;
// console.log(about);
const component = midCard?.included?.find(item => item.entityUrn?.includes("ABOUT"));

console.log(component?.topComponents?.[1].components?.textComponent?.text?.text);
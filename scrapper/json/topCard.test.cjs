const data = require("./data.json");


const includedData = data?.included?.find(item => item?.publicIdentifier && item?.publicIdentifier !== "lokesh-patil-77221a24a");
const reportData = includedData?.profileStatefulProfileActions?.overflowActions?.find(item => item.report != null);
const profile = {
    firstName: includedData.firstName,
    lastName: includedData.lastName,
    headline: includedData.headline,
    publicIdentifier: includedData.publicIdentifier,
    url: `https://www.linkedin.com/in/${includedData.publicIdentifier}/`,
    authorProfileId: reportData.report?.authorProfileId,
}
console.log(profile);
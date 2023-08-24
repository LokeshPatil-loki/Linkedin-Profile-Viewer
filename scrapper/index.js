import readlinesync from "readline-sync";
import { getProfile } from "./app.js";
import fs from "fs";

(async () => {
    const profileUrl = readlinesync.question("Linkedin Profile URL: ");
    const userHandle = profileUrl.split("/in/")[1].replace("/","");
    const profile = await getProfile(userHandle);
    fs.writeFileSync(`out/${userHandle}.json`,JSON.stringify(profile));
    console.log(profile);
})();


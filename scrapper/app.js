import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

import {getProfileTopCard} from "./profile/ProfileTopCard.js";
import {getMidCard} from "./profile/midCard.js";
import {getExpriences} from "./profile/experiences.js"
import { getEducation } from "./profile/education.js";
import { getCertifications } from "./profile/certifications.js";
import {getSkills} from "./profile/skills.js";
import {getPosts} from "./profile/posts.js";


export async function getProfile(userHandle){
  try {
    const profileTopCard = await getProfileTopCard(userHandle);
    const about = await getMidCard(userHandle, profileTopCard.authorProfileId);
    const experiences = await getExpriences(userHandle, profileTopCard.authorProfileId);
    const education = await getEducation(userHandle, profileTopCard.authorProfileId);
    const certifications = await getCertifications(userHandle, profileTopCard.authorProfileId);
    const skills = await getSkills(userHandle, profileTopCard.authorProfileId);
    const posts = await getPosts(userHandle,profileTopCard.authorProfileId);
    const profile = {
      ...profileTopCard,
      about,
      experiences,
      education,
      certifications,
      skills,
      posts
    };
    return profile;
  } catch (err) {
    console.log(err);
    return null;
  }
}




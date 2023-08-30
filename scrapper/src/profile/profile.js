import {getProfileTopCard} from "./ProfileTopCard.js";
import {getMidCard} from "./midCard.js";
import {getExpriences} from "./experiences.js"
import { getEducation } from "./education.js";
import { getCertifications } from "./certifications.js";
import {getSkills} from "./skills.js";
import {getPosts} from "./posts.js";
import { getProjects } from "./projects.js";

export default async function getProfile(userHandle){
  try {
    const profileTopCard = await getProfileTopCard(userHandle);
    const about = await getMidCard(userHandle, profileTopCard.authorProfileId);
    const experiences = await getExpriences(userHandle, profileTopCard.authorProfileId);
    const education = await getEducation(userHandle, profileTopCard.authorProfileId);
    const certifications = await getCertifications(userHandle, profileTopCard.authorProfileId);
    const skills = await getSkills(userHandle, profileTopCard.authorProfileId);
    const posts = await getPosts(userHandle,profileTopCard.authorProfileId);
    const projects = await getProjects(userHandle,profileTopCard.authorProfileId);
    const profile = {
      ...profileTopCard,
      about,
      experiences,
      education,
      certifications,
      skills,
      posts,
      projects
    };
    console.log(profile.projects);
    return profile;
  } catch (err) {
    console.log(err);
    return null;
  }
}





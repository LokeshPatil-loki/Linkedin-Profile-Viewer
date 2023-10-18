import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

import { getHourDifference, getUserHandle } from "../utils.js";
import getProfile from "../profile/profile.js";
import ProfileModel from "../models/profileModel.js";


const getSingleProfile = async (req, res, next) => {
    try {
        const { url, userHandle } = req.body;
        let profileIdentifier = userHandle;
        if (!(userHandle || url)) {
            throw new BadRequestError("either send userHandle or url in request body");
        } else if (url) {
            profileIdentifier = getUserHandle(url);
            if (profileIdentifier === null) {
                throw new BadRequestError("Invalid profile url");
            }
        }
        let documentExists = false;
        let profile = null;

        // Find profile document by it's userHandle / publicIdentifier from database
        let profileDoc = await ProfileModel.findOne({ publicIdentifier: profileIdentifier });

        // Check If we got a valid document or null / undefined 
        if (profileDoc) {
            documentExists = true;
            const now = new Date();
            const updatedAt = new Date(profileDoc.updatedAt)

            // Calculate time difference between current time and last updated time of document
            const timeDifference = getHourDifference(now, updatedAt);

            // IF time difference is more than 12 hour
            // Then scrape latest profile from linkedin and update document for that profile in mongodb
            if (timeDifference > 12) {
                profile = await getProfile(profileIdentifier) ?? null;
                if (profile) {
                    let update = await ProfileModel.updateOne({ _id: profileDoc._id }, { ...profile });
                    console.log("update");
                    console.log(update)
                }
            }
        }

        // If Profile Document does not exist in mongodb then scrape profile from linkedin
        if (!documentExists) {
            profile = await getProfile(profileIdentifier);
            if (profile) {
                profile = await ProfileModel.create(profile);
                console.log("new")
            }
        } else {
            console.log("profile document exists");
            profile = profileDoc;
        }
        if (profile) {
            return res.json({ profile });
        }

        throw new NotFoundError("Profile not found");
    } catch (error) {
        next(error);
    }
}

export { getSingleProfile };

import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

import { getUserHandle } from "../utils.js";
import getProfile from "../profile/profile.js";


const getSingleProfile =  async (req, res,next) => {
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
    const profile = await getProfile(profileIdentifier);
    if(profile){
        return res.json({ profile });
    }
    throw new NotFoundError("Profile not found");
    } catch (error) {
        next(error);
    }
}

export{getSingleProfile};
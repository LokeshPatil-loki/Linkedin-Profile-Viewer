import { Schema, model } from "mongoose";

const experienceSchema = new Schema({
    title: String,
    subtitle: String,
    duration: String,
    description: String,
    skills: [String],
    image: [String],
    certificates: [{
        name: String,
        url: String
    }]
});

const educationSchema = new Schema({
    title: String,
    image: String,
    degree: String,
    duration: String,
    grade: String,
    description: String
});

const certificationSchema = new Schema({
    title: String,
    credentialID: String,
    issueDate: String,
    certificate: String,
    skills: [String]
});

const skillSchema = new Schema({
    title: String,
    appliedIn: [{
        name: String
    }]
});

const postSchema = new Schema({
    type: String,
    postIdentifier: String,
    dashEntityUrn: String,
    numComments: Number,
    description: String,
    pastActivityOn: String,
    images: [String],
    videos: [String],
    likes: Number,
    comments: [
        {
            commenter: {
                name: String,
                profilePicture: String
            },
            text: String,
            timestamp: String
        }
    ]
});

const projectSchema = new Schema({
    title: String,
    duration: String,
    project_link: String,
    description: String,
});

const profileSchema = new Schema({
    firstName: String,
    lastName: String,
    headline: String,
    publicIdentifier: String,
    url: String,
    authorProfileId: String,
    about: String,
    profilePicture:String,
    experiences: [experienceSchema],
    education: [educationSchema],
    certifications: [certificationSchema],
    skills: {
        totalCount: Number,
        skills: [skillSchema]
    },
    posts: [postSchema],
    projects: [projectSchema]
}, { timestamps: true });

const Profile = model('Profile', profileSchema);

export default Profile;

import { Schema } from "mongoose";

const experienceSchema = new mongoose.Schema({
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

const educationSchema = new mongoose.Schema({
    title: String,
    image: String,
    degree: String,
    duration: String,
    grade: String,
    description: String
});

const certificationSchema = new mongoose.Schema({
    title: String,
    credentialID: String,
    issueDate: String,
    certificate: String,
    skills: [String]
});

const skillSchema = new mongoose.Schema({
    title: String,
    appliedIn: [{
        name: String
    }]
});

const postSchema = new mongoose.Schema({
    dashEntityUrn: String,
    description: String,
    pastActivityOn: String,
    images: [String],
    videos: [String],
    likes: Number
});

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    headline: String,
    publicIdentifier: String,
    url: String,
    authorProfileId: String,
    about: String,
    experiences: [experienceSchema],
    education: [educationSchema],
    certifications: [certificationSchema],
    skills: {
        totalCount: Number,
        skills: [skillSchema]
    },
    posts: [postSchema]
});

const Profile = mongoose.model('Profile', profileSchema);

export {Profile};

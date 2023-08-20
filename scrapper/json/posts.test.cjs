const responseJSON = require("./posts.json");

const included = responseJSON?.included;

const posts = [];
const postElements = included?.filter(item => "commentary" in item);

postElements?.forEach(postElement => {
    let description = postElement?.commentary?.text?.text;
    let pastActivityOn = postElement?.actor?.subDescription?.text;
    const dashEntityUrn = postElement?.updateMetadata?.urn;
    const videoPlayMetadata =postElement?.content?.["*videoPlayMetadata"];
    const likes = responseJSON?.included?.find(element => element?.dashEntityUrn?.includes(dashEntityUrn) && "likes" in element)?.likes?.paging?.total;
    const videos = [];
    let images = [];
    postElement?.content?.images?.forEach(element => {
        const rootUrl = element?.attributes?.[0]?.vectorImage?.rootUrl;
        const fileIdentifyingUrlPathSegment = element?.attributes?.[0]?.vectorImage?.artifacts?.[0].fileIdentifyingUrlPathSegment;
        images.push(rootUrl+fileIdentifyingUrlPathSegment);
    });

    if(videoPlayMetadata){
        const videoElement = responseJSON?.included?.find(element => element?.entityUrn?.includes(videoPlayMetadata));
        const videoUrl = videoElement?.progressiveStreams?.[0].streamingLocations?.[0]?.url;
        if(videoUrl){
            videos.push(videoUrl);
        }
    }

    const post = {
        dashEntityUrn,
        description,
        pastActivityOn,
        images,
        videos,
        likes
    };
    posts.push(post)
})

console.log(posts);
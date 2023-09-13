export async function getComments(userHandle, postId, typeOfPost, count, numReplies) {
    const res = await fetch(`https://www.linkedin.com/voyager/api/graphql?variables=(count:${count},numReplies:${numReplies},socialDetailUrn:urn%3Ali%3Afsd_socialDetail%3A%28urn%3Ali%3A${typeOfPost}%3A${postId}%2Curn%3Ali%3A${typeOfPost}%3A${postId}%2Curn%3Ali%3AhighlightedReply%3A-%29,sortOrder:RELEVANCE,start:0)&&queryId=voyagerSocialDashComments.fa85eba6ffb5f5f3898e6b74957e6439`, {
        "headers": {
            "accept": "application/vnd.linkedin.normalized+json+2.1",
            "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,bn-IN;q=0.6,bn;q=0.5",
            "csrf-token": process.env.CSRF,
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": process.env.COOKIE,
            "Referer": `https://www.linkedin.com/in/${userHandle}/recent-activity/all/`,
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    const responseJSON = await res.json();
    const comments = [];
    const commentItemsArray = responseJSON?.included?.filter(item => !!item.commentary);
    commentItemsArray.forEach(commentItem => {
        const vectorImage = commentItem?.commenter?.image?.attributes?.[0]?.detailData?.nonEntityProfilePicture?.vectorImage;
        const artifacts = vectorImage?.artifacts;
        const commenterName = commentItem?.commenter?.title?.text;
        const commenterProfilePicture = vectorImage?.rootUrl + artifacts[artifacts.length - 1]?.fileIdentifyingUrlPathSegment
        const comment = commentItem?.commentary?.text;
        const createdAt = commentItem?.createdAt;
        comments.push({
            commenter: {
                name: commenterName,
                profilePicture: commenterProfilePicture
            },
            text: comment,
            timestamp: createdAt
        })
    });
    return comments
}
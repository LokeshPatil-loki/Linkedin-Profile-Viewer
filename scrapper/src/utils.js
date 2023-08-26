export function getImageUrlByEntityUrn(json,entityUrn){
    const companyImageEntity = json?.included.find(object => object.entityUrn == entityUrn);
    const vectorImage = companyImageEntity?.logoResolutionResult?.vectorImage;
    const rootUrl = vectorImage?.rootUrl;
    const fileIdentifyingUrlPathSegment = vectorImage?.artifacts[0].fileIdentifyingUrlPathSegment;
    if(rootUrl && fileIdentifyingUrlPathSegment){
        return rootUrl+fileIdentifyingUrlPathSegment;
    }else{
        return undefined;
    }
}

export function getUserHandle(url){
    return url?.split("https://www.linkedin.com/in/")?.[1]?.replace("/","") ?? null;
}

export function getHourDifference(date1,date2){
    const timeDifference = Math.abs(date2 - date1);

    const hoursDifference = timeDifference / (1000 * 60 * 60);

}
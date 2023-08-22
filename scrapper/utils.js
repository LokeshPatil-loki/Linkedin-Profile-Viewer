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


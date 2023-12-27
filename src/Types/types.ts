export interface ServiceData {
    id: string | null,
}

export interface SiteData {
    siteId: string;
    img1: string | null,
    img2: string | null,
    img3: string | null,
    img4: string | null,
    videoUrl: string | null,
    videoUrl1: string | null,
    vendorRemark: string,
    reportingTime: string,
    problemWithSite: string,
    lat: number,
    long: number,
    isSubmitted: boolean,
}

export interface InspectorData {
    canProceed: boolean;
}

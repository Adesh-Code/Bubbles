export interface ServiceData {
    id: String | null,
    didComplete: boolean,
}

export interface ImageData {
    img1: String | null,
    img2: String | null,
    img3: String | null,
    img4: String | null,
    videoUrl: String | null,
    videoUrl1: String | null,
    vendorRemark: String,
    reportingTime: String,
    problemWithSite: String,
    lat: number,
    long: number
}
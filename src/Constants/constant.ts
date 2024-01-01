import { SiteData } from "../Types/types";

export const ASYNC_KEY_INSPECTOR = 'Inspector@Async'
export const ASYNC_KEY_SITE_DATA = 'Site_Data@Async'
export const ASYNC_KEY_BACKGROUND_SERVICE = 'Background_Service@Async'

export const IMAGE_SERVER_HOST = 'https://';
export const VIDEO_SERVER_HOST = 'https://';

export const BACKGROUND_SERVICE_UNIQUE_ID = 'hello';

export const dummyData: Array<SiteData> = [
    {
      siteId: '1',
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      videoUrl: null,
      videoUrl1: null,
      vendorRemark: 'Vendor remark for site 1',
      reportingTime: '2022-01-01T10:00:00',
      problemWithSite: 'No issues reported',
      lat: 37.7749,
      long: -122.4194,
      isSubmitted: false,
      timeUpdated: null
    },
    {
      siteId: '2',
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      videoUrl: null,
      videoUrl1: null,
      vendorRemark: 'Vendor remark for site 2',
      reportingTime: '2022-01-02T11:30:00',
      problemWithSite: 'Minor issues reported',
      lat: 34.0522,
      long: -118.2437,
      isSubmitted: false,
      timeUpdated: null
    },
    {
      siteId: '3',
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      videoUrl: null,
      videoUrl1: null,
      vendorRemark: 'Vendor remark for site 3',
      reportingTime: '2022-01-03T14:45:00',
      problemWithSite: 'Major issues reported',
      lat: 40.7128,
      long: -74.0060,
      isSubmitted: false,
      timeUpdated: null
    },
  ];
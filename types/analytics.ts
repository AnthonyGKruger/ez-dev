export interface GTMWindow extends Window {
  dataLayer: GTMDataLayer[];
}

export interface GTMDataLayer {
  "gtm.start"?: number;
  event?: string;
  [key: string]: any;
}

export interface CustomGTMEvent {
  event: string;
  [key: string]: any;
}

export interface GTMConfig {
  gtmId: string;
  dataLayerName?: string;
}

export interface HotjarWindow extends Window {
  hj: {
    (...args: any[]): void;
    q?: any[];
  };
  _hjSettings: {
    hjid: number;
    hjsv: number;
  };
}

declare global {
  interface Window {
    dataLayer?: GTMDataLayer[];
    hj?: HotjarWindow['hj'];
    _hjSettings: HotjarWindow['_hjSettings'];
  }
}
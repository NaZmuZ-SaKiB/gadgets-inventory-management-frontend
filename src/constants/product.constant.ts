import {
  TCompatibility,
  TConnectivity,
  TOperatingSystem,
  TPowerSource,
} from "@/types/product.interface";

export const operatingSystems: TOperatingSystem[] = [
  "android",
  "ios",
  "linux",
  "macos",
  "windows",
];

export const connectivities: TConnectivity[] = ["bluetooth", "wifi"];

export const powerSources: TPowerSource[] = ["battery", "plug-in"];

export const compatibilities: TCompatibility[] = [
  ...operatingSystems,
  "iphone",
  "android-phone",
  "laptop",
  "macbook",
];

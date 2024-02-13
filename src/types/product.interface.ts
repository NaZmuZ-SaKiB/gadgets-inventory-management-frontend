export type TOperatingSystem =
  | "windows"
  | "macos"
  | "android"
  | "linux"
  | "ios";

export type TConnectivity = "bluetooth" | "wifi";

export type TPowerSource = "battery" | "plug-in";

export type TCompatibility =
  | TOperatingSystem
  | "iphone"
  | "android-phone"
  | "laptop"
  | "macbook";

export type TProduct = {
  _id: string;
  name: string;
  model: string;
  quantity: number;
  cost: number;
  price: number;
  imgUrl?: string;
  description: string;
  brand: string;
  category: string;
  releaseDate: Date;
  operatingSystem?: TOperatingSystem;
  connectivity?: TConnectivity[];
  weight?: number;
  powerSource?: TPowerSource;
  camera?: number;
  displaySize?: number;
  compatibility?: TCompatibility[];
};

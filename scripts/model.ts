export interface UploadResponse {
  ok: boolean;
  value: Value;
}

export interface Value {
  cid: string;
  created: string;
  type: string;
  scope: string;
  files: File[];
  size: number;
  name: string;
  pin: Pin;
  deals: any[];
}

export interface File {
  name: string;
  type: string;
}

export interface Pin {
  cid: string;
  created: string;
  size: number;
  status: string;
}

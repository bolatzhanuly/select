export type Response = {
  data: Array<ResponseData>;
  meta: {
    from: number;
    to: number;
    total: number;
  }
};

export type ResponseData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job?: string;
};
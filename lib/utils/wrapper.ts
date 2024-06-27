export interface Wrapper {
  err: string | null,
  data: any,
  isSuccess: boolean,
}

const data = (data: any): Wrapper => {
  return {
    err: null,
    isSuccess: true,
    data
  };
};

const error = (error: string, data = {}): Wrapper => {
  return {
    err: error,
    isSuccess: false,
    data
  };
};

export default {
  data,
  error,
};
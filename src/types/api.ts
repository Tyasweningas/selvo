export interface BaseResponse<T = any> {
  status: "success" | "error" | "fail";
  message?: string;
  data: T;
  errors?: Record<string, string[]>;
  stack?: string;
}

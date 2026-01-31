export interface ValidationErrorResponse {
  errors?: { message: string }[];
  message?: string;
  code?: string;
}

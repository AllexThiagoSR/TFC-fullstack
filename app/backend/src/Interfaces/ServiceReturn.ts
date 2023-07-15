export type SuccessfullStatusCode = 200 | 201 | 204;
export type ServiceReturnSuccessfull<T> = {
  status: SuccessfullStatusCode;
  data: T;
};
export type ErrorStatusCode = 500 | 400 | 401 | 404 | 422;
export type ServiceReturnError = {
  status: ErrorStatusCode;
  data: { message: string };
};
export type ServiceReturn<T> = ServiceReturnSuccessfull<T> | ServiceReturnError;

export default interface IAuthentication<T> {
  createToken(payload: T): string;
  verify(token: string): T;
}

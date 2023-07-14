export default class IEncryptPassword {
  static encrypt(): string {
    throw new Error('must be implemented');
  }

  static compare(): boolean {
    throw new Error('must be implemented');
  }
}

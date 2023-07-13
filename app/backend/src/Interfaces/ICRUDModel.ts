import NewEntity from './NewEntity';

export interface Read<T> {
  getAll(): Promise<T[]>;
  getById(id: number | string): Promise<T | null>;
}

export interface Create<T> {
  create(data: NewEntity<T>): Promise<T>;
}

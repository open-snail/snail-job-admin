import { createLocalforage, createStorage } from '@sa/utils';

export const localStg = createStorage<StorageType.Local>('local', '');

export const localforage = createLocalforage<StorageType.Local>('local');

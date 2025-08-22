import { StateStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "game-store",
  encryptionKey: "dev-key",
});

export const MMkvStorage: StateStorage = {
  setItem: (key: string, value: string) => {
    return storage.set(key, value);
  },
  getItem: (key: string) => {
    return storage.getString(key) ?? null;
  },
  removeItem: (key: string) => {
    return storage.delete(key);
  },
};

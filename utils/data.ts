import { DataType } from './types';

export const getCharacterFromData = (data: DataType, x: number, y: number) =>
  data.characters.find(c => c.column === x && c.row === y);

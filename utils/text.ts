export const getbackspaceRemoveWordIndex = (text: string, selectionStart: number): number => {
  const before = text.slice(0, selectionStart || text.length - 1);
  const match = before.match(/\S+\s*$/);
  return match?.index || 0;
};

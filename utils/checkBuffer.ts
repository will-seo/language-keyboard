const cleanBuffer = (buffer: string, allowed: string[]) => {
  let cleaned = '';
  for (let position = buffer.length - 1; position >= 0; position--) {
    const character = buffer[position];
    if (!allowed.includes(character)) return cleaned;
    cleaned = character + cleaned;
  }
  return buffer;
};

export const checkBuffer = (
  keys: string[],
  buffer: string,
  allowed: string[],
  ignoreCase = true,
) => {
  const cleanedBuffer = cleanBuffer(
    ignoreCase ? buffer.toLowerCase() : buffer,
    allowed,
  );
  const fullMatches = [];
  let partialMatches = [...keys];

  for (let position = 0; position < cleanedBuffer.length; position++) {
    const bufferCharacter = cleanedBuffer[cleanedBuffer.length - 1 - position];
    const newPartialMatches = [];

    for (let index = 0; index < partialMatches.length; index++) {
      const key = partialMatches[index];
      const checkPosition = key.length - 1 - position;
      const character = key[checkPosition];
      if (character !== bufferCharacter) continue;
      if (key.length === position + 1) fullMatches.push(key);
      else newPartialMatches.push(key);
    }

    partialMatches = newPartialMatches;
  }

  return fullMatches.sort((a, b) => b.length - a.length)[0];
};

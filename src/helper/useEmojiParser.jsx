import { useEffect } from 'react';
import twemoji from 'twemoji';

export default function useEmojiParser(dependancies) {
  const dependancyArray = dependancies ? dependancies : [];

  useEffect(() => {
    twemoji.parse(document.body);
  }, dependancyArray);
}

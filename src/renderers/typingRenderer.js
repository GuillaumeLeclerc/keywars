import { reaction } from 'mobx';
import * as PIXI from 'pixi.js';

const { Text } = PIXI;

export default function typingRenderer(typingManager) {
  const text = new Text("hoho");
  text.position.x = 200;
  text.position.y = 200;
  reaction(() => typingManager.content, (content) => {
    text.text = content;
  }, { fireImmediately: true});
  return text;
}

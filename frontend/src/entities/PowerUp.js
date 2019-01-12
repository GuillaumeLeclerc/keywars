import Entity2D from './2DEntity';


export default class PowerUp extends Entity2D {
  constructor(extraData) {
    super();
    this.toDisplay = extraData.toDisplay;
    this.dimensions = extraData.dimensions;
    this.fontSize = extraData.fontSize;
  }
}

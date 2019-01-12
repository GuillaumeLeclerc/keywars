import Entity2D from './2DEntity';


export default class PowerUp extends Entity2D {
  constructor(extraData) {
    super();
    console.log(extraData);
    this.toDisplay = extraData.toDisplay;
    this.dimensions = extraData.dimensions;
    this.fontSize = extraData.fontSize;
  }
}

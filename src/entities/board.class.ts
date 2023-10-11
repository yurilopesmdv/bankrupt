import GameReader from "../utils/gameReader.class";
import Property from "./property.class";

class Board {
  private properties: Property[];

  constructor() {
    this.properties = [];
    this.initializeBoardFromConfigFile('./gameConfig.txt')
  }

  private initializeBoardFromConfigFile(filePath: string): void {
    const gameReader = new GameReader(filePath);
    const propertiesConfig = gameReader.readPropertiesConfig();

    propertiesConfig.forEach(([cost, rent]) => {
      const property = new Property(cost, rent);
      this.addProperty(property);
    })

  }

  addProperty(property: Property): void {
    this.properties.push(property);
  }

  getProperties(): Property[] {
    return this.properties;
  }
}

export default Board;
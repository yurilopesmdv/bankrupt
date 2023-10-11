import fs from 'fs'

class GameReader {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  readPropertiesConfig(): [number, number][] {
    try {
      const configData = fs.readFileSync(this.filePath, "utf-8");
      const propertyLines = configData.split("\n");

      const propertiesConfig: [number, number][] = propertyLines.map((line: string) => {
        const [cost, rent] = line.split(" ").map(Number);
        return [cost, rent];
      })
      return propertiesConfig;
    } catch (err) {
      console.log("Error reading the gameConfig.txt file!", err);
      throw Error;
    }
  }
}

export default GameReader;
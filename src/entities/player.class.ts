import Property from "./property.class";

class Player {
  private coins: number;
  private position: number = 0;
  private properties: Property[];

    constructor() {
      this.coins = 300;
      this.properties = [];
    }

    getCoins(): number {
      return this.coins;
    }

    addCoins(amount: number): void {
      this.coins += amount;
    }

    subtractCoins(amount: number): boolean {
      if (this.coins >= amount) {
        this.coins -= amount;
        return true;
      }
      return false;
    }

    buyProperty(property: Property): boolean {
      if (property.getOwner() === null && this.coins >= property.getCost()) {
        this.subtractCoins(property.getCost());
        property.setOwner(this);
        this.properties.push(property)
        return true;
      }
      return false;
    }

    payRent(property: Property): boolean {
      if (this.coins >= property.getRent()) {
        this.subtractCoins(property.getRent());
        property.getOwner()!.receiveRent(property.getRent());
        return true;
      }
      return false;
    }

    receiveRent(amount: number) {
      this.coins += amount;
    }

    canBuyProperty(property: Property): boolean {
      return this.coins >= property.getCost();
    }

    setPosition(position: number): void {
      this.position = position;
    }

    getPosition(): number {
      return this.position;
    }
 }

 export default Player;
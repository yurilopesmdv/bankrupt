import Player from "./player.class";

class Property {
  private cost: number;
  private rent: number;
  private owner: Player | null;

  constructor(cost: number, rent: number) {
    this.cost = cost;
    this.rent = rent;
    this.owner = null;
  }

  getCost(): number {
    return this.cost;
  }

  getRent(): number {
    return this.rent;
  }

  getOwner(): Player | null {
    return this.owner;
  }

  setOwner(player: Player): void {
    this.owner = player;
  }

  isOwned(): boolean {
    return this.owner !== null;
  }

  canBePurchased(player: Player): boolean {
    return !this.owner && player.getCoins() >=  this.cost;
  }
}

export default Property;
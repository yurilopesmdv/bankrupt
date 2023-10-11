import Player from "./player.class";
import Property from "./property.class";
import Board from "./board.class";

export interface PlayerTypes {
  playTurn(property: Property): boolean;
}

export class ImpulsivePlayer extends Player implements PlayerTypes {
  constructor() {super()}
  playTurn(property: Property): boolean {
     if (property.canBePurchased(this) && this.canBuyProperty(property)) {
      this.buyProperty(property);
      return true;
     }
     return false
  }
};
export class DemandingPlayer extends Player implements PlayerTypes {
  constructor() {super()}
  playTurn(property: Property): boolean {
    if (property.canBePurchased(this) && property.getRent() > 50 && this.canBuyProperty(property)) {
      this.buyProperty(property);
      return true;
    }
    return false;
  }
}
export class CautiousPlayer extends Player implements PlayerTypes {
  constructor() {super()}
  playTurn(property: Property): boolean {
    if (property.canBePurchased(this) && this.hasReserve(80) && this.canBuyProperty(property)) {
      this.buyProperty(property);
      return true;
    }
    return false;
  }
  private hasReserve(reserve: number): boolean {
    return this.getCoins() >= reserve;
  }
}
export class RandomPlayer extends Player implements PlayerTypes {
  constructor() {super()}
  playTurn(property: Property): boolean {
    if (property.canBePurchased(this) && this.randomDecision() && this.canBuyProperty(property)) {
      this.buyProperty(property);
      return true;
    }
    return false;
  }
  private randomDecision(): boolean {
    return Math.random() >= 0.5;
  }
}



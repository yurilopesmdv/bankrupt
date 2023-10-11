import Board from "./board.class";
import Player from "./player.class";
import { CautiousPlayer, DemandingPlayer, ImpulsivePlayer, PlayerTypes, RandomPlayer } from "./playerTypes.class";
import Property from "./property.class";

class Game {
  private players: Array<Player & PlayerTypes>;
  private board: Board;
  private winner: Player | null = null;
  private totalRounds: number = 0;
  private currentPlayerIndex: number = 0;

  constructor() {
    this.players = this.randomizePlayers(this.createPlayers())
    this.board = new Board();
  }

  getTotalRounds(): number {
    return this.totalRounds;
  }

  getWinner() {
    return this.winner;
  }

  startGame(): void {
    const properties = this.board.getProperties();
    let gameEnded = false;

    while(!this.isGameOver() && !gameEnded) {
      if (this.totalRounds >= 1000) break;
      const currentPlayer = this.players[this.currentPlayerIndex];
      if (this.players.length === 1) {
        this.winner = currentPlayer;
        gameEnded = true;
        break;
      }
      const move = this.rollDice();
      const newPosition = this.movePlayer(currentPlayer, move);
      const actualProperty = properties[newPosition];

      if (actualProperty.getOwner() === null) {
        currentPlayer.playTurn(actualProperty);
      } else if (actualProperty.getOwner() !== currentPlayer && actualProperty.getOwner() !== null){
        const owner = actualProperty.getOwner();
        if(owner) this.payRentSituation(currentPlayer, actualProperty, owner);
      } else {}

      this.totalRounds++
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
    
  }
  
  private createPlayers() {
    return [new ImpulsivePlayer(), new DemandingPlayer(), new CautiousPlayer(), new RandomPlayer()];
  }

  private payRentSituation(currentPlayer: Player, property: Property, owner: Player): void {
    const payment = currentPlayer.payRent(property);
    if (!payment) {
      this.players = this.players.filter((p) => p !== currentPlayer);
      if (this.players.length === 1)  {
        this.winner = this.players[0];
      }
    }
  }

  private randomizePlayers(players: Array<Player & PlayerTypes>): Array<Player & PlayerTypes> {
    const shuffledPlayers = [...players];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }
    return shuffledPlayers;
  }

  private isGameOver(): boolean {
    if (this.winner === null || this.totalRounds < 1000) {
      return false;
    }
    return true;
  }

  private rollDice(): number {
    return Math.floor(Math.random() * 6) + 1
  }

  private movePlayer(player: Player, move: number): number {
    const boardSize = this.board.getProperties().length;
    const newPosition = (player.getPosition() + move) % boardSize;
    if (newPosition < player.getPosition()) {
      player.addCoins(100);
    }
    player.setPosition(newPosition);
    return newPosition;
  }

}

export default Game;
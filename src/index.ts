import Game from "./entities/game.class";
import fs from 'fs';
import Player from "./entities/player.class";

class Simulation {
  private qntSimulations: number = 300;
  private timeouts: number = 0;
  private totalRounds: number = 0;
  private winsByPlayerType: Record<string, number> = {
    ImpulsivePlayer: 0,
    DemandingPlayer: 0,
    CautiousPlayer: 0,
    RandomPlayer: 0
  }
  private mostWinner: string = '';
  private averageRound: number = 0;

  constructor() { }

  runSimulation() {
    for (let i = 0; i < this.qntSimulations; i++) {
      const game = new Game();
      game.startGame();
      if (game.getTotalRounds() >= 1000) {
        this.timeouts++;
      } else {
        this.totalRounds += game.getTotalRounds();
        const winnerType = game.getWinner()?.constructor.name;
        if (winnerType) this.winsByPlayerType[winnerType]++;
      }
    }

    this.calculateAverage();
    this.calculateMostVictory();
    this.writeResultsTxt();
    this.consoleResults();
  }

  private calculateAverage(): number {
    return this.averageRound = this.totalRounds / (this.qntSimulations - this.timeouts);
  }

  private calculateMostVictory(): void {
    let mostVictoryCount = 0;
    for (const playerType in this.winsByPlayerType) {
      if (this.winsByPlayerType[playerType] > mostVictoryCount) {
        mostVictoryCount = this.winsByPlayerType[playerType];
        this.mostWinner = playerType;
      }
    }
  }

  private consoleResults() {
    console.log("Quantas partidas terminam por timeout (1000 rodadas): ", this.timeouts);
    console.log("Quantos turnos (rodadas), em média, demora uma partida: ", this.averageRound.toFixed(2));
    console.log("Qual a porcentagem de vitórias por comportamento dos jogadores: ");
    console.log(this.calculateVictoryPercentage());
    console.log("Qual o comportamento mais vence: ", this.mostWinner);
  }

  private writeResultsTxt() {
    const data =
      `Quantas partidas terminam por timeout (1000 rodadas): ${this.timeouts};
Quantos turnos (rodadas), em média, demora uma partida: ${this.averageRound.toFixed(2)};
Qual a porcentagem de vitórias por comportamento dos jogadores: 
${this.calculateVictoryPercentage()}
Qual o comportamento mais vence: ${this.mostWinner};
`
    fs.writeFileSync('./results.txt', data)
  }

  private calculateVictoryPercentage() {
    let data = ''
    for (const playerType in this.winsByPlayerType) {
      const percentage = (this.winsByPlayerType[playerType] / (this.qntSimulations - this.timeouts)) * 100;
      data = data + `
      ${playerType}: ${percentage.toFixed(2)}%
      `;
    }
    return data;
  }
}

const simulation = new Simulation();
simulation.runSimulation();
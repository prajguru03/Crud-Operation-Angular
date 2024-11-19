export class PlayerModel{
playerId: number;
name: string;
country: string;
age: number;
position: string;
team: string;
goals: number;
assists: number;
matchesPlayed: number;
yellowCards: number;


constructor(){
    this.playerId = 1;
    this.name = '';
    this.country = '';
    this.age = 0;
    this.position = '';
    this.team = '';
    this.goals = 0;
    this.assists = 0;
    this.matchesPlayed = 0;
    this.yellowCards = 0;
}
}
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PlayerModel } from './model/player';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CRUD_Operation';

  playerForm: FormGroup = new FormGroup({});
  playerObj: PlayerModel = new PlayerModel();
  playerList: PlayerModel[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.createForm();
    //   const oldData = localStorage.getItem("PlayerData");
    //   if (oldData != null) {
    //     const parseData = JSON.parse(oldData);
    //     this.playerList = parseData;
    // }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const oldData = localStorage.getItem("PlayerData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.playerList = parseData;
      }
    }
  }

  createForm() {
    this.playerForm = new FormGroup({
      playerId: new FormControl(this.playerObj.playerId),
      name: new FormControl(this.playerObj.name),
      country: new FormControl(this.playerObj.country),
      age: new FormControl(this.playerObj.age),
      position: new FormControl(this.playerObj.position),
      team: new FormControl(this.playerObj.team),
      goals: new FormControl(this.playerObj.goals),
      assists: new FormControl(this.playerObj.assists),
      matchesPlayed: new FormControl(this.playerObj.matchesPlayed),
      yellowCards: new FormControl(this.playerObj.yellowCards),
    });
  }

  onSave() {
    if (isPlatformBrowser(this.platformId)) {
        const oldData = localStorage.getItem("PlayerData");
        if (oldData != null) {
            const parseData = JSON.parse(oldData);
            this.playerForm.controls['playerId'].setValue(parseData.length + 1);
            // Change this line to use push() instead of unshift()
            this.playerList.push(this.playerForm.value);
        } else {
            this.playerForm.controls['playerId'].setValue(1);
            // Change this line to use push() instead of unshift()
            this.playerList.push(this.playerForm.value);
        }
        localStorage.setItem("PlayerData", JSON.stringify(this.playerList));
    }
}

  onEdit(item: PlayerModel) {
    this.playerObj = item;  
    this.playerForm.patchValue({
      playerId: this.playerObj.playerId,
      name: this.playerObj.name,
      country: this.playerObj.country,
      age: this.playerObj.age,
      position: this.playerObj.position,
      team: this.playerObj.team,
      goals: this.playerObj.goals,
      assists: this.playerObj.assists,
      matchesPlayed: this.playerObj.matchesPlayed,
      yellowCards: this.playerObj.yellowCards,
    });
  }
  
  onUpdate() {
    const record = this.playerList.find(m => m.playerId === this.playerForm.controls['playerId'].value);

    if (record !== undefined) {
      record.name = this.playerForm.controls['name'].value;
      record.country = this.playerForm.controls['country'].value; // If required
      record.age = this.playerForm.controls['age'].value; // If required
      record.position = this.playerForm.controls['position'].value; // If required
      record.team = this.playerForm.controls['team'].value; // If required
      record.goals = this.playerForm.controls['goals'].value; // If required
      record.assists = this.playerForm.controls['assists'].value; // If required
      record.matchesPlayed = this.playerForm.controls['matchesPlayed'].value; // If required
      record.yellowCards = this.playerForm.controls['yellowCards'].value;
    }

    localStorage.setItem("PlayerData", JSON.stringify(this.playerList));
    this.playerObj = new PlayerModel();
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      const index = this.playerList.findIndex(m => m.playerId === id);
      if (index !== -1) {
        this.playerList.splice(index, 1);
        localStorage.setItem("PlayerData", JSON.stringify(this.playerList)); // Use "PlayerData" instead of "EmpData"
      }
    }
  }
  
}

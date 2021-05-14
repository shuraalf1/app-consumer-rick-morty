import { Component, OnInit } from '@angular/core';
import { PersonajeService } from '../services/personaje.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
    public title = 'Lista de Personajes';
    public characters : any[] = [];
    public info : any = null;
    public searchName : string = "";
    public pages : any[] = [];
    public currentPage : number = 1;
    public pagemin: number =0;
    public pagemax: number =5;

    constructor(private characterService : PersonajeService) {}

    ngOnInit() {
      this.getListCharacters();
    }

    getListCharacters(page : number = 1, name : string = "") {
      this.characterService.getListCharacters(page, name).subscribe(response => {
        this.characters = response.results
        this.info = response.info;
        this.pages = Array(this.info.pages).map((x,i)=>i);
        if(this.pages.length <=5){
          this.pagemin=0;
          this.pagemax=this.pages.length;
        }
      })
    }

    previus(event){
      if(this.pagemin>0){
          this.pagemax--;
          this.pagemin--;
      }
    }
    next(event){
      if(this.pagemax< this.pages.length){
          this.pagemax++;
          this.pagemin++;
      }
    }
    search(event, n) {
      this.currentPage = n + 1;
      this.getListCharacters(this.currentPage, this.searchName);
    }

}

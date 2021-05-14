import { Component } from '@angular/core';
import * as $ from "jquery";
import { PersonajeService } from './services/personaje.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
      public title = 'Lista de Personajes';
      public characters : any[] = [];
      public info : any = null;
      public searchName : string = "";
      public pages : any[] = [];
      public currentPage : number = 1;
      public pagemin: number =0;
      public pagemax: number =5;
      public currentCharacter: any = {};

constructor(private characterService : PersonajeService) {}
    ngOnInit() {
      this.getListCharacterss();
      this.getCharacterById();
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
    }

     getListCharacterss(page : number = 1, name : string = "") {
          this.characterService.getListCharacters(page, name)
          .subscribe(response => {
              this.characters = response.results;
              this.info = response.info;
              this.pages = Array(this.info.pages).map((x,i)=>i);
               if(this.pages.length <=5){
                        this.pagemin=0;
                        this.pagemax=this.pages.length;
               }
            }
          );
     }

      getCharacterById(id : string = "1") {
            this.characterService.getCharacterById(id).subscribe(response => {
              this.currentCharacter=response;
              console.log(this.currentCharacter);
              /*this.name=response.name;
              this.image=response.image;
              this.gender = response.gender;
              this.status =  response.status;
              this.species = response.species;
              this.episode = response.episode;
              this.origin = response.origin;
              this.location = response.location;
              if(this.location.name != 'unknown'){
                 this.location_id=response.location.url.replace("https://rickandmortyapi.com/api/location/","");
              }
              if(this.origin.name != 'unknown'){
                 this.origin_id=response.origin.url.replace("https://rickandmortyapi.com/api/location/","");
              }*/
            });
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

    detail(event, characterid) {
        this.getCharacterById(characterid);
     }

     search(event, n) {
        this.currentPage = n + 1;
        this.getListCharacterss(this.currentPage, this.searchName);
     }
}

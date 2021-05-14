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
      public searchStatus : string = "NA";
      public searchSpecie : string = "NA";
      public pages : any[] = [];
      public currentPage : number = 1;
      public pagemin: number =0;
      public pagemax: number =5;
      public statusList = [{ title: "All", value: 'NA' },
                           { title: "Alive", value: 'alive' },
                           { title: "Dead", value: 'dead' },
                           { title: "Unknown", value: 'unknown' },]
      public specieList = [{ title: "All", value: 'NA' },
                               { title: "Human", value: 'Human' },
                               { title: "Robot", value: 'Robot' },
                               { title: "Alien", value: 'Alien' },
                               { title: "Humanoid", value: 'Humanoid' },
                               { title: "Mythological ...", value: 'Mythological Creature' },
                               { title: "Animal", value: 'Animal' },
                               { title: "Cronenberg", value: 'Cronenberg' },
                               { title: "Disease", value: 'Disease' },
                               { title: "Poopybutthole", value: 'Poopybutthole' },
                               { title: "Unknown", value: 'unknown' },
                               ]
      public currentCharacter: any = {episode: [],
                                      location:{ name:''}};

constructor(private characterService : PersonajeService) {}
    ngOnInit() {
      this.getListCharacterss();
      this.getCharacterById();
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
    }

     getListCharacterss(page : number = 1, name : string = "",  status : string = "", specie : string = "") {
            if(status === 'NA'){
                status="";
            }
             if(specie === 'NA'){
                specie="";
             }
          this.characterService.getListCharacters(page, name, status,specie)
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
        this.getListCharacterss(this.currentPage, this.searchName, this.searchStatus, this.searchSpecie);
     }

    onChange(deviceValue) {
        this.search(event, 0);
    }

    onChangeSpecie(event) {
        this.search(event, 0);
    }
}

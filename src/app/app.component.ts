import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service:SharedService){}

  notes:any=[];
  
  // метод обновления note array
  refreshNotes(){
    this.service.getNotes().subscribe((res)=>{
      // Сортировка массива записей по полю `date`
      res.sort((a, b) => {
        const dateA = a["date"];
        const dateB = b["date"];
        
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return 0;
        }
      });

      this.notes = res;
    })
  }

  ngOnInit(){
    this.refreshNotes();
  }

  // Метод добавления новых записей
  addNotes(newNotes:string){
    this.service.addNote(newNotes).then(()=>{
      this.refreshNotes();
    })
  }

  // Метод удаления записей
  deleteNotes(id:string){
    this.service.deleteNote(id).then(()=>{
      this.refreshNotes();
    })
  }
}

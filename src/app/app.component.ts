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
      this.notes = res;
    })
  }

  ngOnInit(){
    this.refreshNotes();
  }

  addNotes(newNotes:string){
    this.service.addNote(newNotes).then(()=>{
      this.refreshNotes();
    })
  }

  deleteNotes(id:string){
    this.service.deleteNote(id).then(()=>{
      this.refreshNotes();
    })
  }
}

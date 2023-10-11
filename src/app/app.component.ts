import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: SharedService) {}

  notes: any = [];
  selectedImage: File | null = null;
  imageUrl: any = null;
  showModal: boolean = false;


  // метод обновления note array
  refreshNotes() {
    this.service.getNotes().subscribe((res) => {
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
    });
  }

  ngOnInit() {
    this.refreshNotes();
  }

  // Метод добавления новых записей
  addNotes(newNotes: string, file: File | null) {
    this.service.addNote(newNotes, file).then(() => {
      this.refreshNotes();
      this.selectedImage = null; // Сброс выбранного изображения после добавления записи
    });
  }

  // Метод удаления записей
  deleteNotes(id: string) {
    this.service.deleteNote(id).then(() => {
      this.refreshNotes();
    });
  }

  // Обработчик события выбора изображения
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    if(this.selectedImage){
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedImage);
        reader.onload = () => {
        this.imageUrl = reader.result;
      }
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}

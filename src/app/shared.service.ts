import { Injectable } from '@angular/core';
import { Firestore, collection, Timestamp, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
//метод для взаимодействия с firebase
  constructor(private fs:Firestore) { }

  //получение всех записей из data store
  getNotes(){
    let notesCollection = collection(this.fs, 'notes'); // ссылка на notes collection
    return collectionData(notesCollection, {idField:'id'}); // получаем все данные из datastore
  }
  
  //метод для добавления новых записей
  addNote(desc:string){
    console.log(desc);
    let data = {text:desc, date:Timestamp.now()}; // объект, который будет отправлен
    let notesCollection = collection(this.fs, 'notes');
    return addDoc(notesCollection, data);
  }

  //удаление записей
  deleteNote(id:string){
    let docRef = doc(this.fs, 'notes/'+id); // ссылка на конкректный документ, на основе данного id
    return deleteDoc(docRef);
  }
}

import { Injectable } from '@angular/core';
import { Firestore, collection, Timestamp, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private readonly fs: Firestore) { }

  // получение всех записей из data store
  getNotes() {
    const notesCollection = collection(this.fs, 'notes'); // ссылка на коллекцию 'notes'
    return collectionData(notesCollection, { idField: 'id' }); // получаем все данные из datastore
  }

  // метод для добавления новых записей
  async addNote(desc: string, file: File | null) {
    let imageUrl: string | null = null;

    if (file) {
      imageUrl = await this.uploadImage(file); // загрузить изображение и получить URL
    }

    const data = { text: desc, date: Timestamp.now(), image: imageUrl }; // объект, который будет отправлен
    const notesCollection = collection(this.fs, 'notes');
    return addDoc(notesCollection, data);
  }

  // удаление записей
  deleteNote(id: string) {
    const docRef = doc(this.fs, 'notes/' + id); // ссылка на конкректный документ на основе данного id
    return deleteDoc(docRef);
  }

  // метод для загрузки изображений
  async uploadImage(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        const fileDataUrl = reader.result as string;
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + file.name);

        const snapshot = await uploadString(storageRef, fileDataUrl, 'data_url'); // загрузить файл в Firebase Storage

        const downloadUrl = await getDownloadURL(snapshot.ref); // получить URL загруженного изображения

        resolve(downloadUrl);
      };

      reader.onerror = error => reject(error);

      reader.readAsDataURL(file);
    });
  }
}

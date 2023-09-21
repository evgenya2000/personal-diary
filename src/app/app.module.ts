import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { SharedService } from './shared.service';

const firebaseConfig = {
  apiKey: "AIzaSyAo41l8hk-4p-0vUr6tYgn_L7O-u8PS-EU",
  authDomain: "personal-diary-1b491.firebaseapp.com",
  projectId: "personal-diary-1b491",
  storageBucket: "personal-diary-1b491.appspot.com",
  messagingSenderId: "938846275251",
  appId: "1:938846275251:web:b707ed83faaf1966c092c6"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

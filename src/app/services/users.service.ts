import { User } from 'src/app/interfaces/user';

import { Injectable } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import {
	Auth
} from '@angular/fire/auth';
import { Firestore, doc, collection, setDoc, addDoc } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class UsersService {


  constructor() {

  }

}


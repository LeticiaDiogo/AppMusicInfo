import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endereco } from '../interfaces/endereco';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private auth: Auth,
    private http: HttpClient) {}

	async register({ email, password }:any) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			return user;

		} catch (e) {
			return null;
		}
	}

	async login({ email, password }:any) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}


  getCEP(cepNumber:string):Observable<Endereco>{
    const cep = this.http.get<Endereco>(`http://viacep.com.br/ws/${cepNumber}/json/`);
    return cep;
  }


  logout() {
    return this.auth.signOut();

  }




}





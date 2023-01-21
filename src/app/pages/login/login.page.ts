import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController, ToastController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';

import { Endereco } from 'src/app/interfaces/endereco';

import { addDoc, collection, collectionData, doc, docSnapshots, Firestore, setDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides!: IonSlides;
  credentials!: FormGroup;
  private loading: any;


  constructor(private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router,
    private loadingCtrl: LoadingController
    ) { }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['leticia@gmail.com', [Validators.required, Validators.email]],
			password: ['abraca123', [Validators.required, Validators.minLength(6),Validators.maxLength(10)]],

		});
	}


	async login() {
		const loading = await this.loadingController.create();
		await this.presentLoading();

		const user = await this.authService.login(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Login inválido!', 'Tente novamente!');
		}
	}

	async showAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

  verifyCEP(){
    const cep = this.credentials.get('endereco')?.getRawValue() as Endereco;
    console.log(cep)
    const receivedCEP = this.authService.getCEP(cep.cep);
    receivedCEP.subscribe({
      next:(cep)=>{
        this.refresForm(cep)
      },
      error: (err)=>{
        console.log(err)
      }
    })
    console.log(receivedCEP)
  }

  refresForm(endereco:Endereco){
    this.credentials.get("endereco")?.patchValue({
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      localidade:endereco.localidade,
      uf: endereco.uf
    })
}

async presentLoading() {
  this.loading = await this.loadingCtrl.create({ message: 'Aguarde...', duration: 500 });
  return this.loading.present();


}

async PageRegister() {
  this.router.navigateByUrl('/register', { replaceUrl: true });
}

}

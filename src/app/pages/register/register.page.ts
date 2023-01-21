
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IonSlides, LoadingController, AlertController } from '@ionic/angular';
import { Endereco } from 'src/app/interfaces/endereco';
import { UsersService } from 'src/app/services/users.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { collection, doc, Firestore, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild(IonSlides) slides!: IonSlides;
  credentials!: FormGroup;
  private loading: any;


  constructor(private fb: FormBuilder,
     private authService: AuthService,
    private loadingCtrl: LoadingController,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,

    ) { }

	ngOnInit() {
		this.credentials = this.fb.group({
      email: ['leticia@gmail.com', [Validators.required, Validators.email]],
      password: ['abraca123', [Validators.required,Validators.pattern(/^(?=.*[@*\.])[a-zA-Z0-9@*]{6,10}$/)]],
      nome: ['Letícia', [Validators.required, Validators.pattern(/^[a-zA-Z]/),
      Validators.minLength(6),
      Validators.maxLength(50),] ],
      cpf: ['12345678901', [Validators.required,Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      endereco:this.fb.group({
        cep:['',[Validators.required,Validators.pattern(/^\d{5}\-?\d{3}$/),Validators.maxLength(8),Validators.minLength(8)]],
        logradouro:['',[Validators.required]],
        numero:['',Validators.required],
        bairro:['',[Validators.required]],
        localidade:['',[Validators.required]],
        uf:['',[Validators.required]]})

		});
	}


  async register() {
		const loading = await this.loadingController.create();
		await this.presentLoading();

		const user = await this.authService.register(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Não foi possível registrar!', 'Tente novamente!');
		}
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

async showAlert(header: string, message: string) {
  const alert = await this.alertController.create({
    header,
    message,
    buttons: ['OK']
  });
  await alert.present();
}

async addpage() {
  this.router.navigateByUrl('/login', { replaceUrl: true });
}

}

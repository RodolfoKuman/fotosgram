import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'rodolfo.kuman@gmail.com',
    password: '123456'
  };

  registroUser: Usuario = {
    email: 'david.garcia@gmail.com',
    nombre: 'David Garcia',
    password: '123456',
    avatar: 'av-1.png'
  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { 
    
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){
    if(fLogin.invalid){ return; }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    }else{
      this.uiService.alertaInformativa('Usuario o passwords incorrectos.');
    }

  }

  async registro(fRegistro: NgForm){
    
    if(fRegistro.invalid){ return; }

    const valido = await this.usuarioService.registro(this.registroUser);

    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    }else{
      this.uiService.alertaInformativa('El email ya existe.');
    }

  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}

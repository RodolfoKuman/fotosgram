import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { LocalService } from './local.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(private http: HttpClient,
              private localService : LocalService,
              private navCtrl: NavController) { }

  login(email: string, password: string){

    const data = { email, password }

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
        .subscribe(res => {
          if(res['ok']){

            this.localService.saveObject('token',res['token']);
            resolve(true);
  
          }else{
            this.token = null;
            this.localService.clearStorage();
            resolve(false);
          }
          
        })
    })

  }

  registro(usuario: Usuario){
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, usuario)
        .subscribe(res => {
          console.log(res);
          if(res['ok']){

            this.localService.saveObject('token', res['token']);
            resolve(true);
  
          }else{

            this.token = null;
            this.localService.clearStorage();
            resolve(false);

          }
        })
    })
  }

  async cargarToken(){
    this.localService.getObject("token").then( result => {
      this.token = JSON.parse(result.value) || null;  
   });
  }

  async validaToken(): Promise<boolean>{

    await this.cargarToken();

    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    
    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, { headers } )
          .subscribe(res => {
            if(res['ok']){

              this.usuario = res['usuario'];
              resolve(true);
    
            }else{
              this.navCtrl.navigateRoot('/login');
              resolve(false);
            }

          })

    });
  }

  getUsuario(){

    if(!this.usuario._id){
      this.validaToken();
    }

    return { ...this.usuario };

  }

  actualizarUsuario(usuario: Usuario){

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise<boolean>(resolve => {
      this.http.post(`${URL}/user/update`, usuario, { headers } )
          .subscribe(res => {
            if(res['ok']){
              this.localService.saveObject('token', res['token']);
              resolve(true);
            }else{
              resolve(false);
            }

          })
    });

    

  }
  
}

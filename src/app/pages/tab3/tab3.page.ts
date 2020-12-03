import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService,
              private ui: UiServiceService) {}

  ngOnInit(){
    this.usuario = this.usuarioService.getUsuario();
    console.log( this.usuario);
  }

  async actualizar(fActualizar: NgForm){

    if(fActualizar.invalid){ return;  }

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
          
    if(actualizado){
      this.ui.mostrarToast('Tus datos se actualizaron correctamente');
    }else{
      this.ui.mostrarToast('Ocurrio un error, intente de nuevo');
    }
  }

  logout(){

  }

}

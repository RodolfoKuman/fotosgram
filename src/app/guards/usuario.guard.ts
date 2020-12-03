import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService){}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    return this.usuarioService.validaToken();
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean  {
    return true;
  }
  
}

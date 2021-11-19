import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require('password-generator');
const cryptoJs = require('crypto-js');
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let  clave = generador(8,false);
    return clave;
  }

  CifrarClave(clave : String){
    let claveCifrada = cryptoJs.MD5(clave).toString();
    return claveCifrada;
  }


}



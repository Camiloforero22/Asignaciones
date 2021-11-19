import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const sgMail = require('@sendgrid/mail')

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionCorreoService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

 EnviarCorreo(correo : string, texto : string ){
  sgMail.setApiKey(process.env.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)
  const msg = {
    to: correo, // Change to your recipient
    from: 'camiloforero121@hotmail.com', // Change to your verified sender
    subject: 'Te ha registrado con exito',
    text: texto,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error:any) => {
      console.error(error)
    })
 }
}

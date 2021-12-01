import { /* inject, */ BindingScope, injectable} from '@loopback/core';
@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionSmsService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */


EnviarSMS(numero: String, texto : string){
//const accountSid = 'AC5118ee06286f102be4ad4393a95ad457'; // Your Account SID from www.twilio.com/console
//const authToken = 'dae0b4dc7213c1f0ecc5f73d5a1624c7'; // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: texto,
    to: numero, // Text this number
    //from: '+19808905595', // From a valid Twilio number
  })
  .then((message:any) => console.log(message.sid));


}

/*const sgMail = require('@sendgrid/mail')

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionCorreoService {
  constructor(/* Add @inject to inject parameters ) {}

  /*
   * Add service methods here
   */

 /*EnviarCorreo(correo : string, texto : string ){
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
}*/
}

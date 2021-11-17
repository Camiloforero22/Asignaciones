import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionSmsService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  NotificacionSMS(numero:string):void{
    const accountSid = 'AC5118ee06286f102be4ad4393a95ad457'; // Your Account SID from www.twilio.com/console
    const authToken = '4fc68531524fe3d3d401dc0caf48d241'; // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Tu dispositivo fue asignado',
    to: numero  , // Text this number
    from: '+19808905595', // From a valid Twilio number
  })
  .then((message:any) => console.log(message.sid));
  }
}

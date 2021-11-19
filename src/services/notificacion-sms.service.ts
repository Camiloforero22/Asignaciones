import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionSmsService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  NotificacionSMS(numero:string):void{
    const accountSid = 'AC5118ee06286f102be4ad4393a95ad457'; // Your Account SID from www.twilio.com/console
    const authToken = '4c60f74be3bc9b337bfbf4d8975ff6e2'; // Your Auth Token from www.twilio.com/console
    
    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);
    
    client.messages
      .create({
        body: 'Esta es una prueba',
        to: numero, // Text this number
        from: '+19808905595', // From a valid Twilio number
      })
      .then((message:any) => console.log(message.sid));


  }
}


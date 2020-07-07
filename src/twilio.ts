import  Twilio from 'twilio';
import { environment } from './environment';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';


export const sendSMS = (options :MessageListInstanceCreateOptions) => {
    const client =   Twilio(environment.twilio.sid, environment.twilio.token);
    client.messages.create(options, (err) => {
        if (err) console.error(err);
    } )
}

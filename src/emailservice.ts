import { environment } from './environment';
import mailgun from 'mailgun-js';
import { Trip } from './types';

const mg = mailgun({apiKey: environment.mailgun.apikey, domain: environment.mailgun.domain});

export const welcomeMail = (to:string, name:string) => { 
    const data = {    
        to: `${to}, ${name}`,
        subject: 'tripWiser welcomes you',
        text: `Hi ${name} welcome to tripWiser`,
        html: `<p> Hi ${name} welcome to tripWiser</p>`
    };
    mg.messages().send(data, function (error, body) {
        console.error(error);
    });
};

export const bookedTrip = (to:string, name: string, trip:Trip) => {
    const template =
        `<p>${trip.startLocation.cityName}</p>` + trip.destinations.map(destination => `<p>${destination.cityName}</p>`) + `<p>${trip.endLocation.cityName}</p>`
    
    const data = {
        to: `${to}, ${name}`,
        subject: 'tripWiser welcomes you',
        text: `Hi ${name} welcome to tripWiser`,
        html: `<p> Hi ${name}, you booked a trip on tripWiser<p>
        <p>here are your destinations<p> ${template}
        `
    };
    mg.messages().send(data, function (error, body) {
        console.error(error);
    });
}
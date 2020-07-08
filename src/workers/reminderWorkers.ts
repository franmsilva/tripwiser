import Trip from '../models/trip.model';

 const reminderWorker = () => {
    return {
        run: () => {
            Trip.sendSMSReminder();
        }
    }
};

export default reminderWorker();
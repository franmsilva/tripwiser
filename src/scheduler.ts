import Cron from 'cron';
const CronJob = Cron.CronJob;
import  reminderWorker  from './workers/reminderWorkers';

 const schedulerFactory = () => {
  return {
    start: () => {
        new CronJob('0 18 * * *', () => {
            console.log(`running trip notification worker ${new Date()}`);
            reminderWorker.run();
        }, null, true, '')
        },
    }
  };

export default schedulerFactory;
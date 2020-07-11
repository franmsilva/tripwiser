import Cron from 'cron';
import  reminderWorker  from './workers/reminderWorkers';
const CronJob = Cron.CronJob;

 const schedulerFactory = () => {
  return {
    start: () => {
        new CronJob('30 20 * * *', () => {
            console.log(`running trip notification worker ${new Date()}`);
            reminderWorker.run();
        }, null, true, '')
        },
    }
  };

export default schedulerFactory;
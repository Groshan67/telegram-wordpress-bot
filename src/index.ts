import { checkAndSendLatestPost } from './services/wpService';

const INTERVAL_MINUTES = 1;

const startMonitoring = async () => {
    await checkAndSendLatestPost();
    setInterval(checkAndSendLatestPost, INTERVAL_MINUTES * 60 * 1000);
};

startMonitoring();

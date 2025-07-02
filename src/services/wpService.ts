import axios from 'axios';
import { config } from '../config/index.js';
import { sendToTelegram, sendToTelegramGallery } from '../utils/telegram.js';

let latestPostId: number | null = null;

export const checkAndSendLatestPost = async (): Promise<void> => {
    try {
        const { data } = await axios.get(`${config.WP_API}/wp-json/wp/v2/posts?per_page=1&_fields=id,title,link,date,content`);
        const [latestPost] = data;
        //const {media} = await axios.get(`${config.WP_API}/wp-json/wp/v2/media?parent=${latestPost.id}`);

        if (!latestPostId || latestPost.id !== latestPostId) {
            latestPostId = latestPost.id;
            const htmlContent = latestPost.content.rendered;

            // استخراج URL تمام تصاویر
            const imageUrls = [...htmlContent.matchAll(/<img[^>]+src="([^">]+)"/g)].map(match => match[1]);

            // ترکیب لینک تصاویر
            const imageLinks = imageUrls.map((url, i) => `<a href="${url}">📷 تصویر ${i + 1}</a>`).join('\n');

            // پاک‌سازی تگ‌ها برای متن خالص
            const contentText = htmlContent.replace(/<[^>]*>/g, '').trim();

            // ساخت پیام
            //const message = `<b>${latestPost.title.rendered}</b>\n\n${contentText}\n\n${imageLinks}\n\n<a href="${latestPost.link}">مشاهده لینک</a>`;
            const message = `\n${contentText}\n\n${imageLinks}\n`;



            // ارسال گالری
            await sendToTelegramGallery(
                message,
                latestPost.link,
                imageUrls
            );
            // await sendToTelegram(message);
            console.log('🔔 New post sent to Telegram.');
        }
    } catch (error) {
        console.error('Error checking WordPress posts:', error);
    }
};
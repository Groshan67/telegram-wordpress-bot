import { Telegraf } from 'telegraf';
import { InputMediaPhoto } from 'telegraf/typings/core/types/typegram';

import { config } from '../config/index.js';

const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

export const sendToTelegram = async (message: string): Promise<void> => {
    await bot.telegram.sendMessage(config.TELEGRAM_CHAT_ID, message, {
        parse_mode: 'HTML'
    });
};

export const sendToTelegramGallery = async (
    title: string,
    link: string,
    imageUrls: string[]
): Promise<void> => {
    if (imageUrls.length === 0) return;

    const mediaGroup: InputMediaPhoto[] = imageUrls.slice(0, 10).map((url, index) => ({
        type: 'photo',
        media: url,
        ...(index === 0 && {
            caption: `<b>🔸🔸🔸${title}</b>\n<a href="${link}">📣برای مطالعه مشروح این خبر کلیک کنید</a>`,
            parse_mode: 'HTML'
        })
    })) as InputMediaPhoto[]; // 👈 اطمینان از نوع درست

    await bot.telegram.sendMediaGroup(config.TELEGRAM_CHAT_ID, mediaGroup);
};

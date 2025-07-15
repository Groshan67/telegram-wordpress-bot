import dotenv from 'dotenv';
dotenv.config();

export const config = {
    WP_API: process.env.WP_API!,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN!,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID!,
    WHATSAPP_TOKEN: process.env.WHATSAPP_TOKEN!,
    WHATSAPP_TO: process.env.WHATSAPP_TO!,
};

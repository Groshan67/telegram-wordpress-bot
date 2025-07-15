import axios from 'axios';
import { config } from '../config/index.js';

export const sendToWhatsapp = async (message: string): Promise<void> => {
    try {
        await axios.post(
            'https://graph.facebook.com/v19.0/YOUR_PHONE_NUMBER_ID/messages',
            {
                messaging_product: 'whatsapp',
                to: config.WHATSAPP_TO,
                type: 'text',
                text: { body: message }
            },
            {
                headers: {
                    'Authorization': `Bearer ${config.WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('📤 پیام به واتساپ ارسال شد');
    } catch (error) {
        console.error('❌ ارسال به واتساپ با خطا مواجه شد:', error);
    }
};

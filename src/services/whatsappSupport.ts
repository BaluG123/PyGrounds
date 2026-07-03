import { Alert, Linking, Platform } from 'react-native';
import { BRAND } from '../constants/brand';

export const WHATSAPP_SUPPORT_PHONE = '919380552833';
export const WHATSAPP_SUPPORT_DISPLAY = '+91 9380552833';

/** Opens WhatsApp chat with pre-filled support message. Tries wa.me first (most reliable). */
export async function openWhatsAppSupport(
  message: string = BRAND.supportMessage,
): Promise<boolean> {
  const encoded = encodeURIComponent(message);
  const waMeUrl = `https://wa.me/${WHATSAPP_SUPPORT_PHONE}?text=${encoded}`;
  const apiUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_SUPPORT_PHONE}&text=${encoded}`;
  const schemeUrl = `whatsapp://send?phone=${WHATSAPP_SUPPORT_PHONE}&text=${encoded}`;

  const urls = Platform.OS === 'ios'
    ? [waMeUrl, schemeUrl, apiUrl]
    : [waMeUrl, apiUrl, schemeUrl];

  for (const url of urls) {
    try {
      await Linking.openURL(url);
      return true;
    } catch {
      // try next URL
    }
  }

  Alert.alert(
    'Contact Support',
    `Could not open WhatsApp. Please message ${WHATSAPP_SUPPORT_DISPLAY} manually.`,
  );
  return false;
}

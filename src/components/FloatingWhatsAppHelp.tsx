import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { openWhatsAppSupport } from '../services/whatsappSupport';
import { colors, shadow } from '../theme/theme';

export function FloatingWhatsAppHelp() {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      style={[
        styles.fab,
        {
          bottom: Math.max(insets.bottom, 16) + 8,
        },
      ]}
      onPress={() => openWhatsAppSupport()}
      accessibilityRole="button"
      accessibilityLabel="Need help? Chat with us on WhatsApp"
    >
      <MessageCircle color={colors.surface} size={26} strokeWidth={2.2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
  },
});

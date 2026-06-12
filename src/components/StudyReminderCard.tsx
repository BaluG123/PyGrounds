import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import { Bell, Check } from 'lucide-react-native';
import { colors } from '../theme/theme';
import { studyReminderTimes, type StudyReminderTime } from '../services/firebase';
import {
  enableStudyReminder,
  getStudyReminderTime,
  loadStudyReminder,
  type StudyReminderState,
} from '../services/studyReminder';

export function StudyReminderCard() {
  const [state, setState] = useState<StudyReminderState | null>(null);
  const [selected, setSelected] = useState<StudyReminderTime>(studyReminderTimes[2]);
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const animatedHeight = useState(new Animated.Value(0))[0];

  useEffect(() => {
    let active = true;

    loadStudyReminder().then(saved => {
      if (!active) {
        return;
      }
      setState(saved);
      setSelected(getStudyReminderTime(saved.reminderId));
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded, animatedHeight]);

  async function handleEnable(reminder: StudyReminderTime) {
    setSelected(reminder);
    setSaving(true);

    try {
      const next = await enableStudyReminder(reminder);
      if (!next) {
        Alert.alert('Notifications', 'Permission was not granted.');
        return;
      }

      setState(next);
      setExpanded(false);
      Alert.alert('✓ Reminder set', `Daily nudge at ${reminder.timeLabel}`);
    } catch (error) {
      Alert.alert(
        'Setup needed',
        error instanceof Error ? error.message : 'Unable to enable reminders.',
      );
    } finally {
      setSaving(false);
    }
  }

  const enabledReminder = state?.enabled ? getStudyReminderTime(state.reminderId) : null;

  const maxHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400],
  });

  return (
    <View style={styles.card}>
      <Pressable 
        style={styles.compactRow}
        onPress={() => setExpanded(!expanded)}
        accessibilityRole="button"
        accessibilityLabel={expanded ? "Collapse study reminder" : "Expand study reminder"}
      >
        <View style={styles.iconBubble}>
          <Bell color={colors.surface} size={18} />
        </View>
        <View style={styles.compactText}>
          <Text style={styles.compactTitle}>Daily Learning Reminder</Text>
          <Text style={styles.compactSubtitle}>
            {enabledReminder ? `Active: ${enabledReminder.timeLabel}` : 'Tap to set your daily nudge'}
          </Text>
        </View>
        {enabledReminder && (
          <View style={styles.activeBadge}>
            <Check color={colors.green} size={14} />
          </View>
        )}
      </Pressable>

      <Animated.View style={[styles.expandedContent, { maxHeight, overflow: 'hidden' }]}>
        {expanded && (
          <>
            <View style={styles.divider} />
            <Text style={styles.pickerLabel}>Choose your preferred time:</Text>
            <View style={styles.timeGrid}>
              {studyReminderTimes.map(reminder => {
                const active = selected.id === reminder.id;
                const saved = enabledReminder?.id === reminder.id;

                return (
                  <Pressable
                    key={reminder.id}
                    disabled={saving}
                    onPress={() => handleEnable(reminder)}
                    style={[styles.timeChip, active && styles.timeChipActive, saved && styles.timeChipSaved]}
                  >
                    <Text style={[styles.timeChipText, active && styles.timeChipTextActive]}>
                      {reminder.timeLabel}
                    </Text>
                    {saved && <Check color={colors.surface} size={14} />}
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.green,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactText: {
    flex: 1,
  },
  compactTitle: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '900',
  },
  compactSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    marginTop: 2,
  },
  activeBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  pickerLabel: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  timeChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeChipActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  timeChipSaved: {
    backgroundColor: colors.navy,
    borderColor: colors.surface,
  },
  timeChipText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '800',
  },
  timeChipTextActive: {
    color: colors.surface,
  },
});

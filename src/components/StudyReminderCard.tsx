import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Bell, Check, Clock3 } from 'lucide-react-native';
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
  const [saving, setSaving] = useState(false);

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

  async function handleEnable(reminder: StudyReminderTime) {
    setSelected(reminder);
    setSaving(true);

    try {
      const next = await enableStudyReminder(reminder);
      if (!next) {
        Alert.alert('Notifications', 'Permission was not granted, so study reminders stayed off.');
        return;
      }

      setState(next);
      Alert.alert('Study reminder set', `PyGrounds will remind you around ${reminder.timeLabel}.`);
    } catch (error) {
      Alert.alert(
        'Reminder setup needed',
        error instanceof Error ? error.message : 'Unable to enable study reminders.',
      );
    } finally {
      setSaving(false);
    }
  }

  const enabledReminder = state?.enabled ? getStudyReminderTime(state.reminderId) : null;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconBubble}>
          <Bell color={colors.green} size={21} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Study reminder</Text>
          <Text style={styles.subtitle}>
            {enabledReminder
              ? `${enabledReminder.label} at ${enabledReminder.timeLabel}`
              : 'Pick a daily clock time for a learning nudge.'}
          </Text>
        </View>
      </View>

      <View style={styles.timeGrid}>
        {studyReminderTimes.map(reminder => {
          const active = selected.id === reminder.id;
          const saved = enabledReminder?.id === reminder.id;

          return (
            <Pressable
              key={reminder.id}
              accessibilityRole="button"
              accessibilityLabel={`Set study reminder for ${reminder.timeLabel}`}
              disabled={saving}
              onPress={() => handleEnable(reminder)}
              style={[styles.timeButton, active && styles.timeButtonActive]}
            >
              <View style={styles.timeTopRow}>
                <Clock3 color={active ? colors.surface : colors.green} size={17} />
                {saved ? <Check color={active ? colors.surface : colors.green} size={17} /> : null}
              </View>
              <Text style={[styles.timeText, active && styles.timeTextActive]}>{reminder.timeLabel}</Text>
              <Text style={[styles.timeLabel, active && styles.timeLabelActive]} numberOfLines={1}>
                {reminder.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.footer}>Daily reminders stay synced with your learning profile.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    lineHeight: 20,
    marginTop: 3,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    width: '48%',
    minHeight: 90,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.background,
    padding: 12,
    justifyContent: 'space-between',
  },
  timeButtonActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  timeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 8,
  },
  timeTextActive: {
    color: colors.surface,
  },
  timeLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
  timeLabelActive: {
    color: '#E8F5EF',
  },
  footer: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
});

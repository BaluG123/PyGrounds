import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
  Pressable,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FileText, ExternalLink } from 'lucide-react-native';
import type { CourseStackParamList } from '../navigation/types';
import { notesRegistry } from '../content/notesRegistry';
import { courses } from '../content/courses';
import { colors, shadow } from '../theme/theme';

type Props = NativeStackScreenProps<CourseStackParamList, 'Notes'>;

export function PDFViewerScreen({ route }: Props) {
  const { courseId } = route.params;
  const course = courses.find((c) => c.id === courseId);
  const note = notesRegistry[courseId];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!note) {
    return (
      <View style={styles.center}>
        <View style={styles.emptyCard}>
          <FileText color={colors.muted} size={48} />
          <Text style={styles.emptyTitle}>Notes Coming Soon</Text>
          <Text style={styles.emptyText}>
            PDF notes for {course?.title || 'this course'} are not available yet.
            Check back later!
          </Text>
        </View>
      </View>
    );
  }

  // Helper to convert standard Google Drive share links to direct download URLs
  const getDirectPdfUrl = (uri: string): string => {
    if (uri.includes('drive.google.com')) {
      const fileIdMatch = uri.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
      }
      const idMatch = uri.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
      }
    }
    return uri;
  };

  // For Android, use Google Docs viewer to render PDF in WebView
  const rawUri = note.pdfUri;
  const directUri = getDirectPdfUrl(rawUri);
  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(directUri)}`;

  // If it's a local file, we show a card with an "Open" button instead
  const isLocalFile = rawUri.startsWith('file://') || !rawUri.startsWith('http');

  if (isLocalFile) {
    return (
      <View style={styles.center}>
        <View style={styles.emptyCard}>
          <FileText color={course?.color || colors.green} size={48} />
          <Text style={styles.emptyTitle}>{note.title}</Text>
          <Text style={styles.emptyText}>
            This PDF is bundled with the app. Tap below to open it with your device's PDF viewer.
          </Text>
          <Pressable
            style={[styles.openButton, { backgroundColor: course?.color || colors.green }]}
            onPress={() => {
              Linking.openURL(rawUri).catch(() => {
                // If cannot open, show error
              });
            }}
          >
            <ExternalLink color={colors.surface} size={18} />
            <Text style={styles.openButtonText}>Open PDF</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: course?.color || colors.navy }]}>
        <Text style={styles.headerTitle}>{note.title}</Text>
      </View>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={course?.color || colors.green} />
          <Text style={styles.loadingText}>Loading PDF...</Text>
        </View>
      )}
      {error ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Failed to load PDF. Please check your internet connection.</Text>
        </View>
      ) : (
        <WebView
          source={{ uri: googleDocsUrl }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          startInLoadingState={false}
          javaScriptEnabled
          domStorageEnabled
          scalesPageToFit
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    zIndex: 10,
  },
  headerTitle: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: '800',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 24,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    maxWidth: 320,
    ...shadow,
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  openButtonText: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 15,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  loadingText: {
    color: colors.muted,
    marginTop: 12,
    fontWeight: '600',
  },
  webview: {
    flex: 1,
    backgroundColor: '#E5E5EA',
  },
});

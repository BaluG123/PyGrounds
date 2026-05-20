import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/theme';

type Props = {
  headers: string[];
  rows: string[][];
};

export function TableBlock({ headers, rows }: Props) {
  return (
    <View style={styles.wrap}>
      {/* Header row */}
      <View style={styles.headerRow}>
        {headers.map((header, i) => (
          <View key={`h-${i}`} style={[styles.cell, styles.headerCell, i === 0 && styles.firstCell]}>
            <Text style={styles.headerText}>{header}</Text>
          </View>
        ))}
      </View>

      {/* Data rows */}
      {rows.map((row, ri) => (
        <View
          key={`r-${ri}`}
          style={[styles.dataRow, ri % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >
          {row.map((cell, ci) => (
            <View key={`c-${ri}-${ci}`} style={[styles.cell, ci === 0 && styles.firstCell]}>
              <Text style={styles.cellText}>{cell}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
    marginVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.ink,
  },
  dataRow: {
    flexDirection: 'row',
  },
  evenRow: {
    backgroundColor: colors.surface,
  },
  oddRow: {
    backgroundColor: '#F6F7F4',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: colors.line,
  },
  firstCell: {
    flex: 1.2,
  },
  headerCell: {
    borderRightColor: 'rgba(255,255,255,0.2)',
  },
  headerText: {
    color: colors.surface,
    fontWeight: '900',
    fontSize: 13,
  },
  cellText: {
    color: colors.ink,
    fontSize: 13,
    lineHeight: 19,
  },
});

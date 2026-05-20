import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import { colors } from '../theme/theme';
import type { RunnerResult } from '../services/codeRunner';

export function MiniPlot({ plot }: { plot: NonNullable<RunnerResult['plot']> }) {
  const max = Math.max(...plot.values);
  const min = Math.min(...plot.values);
  const range = max - min || 1;
  const width = 280;
  const height = 150;
  const points = plot.values.map((value, index) => {
    const x = 30 + index * ((width - 60) / Math.max(plot.values.length - 1, 1));
    const y = height - 28 - ((value - min) / range) * 90;
    return { x, y, value };
  });

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{plot.title}</Text>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <Line x1="28" y1="18" x2="28" y2="122" stroke={colors.line} strokeWidth="2" />
        <Line x1="28" y1="122" x2="260" y2="122" stroke={colors.line} strokeWidth="2" />
        {plot.kind === 'line'
          ? points.map((point, index) => {
              const previous = points[index - 1];
              return previous ? (
                <Line
                  key={`${point.x}-${point.y}`}
                  x1={previous.x}
                  y1={previous.y}
                  x2={point.x}
                  y2={point.y}
                  stroke={colors.green}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              ) : null;
            })
          : points.map((point, index) => (
              <Rect
                key={`${point.x}-${index}`}
                x={34 + index * 42}
                y={point.y}
                width="30"
                height={122 - point.y}
                rx="4"
                fill={colors.coral}
              />
            ))}
        {points.map((point, index) => (
          <SvgText key={`label-${index}`} x={point.x - 6} y="140" fill={colors.muted} fontSize="10">
            {index + 1}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 14,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
  },
  title: {
    color: colors.ink,
    fontWeight: '800',
    marginBottom: 4,
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Rect, Text as SvgText, Line, Polygon } from 'react-native-svg';
import type { DiagramBox, DiagramArrow } from '../../types/course';
import { colors } from '../../theme/theme';

type Props = {
  title: string;
  boxes: DiagramBox[];
  arrows: DiagramArrow[];
  height?: number;
};

export function DiagramBlock({ title, boxes, arrows, height = 200 }: Props) {
  const boxMap = new Map(boxes.map(b => [b.id, b]));

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Svg width="100%" height={height} viewBox={`0 0 320 ${height}`}>
        {/* Arrows */}
        {arrows.map((arrow, i) => {
          const fromBox = boxMap.get(arrow.from);
          const toBox = boxMap.get(arrow.to);
          if (!fromBox || !toBox) { return null; }
          const fw = fromBox.width ?? 80;
          const fh = fromBox.height ?? 40;
          const tw = toBox.width ?? 80;
          const th = toBox.height ?? 40;

          const x1 = fromBox.x + fw / 2;
          const y1 = fromBox.y + fh / 2;
          const x2 = toBox.x + tw / 2;
          const y2 = toBox.y + th / 2;

          // Calculate arrow endpoint at box edge
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = dx / len;
          const ny = dy / len;

          const endX = x2 - nx * (tw / 2 + 4);
          const endY = y2 - ny * (th / 2 + 4);
          const startX = x1 + nx * (fw / 2 + 2);
          const startY = y1 + ny * (fh / 2 + 2);

          // Arrow head
          const aSize = 8;
          const ax1 = endX - aSize * nx + aSize * 0.5 * ny;
          const ay1 = endY - aSize * ny - aSize * 0.5 * nx;
          const ax2 = endX - aSize * nx - aSize * 0.5 * ny;
          const ay2 = endY - aSize * ny + aSize * 0.5 * nx;

          return (
            <React.Fragment key={`arrow-${i}`}>
              <Line
                x1={startX} y1={startY}
                x2={endX} y2={endY}
                stroke={colors.muted}
                strokeWidth="2"
              />
              <Polygon
                points={`${endX},${endY} ${ax1},${ay1} ${ax2},${ay2}`}
                fill={colors.muted}
              />
              {arrow.label ? (
                <SvgText
                  x={(startX + endX) / 2}
                  y={(startY + endY) / 2 - 6}
                  fill={colors.muted}
                  fontSize="10"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {arrow.label}
                </SvgText>
              ) : null}
            </React.Fragment>
          );
        })}

        {/* Boxes */}
        {boxes.map(box => {
          const w = box.width ?? 80;
          const h = box.height ?? 40;
          const boxColor = box.color ?? colors.green;
          return (
            <React.Fragment key={box.id}>
              <Rect
                x={box.x}
                y={box.y}
                width={w}
                height={h}
                rx={8}
                fill={boxColor}
                opacity={0.15}
                stroke={boxColor}
                strokeWidth="2"
              />
              <SvgText
                x={box.x + w / 2}
                y={box.y + h / 2 + 4}
                fill={boxColor}
                fontSize="12"
                fontWeight="800"
                textAnchor="middle"
              >
                {box.label}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    marginVertical: 12,
  },
  title: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

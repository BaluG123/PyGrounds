import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Rect, Text as SvgText, Circle, Line } from 'react-native-svg';
import { colors } from '../../theme/theme';

type Props = {
  title: string;
  imageType: string;
  data?: Record<string, any>;
};

function VariableBoxes() {
  return (
    <Svg width="100%" height={140} viewBox="0 0 300 140">
      {/* Box 1: name = "Ada" */}
      <Rect x={10} y={10} width={85} height={55} rx={8} fill="#DDF4E8" stroke="#1D7A57" strokeWidth={2} />
      <SvgText x={52} y={28} fill="#1D7A57" fontSize="11" fontWeight="800" textAnchor="middle">name</SvgText>
      <SvgText x={52} y={50} fill="#17211D" fontSize="14" fontWeight="900" textAnchor="middle">"Ada"</SvgText>
      {/* Box 2: age = 30 */}
      <Rect x={108} y={10} width={85} height={55} rx={8} fill="#E3EEF9" stroke="#2B6CB0" strokeWidth={2} />
      <SvgText x={150} y={28} fill="#2B6CB0" fontSize="11" fontWeight="800" textAnchor="middle">age</SvgText>
      <SvgText x={150} y={50} fill="#17211D" fontSize="14" fontWeight="900" textAnchor="middle">30</SvgText>
      {/* Box 3: pi = 3.14 */}
      <Rect x={206} y={10} width={85} height={55} rx={8} fill="#EDE8F5" stroke="#7454C4" strokeWidth={2} />
      <SvgText x={248} y={28} fill="#7454C4" fontSize="11" fontWeight="800" textAnchor="middle">pi</SvgText>
      <SvgText x={248} y={50} fill="#17211D" fontSize="14" fontWeight="900" textAnchor="middle">3.14</SvgText>
      {/* Labels */}
      <SvgText x={52} y={85} fill="#68736E" fontSize="10" textAnchor="middle">str</SvgText>
      <SvgText x={150} y={85} fill="#68736E" fontSize="10" textAnchor="middle">int</SvgText>
      <SvgText x={248} y={85} fill="#68736E" fontSize="10" textAnchor="middle">float</SvgText>
      {/* Memory label */}
      <SvgText x={150} y={120} fill="#68736E" fontSize="11" fontWeight="700" textAnchor="middle">📦 Variables are labeled boxes in memory</SvgText>
    </Svg>
  );
}

function LoopFlow() {
  return (
    <Svg width="100%" height={160} viewBox="0 0 300 160">
      <Rect x={95} y={5} width={110} height={32} rx={8} fill="#DDF4E8" stroke="#1D7A57" strokeWidth={2} />
      <SvgText x={150} y={26} fill="#1D7A57" fontSize="12" fontWeight="800" textAnchor="middle">Start Loop</SvgText>
      <Line x1={150} y1={37} x2={150} y2={55} stroke="#68736E" strokeWidth={2} />
      <Rect x={75} y={55} width={150} height={32} rx={8} fill="#FFF9E8" stroke="#D4A017" strokeWidth={2} />
      <SvgText x={150} y={76} fill="#D4A017" fontSize="12" fontWeight="800" textAnchor="middle">Condition True?</SvgText>
      <Line x1={150} y1={87} x2={150} y2={105} stroke="#68736E" strokeWidth={2} />
      <Rect x={85} y={105} width={130} height={32} rx={8} fill="#E3EEF9" stroke="#2B6CB0" strokeWidth={2} />
      <SvgText x={150} y={126} fill="#2B6CB0" fontSize="12" fontWeight="800" textAnchor="middle">Execute Body</SvgText>
      {/* Loop arrow back */}
      <Line x1={85} y1={121} x2={40} y2={121} stroke="#1D7A57" strokeWidth={2} />
      <Line x1={40} y1={121} x2={40} y2={71} stroke="#1D7A57" strokeWidth={2} />
      <Line x1={40} y1={71} x2={75} y2={71} stroke="#1D7A57" strokeWidth={2} />
      {/* Exit arrow */}
      <Line x1={225} y1={71} x2={280} y2={71} stroke="#E56B5D" strokeWidth={2} />
      <SvgText x={260} y={64} fill="#E56B5D" fontSize="10" fontWeight="700" textAnchor="middle">Exit</SvgText>
    </Svg>
  );
}

function ListVisualization() {
  return (
    <Svg width="100%" height={120} viewBox="0 0 300 120">
      <SvgText x={150} y={16} fill="#17211D" fontSize="12" fontWeight="800" textAnchor="middle">fruits = ["apple", "banana", "cherry"]</SvgText>
      {['apple', 'banana', 'cherry'].map((item, i) => (
        <React.Fragment key={item}>
          <Rect x={20 + i * 95} y={30} width={85} height={45} rx={8} fill="#FDEDEA" stroke="#E56B5D" strokeWidth={2} />
          <SvgText x={62 + i * 95} y={45} fill="#68736E" fontSize="10" fontWeight="700" textAnchor="middle">[{i}]</SvgText>
          <SvgText x={62 + i * 95} y={63} fill="#17211D" fontSize="13" fontWeight="800" textAnchor="middle">{item}</SvgText>
        </React.Fragment>
      ))}
      <SvgText x={150} y={105} fill="#68736E" fontSize="11" fontWeight="700" textAnchor="middle">Index starts at 0, length = 3</SvgText>
    </Svg>
  );
}

function FunctionFlow() {
  return (
    <Svg width="100%" height={130} viewBox="0 0 300 130">
      <Rect x={10} y={35} width={70} height={40} rx={8} fill="#DDF4E8" stroke="#1D7A57" strokeWidth={2} />
      <SvgText x={45} y={60} fill="#1D7A57" fontSize="12" fontWeight="800" textAnchor="middle">Input</SvgText>
      <Line x1={80} y1={55} x2={105} y2={55} stroke="#68736E" strokeWidth={2} />
      <SvgText x={93} y={48} fill="#68736E" fontSize="10" textAnchor="middle">→</SvgText>
      <Rect x={105} y={25} width={90} height={60} rx={12} fill="#E3EEF9" stroke="#2B6CB0" strokeWidth={2} />
      <SvgText x={150} y={48} fill="#2B6CB0" fontSize="11" fontWeight="800" textAnchor="middle">Function</SvgText>
      <SvgText x={150} y={68} fill="#2B6CB0" fontSize="11" fontWeight="800" textAnchor="middle">def greet()</SvgText>
      <Line x1={195} y1={55} x2={220} y2={55} stroke="#68736E" strokeWidth={2} />
      <SvgText x={208} y={48} fill="#68736E" fontSize="10" textAnchor="middle">→</SvgText>
      <Rect x={220} y={35} width={70} height={40} rx={8} fill="#EDE8F5" stroke="#7454C4" strokeWidth={2} />
      <SvgText x={255} y={60} fill="#7454C4" fontSize="12" fontWeight="800" textAnchor="middle">Output</SvgText>
      <SvgText x={150} y={115} fill="#68736E" fontSize="11" fontWeight="700" textAnchor="middle">Input → Process → Return Output</SvgText>
    </Svg>
  );
}

function IfElseBranch() {
  return (
    <Svg width="100%" height={160} viewBox="0 0 300 160">
      <Rect x={100} y={5} width={100} height={32} rx={8} fill="#FFF9E8" stroke="#D4A017" strokeWidth={2} />
      <SvgText x={150} y={26} fill="#D4A017" fontSize="12" fontWeight="800" textAnchor="middle">Condition?</SvgText>
      <Line x1={120} y1={37} x2={60} y2={70} stroke="#1D7A57" strokeWidth={2} />
      <Line x1={180} y1={37} x2={240} y2={70} stroke="#E56B5D" strokeWidth={2} />
      <SvgText x={80} y={55} fill="#1D7A57" fontSize="10" fontWeight="700">True ✓</SvgText>
      <SvgText x={195} y={55} fill="#E56B5D" fontSize="10" fontWeight="700">False ✗</SvgText>
      <Rect x={15} y={70} width={90} height={35} rx={8} fill="#DDF4E8" stroke="#1D7A57" strokeWidth={2} />
      <SvgText x={60} y={92} fill="#1D7A57" fontSize="11" fontWeight="800" textAnchor="middle">if block</SvgText>
      <Rect x={195} y={70} width={90} height={35} rx={8} fill="#FDEDEA" stroke="#E56B5D" strokeWidth={2} />
      <SvgText x={240} y={92} fill="#E56B5D" fontSize="11" fontWeight="800" textAnchor="middle">else block</SvgText>
      <Line x1={60} y1={105} x2={60} y2={125} stroke="#68736E" strokeWidth={2} />
      <Line x1={240} y1={105} x2={240} y2={125} stroke="#68736E" strokeWidth={2} />
      <Line x1={60} y1={125} x2={240} y2={125} stroke="#68736E" strokeWidth={2} />
      <Rect x={110} y={130} width={80} height={25} rx={6} fill="#F6F7F4" stroke="#68736E" strokeWidth={1} />
      <SvgText x={150} y={148} fill="#68736E" fontSize="10" fontWeight="700" textAnchor="middle">Continue...</SvgText>
    </Svg>
  );
}

const IMAGE_MAP: Record<string, React.FC> = {
  'variable-boxes': VariableBoxes,
  'loop-flow': LoopFlow,
  'list-visualization': ListVisualization,
  'function-flow': FunctionFlow,
  'if-else-branch': IfElseBranch,
};

export function ImageBlock({ title, imageType }: Props) {
  const ImageComponent = IMAGE_MAP[imageType];

  return (
    <View style={styles.wrap}>
      {ImageComponent ? <ImageComponent /> : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>📊 {imageType}</Text>
        </View>
      )}
      <Text style={styles.caption}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    marginVertical: 12,
    alignItems: 'center',
  },
  caption: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  placeholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.muted,
    fontSize: 16,
  },
});

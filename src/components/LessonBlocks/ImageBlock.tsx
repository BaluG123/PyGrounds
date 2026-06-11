import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { X, ZoomIn } from 'lucide-react-native';
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

const ASSET_IMAGE_MAP: Record<string, ImageSourcePropType> = {
  'mobile-pandas-card-1': require('../../assets/mobile_pandas_card1_Series_DataFrame.png'),
  'mobile-pandas-card-2': require('../../assets/mobile_pandas_card2_Selecting_loc_iloc.png'),
  'mobile-pandas-card-3': require('../../assets/mobile_pandas_card3_Missing_Values.png'),
  'mobile-pandas-card-4': require('../../assets/mobile_pandas_card4_Filtering_Sorting_Assigning.png'),
  'mobile-pandas-card-5': require('../../assets/mobile_pandas_card5_GroupBy_Split_Apply_Combine.png'),
  'mobile-pandas-card-6': require('../../assets/mobile_pandas_card6_Merging_Joining.png'),
  'mobile-pandas-card-7': require('../../assets/mobile_pandas_card7_Datetime_Resampling.png'),
  'numpy-card-1': require('../../assets/numpy_01_ndarray_shape_dtype_axes.png'),
  'numpy-card-2': require('../../assets/numpy_02_Vectorization.png'),
  'numpy-card-3': require('../../assets/numpy_03_Broadcasting_rules.png'),
  'numpy-card-4': require('../../assets/numpy_04_Boolean_masks_fancy_indexing.png'),
  'numpy-card-5': require('../../assets/numpy_05_Aggregations_across_axes.png'),
  'numpy-card-6': require('../../assets/numpy_06_Random_sampling_seeds.png'),
  'numpy-card-7': require('../../assets/numpy_07_Linear_algebra.png'),
  'numpy-card-8': require('../../assets/numpy_08_Saving_arrays_tensors_ML.png'),
  'matplotlib-card-1': require('../../assets/matplotlib_01_Figure_and_Axes_Objects.png'),
  'matplotlib-card-2': require('../../assets/matplotlib_02_Line_Scatter_Bar_Hist_Heatmap.png'),
  'matplotlib-card-3': require('../../assets/matplotlib_03_Labels_Legends_Titles_Grids_Annotations.png'),
  'matplotlib-card-4': require('../../assets/matplotlib_04_Choosing_Chart_Types_by_Question.png'),
  'matplotlib-card-5': require('../../assets/matplotlib_05_Visualizing_Distributions_Outliers.png'),
  'matplotlib-card-6': require('../../assets/matplotlib_06_Plotting_Training_Curves_Residuals.png'),
  'matplotlib-card-7': require('../../assets/matplotlib_07_Subplots_MultiPanel_Layouts.png'),
  'matplotlib-card-8': require('../../assets/matplotlib_08_Saving_Reproducible_Figures.png'),
};

function ZoomableAssetImage({ source, width, height }: { source: ImageSourcePropType; width: number; height: number }) {
  const maxScale = 8;
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = Math.min(Math.max(savedScale.value * event.scale, 1), maxScale);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      if (scale.value <= 1.01) {
        scale.value = withTiming(1);
        savedScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        savedX.value = 0;
        savedY.value = 0;
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (scale.value <= 1) {
        return;
      }
      translateX.value = savedX.value + event.translationX;
      translateY.value = savedY.value + event.translationY;
    })
    .onEnd(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      const shouldReset = scale.value > 1;
      scale.value = withTiming(shouldReset ? 1 : 4);
      savedScale.value = shouldReset ? 1 : 4;
      if (shouldReset) {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        savedX.value = 0;
        savedY.value = 0;
      }
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture, doubleTapGesture);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.Image source={source} resizeMode="contain" style={[{ width, height }, animatedStyle]} />
    </GestureDetector>
  );
}

export function ImageBlock({ title, imageType }: Props) {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const { width, height } = useWindowDimensions();
  const ImageComponent = IMAGE_MAP[imageType];
  const assetImage = ASSET_IMAGE_MAP[imageType];
  const assetMeta = assetImage ? Image.resolveAssetSource(assetImage) : undefined;
  const aspectRatio = assetMeta ? assetMeta.width / assetMeta.height : 1.5;
  const inlineWidth = Math.max(220, Math.min(width - 64, 640));
  const inlineHeight = inlineWidth / aspectRatio;
  const fitWidth = Math.min(width - 40, (height - 140) * aspectRatio);
  const zoomWidth = Math.max(220, fitWidth);
  const zoomHeight = zoomWidth / aspectRatio;

  return (
    <View style={styles.wrap}>
      {assetImage ? (
        <>
          <Pressable
            accessibilityLabel={`Open ${title} image`}
            accessibilityRole="imagebutton"
            onPress={() => setIsZoomed(true)}
            style={[styles.assetFrame, { width: inlineWidth, height: inlineHeight }]}
          >
            <Image source={assetImage} style={styles.assetImage} resizeMode="contain" />
            <View style={styles.zoomBadge}>
              <ZoomIn color={colors.surface} size={17} />
            </View>
          </Pressable>
          <Modal visible={isZoomed} animationType="fade" onRequestClose={() => setIsZoomed(false)}>
            <View style={styles.modal}>
              <Pressable
                accessibilityLabel="Close image"
                accessibilityRole="button"
                onPress={() => setIsZoomed(false)}
                style={styles.closeButton}
              >
                <X color={colors.surface} size={24} />
              </Pressable>
              <View style={styles.zoomStage}>
                <ZoomableAssetImage source={assetImage} width={zoomWidth} height={zoomHeight} />
              </View>
            </View>
          </Modal>
        </>
      ) : ImageComponent ? <ImageComponent /> : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{imageType}</Text>
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
    overflow: 'hidden',
  },
  assetFrame: {
    maxWidth: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  assetImage: {
    width: '100%',
    height: '100%',
  },
  zoomBadge: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(23, 33, 29, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: colors.code,
  },
  closeButton: {
    position: 'absolute',
    top: 44,
    right: 18,
    zIndex: 2,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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

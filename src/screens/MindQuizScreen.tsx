import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Animated, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check, X, Flame, Timer, ArrowRight, Brain, RotateCcw } from 'lucide-react-native';
import { getQuestionsByCategory } from '../content/mindQuestions';
import { CATEGORY_META } from '../types/mindQuiz';
import type { CourseStackParamList } from '../navigation/types'; // We will add to this stack param list or drawer stack
import { colors, shadow } from '../theme/theme';

import type { RefreshMindStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RefreshMindStackParamList, 'MindQuiz'>;

export function MindQuizScreen({ route, navigation }: Props) {
  const { category, difficulty } = route.params;
  const meta = CATEGORY_META[category];

  const [questions, setQuestions] = useState(() => getQuestionsByCategory(category, difficulty));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Timer
  const [timeLeft, setTimeLeft] = useState(category === 'speed' ? 15 : 30);
  const timerRef = useRef<any>(null);

  // Animations
  const streakScale = useRef(new Animated.Value(1)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (quizFinished) return;

    // Reset timer for new question
    setTimeLeft(category === 'speed' ? 15 : 30);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, quizFinished]);

  const handleTimeOut = () => {
    setSelectedOption(-1); // Indication that no option was chosen in time
    setAnswered(true);
    setStreak(0);
    triggerShake();
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  const triggerStreakPop = () => {
    Animated.sequence([
      Animated.timing(streakScale, { toValue: 1.4, duration: 150, useNativeDriver: true }),
      Animated.timing(streakScale, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (answered) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOption(optionIndex);
    setAnswered(true);

    const isCorrect = optionIndex === currentQuestion.answerIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((st) => {
        const next = st + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
      triggerStreakPop();
    } else {
      setStreak(0);
      triggerShake();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setAnswered(false);
        fadeAnim.setValue(1);
      });
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setQuestions(getQuestionsByCategory(category, difficulty));
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <View style={styles.finishedScreen}>
        <View style={styles.finishedCard}>
          <Brain color={meta.color} size={64} style={styles.finishedIcon} />
          <Text style={styles.finishedTitle}>Quiz Finished!</Text>
          <Text style={styles.finishedSub}>Here is how you performed today:</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{score}/{questions.length}</Text>
              <Text style={styles.statLabel}>Score</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: colors.coral }]}>
                <Flame size={18} color={colors.coral} /> {bestStreak}
              </Text>
              <Text style={styles.statLabel}>Max Streak</Text>
            </View>
          </View>

          <View style={styles.praiseSection}>
            <Text style={styles.praiseText}>
              {score === questions.length
                ? '🧠 Absolutely brilliant! Mind is perfectly sharp!'
                : score >= 7
                ? '🔥 Outstanding work! Keep it up!'
                : score >= 4
                ? '💪 Good exercise! A great mental warm-up!'
                : '🌱 Good try! Keep practicing to sharpen your mind.'}
            </Text>
          </View>

          <View style={styles.finishedButtons}>
            <Pressable style={[styles.actionBtn, { backgroundColor: meta.color }]} onPress={handleRestart}>
              <RotateCcw color="#FFF" size={18} />
              <Text style={styles.actionBtnText}>Try Again</Text>
            </Pressable>
            <Pressable style={[styles.actionBtn, styles.backBtn]} onPress={() => navigation.goBack()}>
              <Text style={styles.backBtnText}>Exit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const progress = (currentIndex + 1) / questions.length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      {/* Top Header Row with Timer & Streak */}
      <View style={styles.headerRow}>
        <View style={styles.timerWrap}>
          <Timer size={18} color={timeLeft <= 5 ? colors.coral : colors.muted} />
          <Text style={[styles.timerText, timeLeft <= 5 && styles.timerDanger]}>
            {timeLeft}s
          </Text>
        </View>

        <Animated.View style={[styles.streakWrap, { transform: [{ scale: streakScale }] }]}>
          <Flame size={18} color={colors.coral} />
          <Text style={styles.streakText}>{streak} Streak</Text>
        </Animated.View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: meta.color }]} />
      </View>
      <Text style={styles.progressLabel}>
        Question {currentIndex + 1} of {questions.length}
      </Text>

      {/* Question Card */}
      <Animated.View
        style={[
          styles.questionCard,
          {
            opacity: fadeAnim,
            transform: [{ translateX: shakeAnimation }],
          },
        ]}
      >
        <Text style={styles.questionPrompt}>{currentQuestion.question}</Text>
      </Animated.View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = currentQuestion.answerIndex === index;
          const isWrongSelected = isSelected && !isCorrect;

          let optionStyle: any = styles.optionBtn;
          let textStyle: any = styles.optionText;
          let icon = null;

          if (answered) {
            if (isCorrect) {
              optionStyle = [styles.optionBtn, styles.correctOption];
              textStyle = [styles.optionText, styles.correctText];
              icon = <Check size={18} color={colors.green} />;
            } else if (isWrongSelected) {
              optionStyle = [styles.optionBtn, styles.wrongOption];
              textStyle = [styles.optionText, styles.wrongText];
              icon = <X size={18} color={colors.coral} />;
            } else {
              optionStyle = [styles.optionBtn, styles.dimmedOption];
            }
          } else if (isSelected) {
            optionStyle = [styles.optionBtn, { borderColor: meta.color, borderWidth: 2 }];
          }

          return (
            <Pressable
              key={index}
              disabled={answered}
              style={optionStyle}
              onPress={() => handleAnswerSelect(index)}
            >
              <Text style={textStyle}>{option}</Text>
              {icon}
            </Pressable>
          );
        })}
      </View>

      {/* Feedback Explanation Card */}
      {answered && (
        <View style={styles.explanationCard}>
          <Text style={styles.explanationTitle}>
            {selectedOption === currentQuestion.answerIndex ? '🎉 Correct!' : '💡 Keep Learning'}
          </Text>
          <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>

          <Pressable style={[styles.nextBtn, { backgroundColor: meta.color }]} onPress={handleNext}>
            <Text style={styles.nextBtnText}>
              {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
            </Text>
            <ArrowRight size={18} color="#FFF" />
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  contentContainer: { padding: 20, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
  },
  timerText: {
    color: colors.ink,
    fontWeight: '800',
    fontSize: 14,
  },
  timerDanger: {
    color: colors.coral,
  },
  streakWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF1EE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD5CC',
  },
  streakText: {
    color: colors.coral,
    fontWeight: '800',
    fontSize: 14,
  },
  progressContainer: {
    height: 6,
    backgroundColor: colors.line,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 16,
  },
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 20,
    ...shadow,
  },
  questionPrompt: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 10,
    marginBottom: 20,
  },
  optionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
  },
  optionText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  correctOption: {
    backgroundColor: colors.mint,
    borderColor: colors.green,
  },
  correctText: {
    color: colors.green,
  },
  wrongOption: {
    backgroundColor: '#FDEDEA',
    borderColor: colors.coral,
  },
  wrongText: {
    color: colors.coral,
  },
  dimmedOption: {
    opacity: 0.5,
  },
  explanationCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
  },
  explanationTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
  },
  explanationText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 14,
  },
  nextBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },
  finishedScreen: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  finishedCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
  },
  finishedIcon: {
    marginBottom: 16,
  },
  finishedTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 6,
  },
  finishedSub: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  statNum: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  praiseSection: {
    backgroundColor: '#F6F7F4',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  praiseText: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  finishedButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 14,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
  },
  backBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  backBtnText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
  },
});

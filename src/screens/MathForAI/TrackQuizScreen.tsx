import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QuizSession } from '../../components/Academic/QuizSession';
import { getTrackById } from '../../content/academic';
import { getTrackQuiz } from '../../content/academic/quizzes';
import type { AcademicStackParamList } from '../../navigation/types';
import { useAcademicProgress } from '../../services/AcademicProgressContext';

type Props = NativeStackScreenProps<AcademicStackParamList, 'TrackQuiz'>;

export function TrackQuizScreen({ route, navigation }: Props) {
  const track = getTrackById(route.params.trackId)!;
  const quiz = getTrackQuiz(route.params.trackId)!;
  const { getQuizScore, saveQuizScore } = useAcademicProgress();

  return (
    <QuizSession
      title={quiz.title}
      subtitle={quiz.subtitle}
      questions={quiz.questions}
      accentColor={track.color}
      accentBg={track.accent}
      bestScore={getQuizScore(track.id)}
      onComplete={async score => {
        await saveQuizScore(track.id, score);
        navigation.goBack();
      }}
    />
  );
}

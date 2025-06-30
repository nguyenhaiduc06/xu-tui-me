import { useEffect } from 'react';
import { router } from 'expo-router';
import { useQuizStore } from '~/store/quizStore';

export default function QuizIndex() {
  const { resetQuiz } = useQuizStore();

  useEffect(() => {
    resetQuiz();
    router.replace('/quiz/question/1');
  }, []);

  return null;
}
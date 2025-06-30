import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useQuizStore } from '~/store/quizStore';
import { quizQuestions } from '~/data/quizQuestions';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function QuizQuestion() {
  const { id } = useLocalSearchParams();
  const questionId = parseInt(id as string);
  const { addAnswer, nextQuestion, completeQuiz, answers } = useQuizStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const question = quizQuestions.find(q => q.id === questionId);
  
  const questionOpacity = useSharedValue(0);
  const optionsOpacity = useSharedValue(0);
  const progressOpacity = useSharedValue(0);

  useEffect(() => {
    questionOpacity.value = withSpring(1, { duration: 600 });
    optionsOpacity.value = withDelay(200, withSpring(1, { duration: 600 }));
    progressOpacity.value = withDelay(400, withSpring(1, { duration: 600 }));
  }, [questionId]);

  const questionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: questionOpacity.value,
  }));

  const optionsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: optionsOpacity.value,
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    opacity: progressOpacity.value,
  }));

  if (!question) {
    router.replace('/quiz');
    return null;
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    addAnswer(questionId, answer);
    
    setTimeout(() => {
      if (questionId === 11) {
        completeQuiz();
        router.push('/match-result');
      } else {
        nextQuestion();
        router.push(`/quiz/question/${questionId + 1}`);
      }
    }, 500);
  };

  const progressPercentage = (questionId / 11) * 100;

  return (
    <LinearGradient
      colors={question.gradient}
      style={styles.container}
    >
      <Animated.View style={[styles.progressContainer, progressAnimatedStyle]}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressText}>{questionId}/11</Text>
      </Animated.View>

      <Animated.View style={[styles.questionContainer, questionAnimatedStyle]}>
        <Text style={styles.emoji}>{question.emoji}</Text>
        <Text style={styles.questionText}>{question.question}</Text>
      </Animated.View>

      <Animated.View style={[styles.optionsContainer, optionsAnimatedStyle]}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && styles.selectedOption
            ]}
            onPress={() => handleAnswerSelect(option)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.optionText,
              selectedAnswer === option && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  questionText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: '#FFFFFF',
    transform: [{ scale: 0.98 }],
  },
  optionText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
  },
  selectedOptionText: {
    color: '#333333',
  },
});
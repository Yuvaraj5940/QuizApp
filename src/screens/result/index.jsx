import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../../store/slices/quizSlice';
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme';
import NetInfo from '@react-native-community/netinfo';
import NetworkError from '../network';
import questions from '../../components/quastions/Quations.json';

const ResultScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const score = useSelector(state => state.quiz.score);
  const AnswerArray = useSelector(state => state.quiz.AnswerArray);
  const dispatch = useDispatch();

  const handlePlayAgain = () => {
    dispatch(resetQuiz());
    navigation.navigate('Home');
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {isConnected && !refreshing ? (
        <View style={styles.container}>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Your Score: {score}</Text>
            <TouchableOpacity
              style={styles.playAgainBtn}
              onPress={handlePlayAgain}>
              <Text style={styles.btnText}>Play Again</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {questions.map((question, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.questionText}>
                  {question.questionNum}. {question.text}
                </Text>
                {question.options.map((option, optIndex) => (
                  <Text
                    key={optIndex}
                    style={[
                      styles.optionText,
                      {
                        backgroundColor:
                          option === question.correctAnswer
                            ? COLORS.Green
                            : option === AnswerArray[index]
                            ? COLORS.Coral
                            : COLORS.LightGrey,
                        color:
                          option === question.correctAnswer ||
                          option === AnswerArray[index]
                            ? COLORS.White
                            : COLORS.DarkGrey,
                      },
                    ]}>
                    {option}
                  </Text>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <>
          {!isConnected && !refreshing ? (
            <NetworkError
              navigation={navigation}
              onPress={() => {
                setRefreshing(true);
                setTimeout(() => {
                  setRefreshing(false);
                }, 3000);
              }}
            />
          ) : (
            <View style={styles.indicator}>
              <ActivityIndicator size={40} color={COLORS.Primary} />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LightGrey,
    padding: 20,
  },
  resultBox: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: COLORS.White,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8, // For Android
    shadowColor: COLORS.DarkGrey, // For iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  resultText: {
    fontSize: FONTSIZE.size_24,
    fontWeight: 'bold',
    color: COLORS.Black,
    marginBottom: 20,
    textAlign: 'center',
  },
  playAgainBtn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: COLORS.Lime_green,
    elevation: 5, // For Android
    shadowColor: COLORS.DarkGrey, // For iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    color: COLORS.White,
  },
  scrollView: {
    alignItems: 'center',
  },
  questionContainer: {
    width: '100%',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3, // For Android
    shadowColor: COLORS.DarkGrey, // For iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
  },
  questionText: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: COLORS.Black,
    marginBottom: 10,
  },
  optionText: {
    fontSize: FONTSIZE.size_16,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    textAlign: 'center',
    elevation: 2, // For Android
    shadowColor: COLORS.DarkGrey, // For iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

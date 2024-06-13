import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetQuiz,
  setAnswerAtIndex,
  setCurrentQuestionIndex,
  setScore,
} from '../../store/slices/quizSlice';
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme';
import CustomModal from '../model/CustomModal';
import NetInfo from '@react-native-community/netinfo';
import NetworkError from '../../screens/network';
import Icon from 'react-native-vector-icons/FontAwesome6';


const QuizScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const currentQuestionIndex = useSelector(
    state => state.quiz.currentQuestionIndex,
  );
  const quizArray = useSelector(state => state.quiz.QuizArray);
  const score = useSelector(state => state.quiz.score);
  const [startTime, setStartTime] = useState(Date.now());
  const [modalVisible, setModalVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(20); // countdown timer

  useEffect(() => {
    setStartTime(Date.now());
    setSelectedOption(null); // Reset selected option on new question
  }, [currentQuestionIndex]);

  useEffect(() => {
    const backAction = () => {
      setModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (quizArray?.length > 1) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 20000);

      const interval = setInterval(() => {
        setRemainingTime(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
        setRemainingTime(20);
      };
    }
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizArray?.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    } else {
      dispatch(setAnswerAtIndex({ index: quizArray?.length - 1, option: undefined }));
      navigation.navigate('Result', {
        score,
        TotalScore: quizArray?.length,
      });
    }
  };

  const handleAnswer = (option, index) => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // in seconds
    const maxTime = 50; // seconds
    const question = quizArray[currentQuestionIndex];
    const basePoints = (maxTime - timeTaken) * 20000;
    let points = 0;

    if (option === question.correctAnswer) {
      points = points + 1;
    }

    setSelectedOption(option);
    dispatch(setAnswerAtIndex({ index: currentQuestionIndex, option }));
    dispatch(setScore(score + points));
    setTimeout(handleNextQuestion, 500); // Delay to show the selected option color
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalYes = () => {
    setModalVisible(false);
    dispatch(resetQuiz());
    navigation.goBack();
  };

  const question = quizArray[currentQuestionIndex];

  return (
    <>
      {isConnected && !refreshing ? (
        <>
          {quizArray?.length > 1 ? (
            <View style={styles.container}>
              <View style={styles.questionContainer}>
                <Text style={styles.questionNumber}>
                  {question.questionNum}.{' '}
                </Text>
                <Text style={styles.questionText}>{question.text}</Text>
              </View>
              <View style={{width:'100%',height:20, 
            }}>

              <Text style={styles.timerText}>
               
                <Icon name="stopwatch-20" size={16} color="#F60003" />
               {' '}: {remainingTime}s
              </Text>
              </View>
              <View style={styles.optionsContainer}>
                {question.options.map((option, index) => (
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      selectedOption === option && styles.selectedOptionButton,
                    ]}
                    key={index}
                    onPress={() => handleAnswer(option, index)}>
                    <Text
                      style={[
                        styles.optionText,
                        selectedOption === option && styles.selectedOptionText,
                      ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.errorText}>Go back and select once again</Text>
          )}

          <CustomModal
            visible={modalVisible}
            onClose={handleModalClose}
            onYes={handleModalYes}
            title="Exit Quiz">
            <Text>
              Are you sure you want to exit the quiz? Your progress will be lost.
            </Text>
          </CustomModal>
        </>
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

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_18,
    backgroundColor: '#f7f7f7',
  },
  questionContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.space_12,
    padding: SPACING.space_12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  questionNumber: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    color: COLORS.Primary,
  },
  questionText: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.Black,
    flexWrap: 'wrap',
    flex: 1,
  },
  optionsContainer: {
    gap: SPACING.space_12,
    justifyContent: 'flex-start',
    marginTop: SPACING.space_12,
  },
  optionButton: {
    backgroundColor: '#d3d3d3',
    padding: SPACING.space_12,
    marginVertical: SPACING.space_4,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  selectedOptionButton: {
    backgroundColor: COLORS.Primary,
  },
  optionText: {
    color: '#333',
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
  },
  selectedOptionText: {
    color: '#fff',
  },
  timerText: {
    // fontSize: FONTSIZE.size_16,
    color: COLORS.Red,
    alignSelf: 'center',
    // marginTop: SPACING.space_8,
    // fontWeight: 'bold',
    alignSelf:'flex-end',
    justifyContent:"center",
    flexWrap:'wrap',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.Red,
    textAlign: 'center',
    marginTop: SPACING.space_12,
  },
});

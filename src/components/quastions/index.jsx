import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  resetQuiz,
  setCurrentQuestionIndex,
  setScore,
} from "../../store/slices/quizSlice";
import { COLORS, FONTSIZE, SPACING } from "../../theme/theme";
import CustomModal from "../model/CustomModal";
import questions from "../../components/quastions/Quations.json";
import NetInfo from "@react-native-community/netinfo";
import NetworkError from "../../screens/network";

const QuizScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );
  const score = useSelector((state) => state.quiz.score);

  const [startTime, setStartTime] = useState(Date.now());
  const [modalVisible, setModalVisible] = useState(false);

  // const [lifelineUsed, setLifelineUsed] = useState(false);

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  useEffect(() => {
    const backAction = () => {
      setModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log('Connection type', state.type);
      // console.log('Is connected', state.isConnected);
      setIsConnected(state.isConnected);
      // if(state.isConnected == false){
      //   setLikeList([])
      // }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAnswer = (option) => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // in seconds
    const maxTime = 50; // seconds
    const question = questions[currentQuestionIndex];
    const basePoints = (maxTime - timeTaken) * 5000;
    let points = 0;

    if (option === question.correctAnswer) {
      points = points + 1;
    }

    dispatch(setScore(score + points));

    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    } else {
      navigation.navigate("Result", {
        score: score + points,
        TotalScore: questions?.length,
      });
    }
  };

  // const use5050Lifeline = () => {
  //   setLifelineUsed(true);
  //   // Logic to remove two incorrect options
  // };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalYes = () => {
    setModalVisible(false);
    dispatch(resetQuiz());
    navigation.goBack();
  };

  const question = questions[currentQuestionIndex];

  return (
    <>
      {isConnected == true && refreshing == false ? (
        <View style={style.container}>
          <View style={style.questionsView}>
            <Text style={style.questionsNO}>{question.questionNum}. </Text>
            <Text style={style.questionsTxt}>{question.text}</Text>
          </View>
          <View style={style.optionrak}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                style={style.touchablbtn}
                key={index}
                onPress={() => handleAnswer(option)}
              >
                <Text style={style.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* {!lifelineUsed && (
        <Button title="50/50 Lifeline" onPress={use5050Lifeline} />
      )} */}

          <CustomModal
            visible={modalVisible}
            onClose={handleModalClose}
            onYes={handleModalYes}
            title="Exit Quiz"
          >
            <Text>
              Are you sure you want to exit the quiz? Your progress will be
              lost.
            </Text>
          </CustomModal>
        </View>
      ) : (
        <>
          {isConnected == false && refreshing == false ? (
            <NetworkError
              navigation={navigation}
              onpress={() => {
                setRefreshing(true);
                setTimeout(() => {
                  setRefreshing(false);
                }, 3000);
              }}
            />
          ) : (
            <View style={styles.indicator}>
              <ActivityIndicator size={40} color={"#EA5242"} />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default QuizScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: SPACING.space_18,
    backgroundColor: "#f5f5f5",
  },
  touchablbtn: {
    backgroundColor: "#6200EE",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "95%",
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
  },
  txtbtn1: {
    fontSize: FONTSIZE.size_16,
    fontWeight: "bold",
    color: COLORS.White,
  },
  optionrak: {
    gap: 10,
    justifyContent: "flex-start",
  },
  questionsView: {
    flexDirection: "row",
    // paddingTop:SPACING.space_24,
    marginBottom: SPACING.space_12,
    marginRight: SPACING.space_10,
    // flexWrap:'wrap'
  },
  questionsTxt: {
    fontSize: FONTSIZE.size_16,
    color: "#000",
    flexWrap: "wrap",
  },
  questionsNO: {
    fontSize: FONTSIZE.size_18,
    color: "#000",
  },
});

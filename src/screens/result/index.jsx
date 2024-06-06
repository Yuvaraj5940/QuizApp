import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resetQuiz } from "../../store/slices/quizSlice";
import { COLORS, FONTSIZE } from "../../theme/theme";
import NetInfo from "@react-native-community/netinfo";
import NetworkError from "../network";

const ResultScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const score = useSelector((state) => state.quiz.score);
  const dispatch = useDispatch();

  const handlePlayAgain = () => {
    dispatch(resetQuiz());
    navigation.navigate("Home");
  };
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

  return (
    <>
      {isConnected == true && refreshing == false ? (
        <View style={styles.container}>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Your Score: {score}</Text>
            <TouchableOpacity
              style={styles.touchableBtn}
              onPress={handlePlayAgain}
            >
              <Text style={styles.btnText}>Play Again</Text>
            </TouchableOpacity>
          </View>
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

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.LightGrey,
    padding: 20,
  },
  resultBox: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.White,
    alignItems: "center",
    elevation: 5, // For Android
    shadowColor: "#000", // For iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultText: {
    fontSize: FONTSIZE.size_24,
    fontWeight: "bold",
    color: COLORS.Black,
    marginBottom: 20,
    textAlign: "center",
  },
  touchableBtn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: COLORS.Lime_green,
    elevation: 5, // For Android
    shadowColor: "#000", // For iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: "bold",
    color: COLORS.White,
  },
});

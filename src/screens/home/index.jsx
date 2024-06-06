import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
// import globalStyles from "../../styles/globalStyles";
import { COLORS, FONTSIZE } from "../../theme/theme";
import NetworkError from "../network";
import NetInfo from "@react-native-community/netinfo";
import CustomModal from "../../components/model/CustomModal";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      navigation.canGoBack(false);
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
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalYes = () => {
    setModalVisible(false);
    BackHandler.exitApp()
    // dispatch(resetQuiz());
    // navigation.goBack();
  };
  return (
    <>
      {isConnected == true && refreshing == false ? (
        <View style={[styles.container]}>
          <Text style={[styles.title]}>Welcome to the Quiz Game</Text>
          <TouchableOpacity
            style={styles.touchableBtn}
            onPress={() => navigation.navigate("Quiz")}
          >
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
          <CustomModal
            visible={modalVisible}
            onClose={handleModalClose}
            onYes={handleModalYes}
            title="Exit App"
          >
            <Text>
              Are you sure you want to exit?
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.LightGrey,
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontSize: FONTSIZE.size_24,
    fontWeight: "bold",
    color: COLORS.DarkBlue,
    paddingBottom: 20,
    textAlign: "center",
  },
  touchableBtn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: COLORS.RoyalBlue,
    elevation: 5, // Adds a shadow for Android
    shadowColor: "#000", // Adds a shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: "bold",
    color: COLORS.White,
  },
});

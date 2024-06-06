import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Animated,
  BackHandler,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//   import {addTermsAndConditions} from '../Redux/actions';
import { globalStyles } from "../../styles/globalStyles";
//   import CustomIcon from '../Components/customIcon';
import NetInfo from "@react-native-community/netinfo";
//   import NetworkError from './NetworkError';
//   import {t} from '../Locales/translationGetters';
import { HandleTerms } from "../../store/slices/helper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import NetworkError from "../../screens/network";

const TermsOfConditions = ({ navigation, route }) => {
  const [YValue, setYValue] = useState(0);
  let readable = route?.params?.readable;
  const terms = useSelector((state) => state.Helper.terms);
  // const privacy = useSelector(state => state.privacyPolicy);
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const scrollViewRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(HandleTerms(!terms));
    navigation.goBack();
  };
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
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
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <>
      {isConnected == true && refreshing == false ? (
        <SafeAreaView style={globalStyles.safeArea}>
          <View style={globalStyles.header}>
            <View style={globalStyles.flexHeader}>
              <View style={[globalStyles.backIcon]}>
                <Pressable
                  style={{ marginLeft: 10 }}
                  onPress={() => navigation.goBack()}
                >
                  {/* <CustomIcon
                  name="back"
                  size={22}
                  style={{color: '#080808'}}
                /> */}
                  <Ionicons name="arrow-back" size={22} color="#080808" />
                </Pressable>
                {readable && (
                  <Pressable onPress={() => navigation.navigate("Home")}>
                    {/* <CustomIcon
                    name="home-filled"
                    size={22}
                    style={{color: '#080808'}}
                  /> */}
                    <Ionicons name="home" size={22} color="#080808" />
                  </Pressable>
                )}
              </View>
              <View style={globalStyles.headerTxtWrap}>
                <Text
                  style={globalStyles.headerTxt}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  Terms and Conditions
                </Text>
              </View>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.commnWrap}>
              <View style={styles.titleWrap}>
                <Text style={styles.headerTitle}>Terms and Conditions</Text>
                <Text style={styles.titleDate}>Last updated on 2023.11.30</Text>
              </View>
              <View style={styles.cluaseContainer}>
                <Text style={styles.cluaseTitle}>Clause 1</Text>
                <Text style={styles.cluaseTxt}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat suscipit harum et minus distinctio, animi
                  fuga veniam deserunt, dolore error! Assumenda id, optio
                  corrupti repellendus ipsum obcaecati sunt laudantium.
                </Text>
              </View>
              <View style={styles.cluaseContainer}>
                <Text style={styles.cluaseTitle}>Clause 2</Text>
                <Text style={styles.cluaseTxt}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat suscipit harum et minus distinctio, animi
                  fuga veniam deserunt, dolore error! Assumenda id, optio
                  corrupti repellendus ipsum obcaecati sunt laudantium.
                </Text>
                <Text style={styles.cluaseTxt}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat suscipit harum et minus distinctio, animi
                  fuga veniam deserunt, dolore error! Assumenda id, optio
                  corrupti repellendus ipsum obcaecati sunt laudantium.
                </Text>
              </View>
              <View style={styles.cluaseContainer}>
                <Text style={styles.cluaseTitle}>Clause 3</Text>
                <Text style={styles.cluaseTxt}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat suscipit harum et minus distinctio, animi
                  fuga veniam deserunt, dolore error! Assumenda id, optio
                  corrupti repellendus ipsum obcaecati sunt laudantium.
                </Text>
                <Text style={styles.cluaseTxt}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat suscipit harum et minus distinctio, animi
                  fuga veniam deserunt, dolore error! Assumenda id, optio
                  corrupti repellendus ipsum obcaecati sunt laudantium.
                </Text>
              </View>
              {readable == false ? (
                <View
                  style={{
                    paddingVertical: 30,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pressable
                    onPress={() => handleAccept()}
                    style={{
                      width: "70%",
                      backgroundColor: "#000",
                      height: 45,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Roboto-Regular",
                        fontSize: 18,
                      }}
                    >
                      Agree
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          </ScrollView>
        </SafeAreaView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    position: "relative",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  headerTitleContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#080808",
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    marginBottom: 10,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingLeft: 10,
    gap: 15,
  },
  cluaseContainer: {
    marginBottom: 25,
  },
  cluaseTitle: {
    color: "#080808",
    fontSize: 14,
    fontFamily: "Roboto-Bold",
    marginBottom: 4,
  },
  commnWrap: {
    padding: 30,
  },
  titleWrap: {
    backgroundColor: "#f6f6f6",
    marginHorizontal: -30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: -30,
    marginBottom: 20,
  },
  cluaseTxt: {
    color: "#080808",
    fontSize: 14,
    marginTop: 10,
    fontFamily: "Roboto-Regular",
  },
  titleDate: {
    color: "#666",
    fontSize: 12,
    fontFamily: "Roboto-Regular",
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default TermsOfConditions;

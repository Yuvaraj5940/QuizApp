import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  useColorScheme,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../../../styles/globalStyles";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import CustomIcon from '../Components/customIcon';
// import {addToken, addUserData, checkCodeSend} from '../Redux/actions';
import { BackHandler } from "react-native";
// import Toast from 'react-native-simple-toast';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import {t} from '../Locales/translationGetters';
// import axiosInstance from '../utils/axiosInstance';
// import ErrorModal from '../Components/ErrorModal';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NetworkError from "../../network";
import NetInfo from "@react-native-community/netinfo";
import { checkCodeSend } from "../../../store/slices/helper";

const RegisterTwo = ({ navigation }) => {
  const [focused, setFocused] = useState("");
  const [finishModal, setFinishModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  // const userId = useSelector(state => state.user);
  const userId = "yuvi*******.@gmail.com";
  // const fcmtoken = useSelector(state => state.fcmToken);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      // const res = await axiosInstance.post(`/api/user/register`, {
      //   username: values.username,
      //   password: values.password,
      //   deviceId: 'adkjditjfeajdjjef;a',
      //   fcmToken: fcmtoken,

      // });
      // console.log(res.data?.data);
      // if (res.data.status === 200) {
      //   Toast.show(t('User_Account_Created'), Toast.SHORT);
      //   dispatch(addUserData(res.data.userdata));
      //   EncryptedStorage.setItem('token', JSON.stringify(res.data.token));
      //   dispatch(addToken(res.data.token));
        // navigation.navigate('SignIn');
      //   setFinishModal(true);
      // }
      console.log("done================");
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
    }
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
        "Use 8-24 characters with 3 of the following: upper- and lower-case letters, numbers, special characters. "
      )
      .max(
        24,
        "Use 8-24 characters with 3 of the following: upper- and lower-case letters, numbers, special characters. "
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], `Password doesn't match`),
  });

  useEffect(() => {
    const backAction = () => {
      dispatch(checkCodeSend(false));
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
      console.log("Connection type", state.type);
      console.log("Is connected", state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  return (
    <>
      {isConnected == true && refreshing == false ? (
        <SafeAreaView style={globalStyles.safeArea}>
          <View style={styles.header}>
            <View style={styles.flexHeader}>
              <Pressable
                onPress={() => {
                  dispatch(checkCodeSend(false));
                  navigation.goBack();
                }}
                style={styles.backIcon}
              >
                {/* <Image
                style={styles.backIconImg}
                source={require('../assets/images/btn_back.png')}
              /> */}
              </Pressable>
            </View>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Formik
              initialValues={{
                username: userId,
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  handleSubmit(values);
                  actions.setSubmitting(false);
                });
              }}
              validationSchema={SignupSchema}
            >
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.passwordWrap}>
                  <View style={styles.setPswd}>
                    <Text style={[globalStyles.logoTagline, { paddingTop: 0 }]}>
                      Create Password
                    </Text>
                    <Text style={globalStyles.taglineTxt}>
                      Use 8-24 characters with 3 of the following: letters,
                      numbers, special characters.
                    </Text>
                  </View>

                  <View style={styles.mailTxtCont}>
                    <View style={styles.mailTxtIcon}>
                      {/* <CustomIcon
                      name="id"
                      size={18}
                      style={{color: '#aaaaaa', fontSize: 20}}
                    /> */}
                    <Icon
                          name="card-account-mail"
                          size={20}
                          color={ "#BDBDBD"
                          }
                        />
                    </View>
                    <View>
                      <Text style={styles.mailTxt}>{userId}</Text>
                    </View>
                  </View>
                  <Text style={styles.userIdEmailAccountWillBeUsedAsYourUserIs}>
                    USER ID (Email address will be used as your User ID)
                  </Text>

                  <View style={{ marginBottom: 40 }}>
                    <View
                      style={[
                        styles.passwordBox,
                        {
                          borderColor:
                            focused == "password" ? "#EA5242" : "#d9d9d9",
                          marginBottom: 0,
                        },
                      ]}
                    >
                      <View style={globalStyles.iconBox}>
                        {/* <CustomIcon
                        name="password-l"
                        size={18}
                        style={{
                          color:
                            focused == 'password' || values.password
                              ? '#EA5242'
                              : '#BDBDBD',
                        }}
                      /> */}
                      <MaterialIcons
                          name="password"
                          size={20}
                          color={ "#BDBDBD"
                          }
                        />
                      </View>
                      <TextInput
                        onFocus={() => setFocused("password")}
                        secureTextEntry
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholderTextColor="#BDBDBD"
                        style={[
                          globalStyles.inputGroup,
                          isDarkTheme ? { color: "#080808" } : null,
                        ]}
                        placeholder="Password"
                      />
                      {values.password && (
                        <Pressable
                          onPress={handleChange("password", "")}
                          style={globalStyles.clearFeild}
                        >
                          {/* <CustomIcon
                          name="close-fill"
                          size={14}
                          style={{color: '#bdbdbd'}}
                        /> */}
                        <Icon
                          name="close-circle"
                          size={20}
                          color={ "#BDBDBD"
                          }
                        />
                        </Pressable>
                      )}
                    </View>
                    <View
                      style={[styles.verificationWrap, { marginBottom: 0 }]}
                    >
                      {errors.password && touched.password && (
                        <Text
                          style={[
                            globalStyles.errorTxt,
                            { width: "80%", marginLeft: 5, marginBottom: 0 },
                          ]}
                        >
                          {errors.password}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={{ marginBottom: 50 }}>
                    <View
                      style={[
                        styles.passwordBox,
                        {
                          borderColor:
                            focused == "confirmPassword"
                              ? "#EA5242"
                              : "#d9d9d9",
                          marginBottom: 0,
                        },
                      ]}
                    >
                      <View style={globalStyles.iconBox}>
                        {/* <CustomIcon
                        name="password-l"
                        size={18}
                        style={{
                          color:
                            focused == 'confirmPassword' || values.confirmPassword
                              ? '#EA5242'
                              : '#BDBDBD',
                        }}
                      /> */}
                      <MaterialIcons
                          name="password"
                          size={20}
                          color={ "#BDBDBD"
                          }
                        />
                      </View>
                      <TextInput
                        onFocus={() => setFocused("confirmPassword")}
                        secureTextEntry
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                        placeholderTextColor="#BDBDBD"
                        style={[
                          globalStyles.inputGroup,
                          isDarkTheme ? { color: "#080808" } : null,
                        ]}
                        placeholder={"Confirm password"}
                      />
                      {values.confirmPassword && (
                        <Pressable
                          onPress={handleChange("confirmPassword", "")}
                          style={globalStyles.clearFeild}
                        >
                          {/* <CustomIcon
                          name="close-fill"
                          size={14}
                          style={{color: '#bdbdbd'}}
                        /> */}
                        <Icon
                          name="close-circle"
                          size={20}
                          color={ "#BDBDBD"
                          }
                        />
                        </Pressable>
                      )}
                    </View>
                    <View
                      style={[styles.verificationWrap, { marginBottom: 0 }]}
                    >
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text
                          style={[
                            globalStyles.errorTxt,
                            { marginLeft: 5, marginBottom: 0 },
                          ]}
                        >
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View>
                    <Pressable
                      style={({ pressed }) => [
                        globalStyles.lightBgBtn,
                        {
                          backgroundColor:
                            values.password &&
                            values.confirmPassword &&
                            !isSubmitting
                              ? "#EA5242"
                              : "#D9D9D9",

                          opacity: pressed ? 0.6 : 1,
                        },
                      ]}
                      onPress={handleSubmit}
                      disabled={
                        !values.password ||
                        !values.confirmPassword ||
                        isSubmitting
                      }
                    >
                      <Text
                        style={[
                          globalStyles.lightBgBtnTxt,
                          {
                            color:
                              values.password &&
                              values.confirmPassword &&
                              !isSubmitting
                                ? "#fff"
                                : "#A0A0A0",
                          },
                        ]}
                      >
                        Create account
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
          <Modal
            animationType="fade"
            transparent={true}
            visible={finishModal}
            onRequestClose={() => {
              setFinishModal(false);
            }}
          >
            <View style={globalStyles.centeredView}>
              <View style={globalStyles.modalView}>
                <Text style={globalStyles.modalSingleTxt}>
                  Account created! Go to the sign in page.
                </Text>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    setFinishModal(false);
                    // navigation.navigate('SignIn');
                  }}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
  logoWrap: {
    marginHorizontal: 20,
    marginVertical: 50,
    display: "flex",
    alignItems: "center",
  },
  header: {
    borderBottomColor: "#e3e2e2",
    borderBottomWidth: 1,
  },
  flexHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  backIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  backIconImg: {
    width: 26,
    height: 26,
  },
  headerTxtWrap: {
    flex: 1,
    paddingHorizontal: 60,
  },
  headerTxt: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
  tncWrap: {
    marginTop: 10,
    marginBottom: 36,
  },
  verificationWrap: {
    marginBottom: 20,
  },
  verificationMsg: {
    color: "#000",
    fontSize: 12,
    fontFamily: "Roboto-Regular",
  },
  tncCont: {
    color: "#000",
    fontSize: 12,
    fontFamily: "Roboto-Regular",
  },
  passwordWrap: {
    margin: 20,
  },
  mailTxtCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 6,
  },
  mailTxtIcon: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mailTxt: {
    color: "#AAAAAA",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  passwordBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    paddingHorizontal: 5,
  },
  createBt: {
    marginTop: 20,
  },
  setPswd: {
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 36,
  },
  setTxt: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
    color: "#080808",
  },
  accTxt: {
    width: "80%",
    height: 54,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    textAlign: "center",
    color: "#888989",
    marginVertical: 8,
  },
  userIdEmailAccountWillBeUsedAsYourUserIs: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    textAlign: "left",
    color: "#080808",
    marginBottom: 40,
    marginLeft: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    width: "90%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#EA5242",
    padding: 10,
    color: "#fff",
    fontSize: 16,
    borderRadius: 70,
    width: "80%",
    alignSelf: "center",
    fontFamily: "Roboto-Bold",
  },
  textStyle: {
    color: "white",
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
});
export default RegisterTwo;

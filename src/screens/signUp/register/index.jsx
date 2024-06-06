import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  BackHandler,
  useColorScheme,
  ActivityIndicator,
} from "react-native";

import React, { useState, useRef, useEffect } from "react";
import { globalStyles } from "../../../styles/globalStyles";
import CheckBox from "../../../components/checkbox";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

//   import {DOMANIN_NAME, COMPANY_DOMAIN_NAME} from '@env';
//   import CustomIcon from '../../../components/customIcon';
import Toast from "react-native-simple-toast";
//   import {t} from '../Locales/translationGetters';
//   import axiosInstance from '../utils/axiosInstance';
import NetInfo from "@react-native-community/netinfo";
import { HandleTerms, checkCodeSend, setPrivacy } from "../../../store/slices/helper";
//   import NetworkError from './NetworkError';
//   import NetworkPage from './NetworkPage';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NetworkError from "../../network";

const Register = ({ navigation }) => {
  const [auth, setAuth] = useState(false);
  const [focused, setFocused] = useState("");
  const [userId, setUserId] = useState("yuvi****.@gmail.com");
  const [backendErrors, setBackendErrors] = useState({});
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const counterRef = useRef(false);

  // console.log('===============',term)
  const terms = useSelector((state) => state.Helper.terms);
  const privacy = useSelector((state) => state.Helper.privacy);
  const isCodeSend = useSelector(state => state.Helper.isCodeSend);
// console.log(terms,privacy,isCodeSend)
  const formateTime = (time) => {
    const minutes = Math.floor(time / 60);

    const seconds = time % 60;

    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

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

  useEffect(() => {
    const backAction = () => {
      // navigation.navigate('UserMain');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const handleVerification = async (values) => {
    try {
      setAuth(false);
      setFocused("");
      console.log("verified==========");

      dispatch(checkCodeSend(true));
        //  Toast.show(t('Verification_Code_Sent'), Toast.SHORT);
      //   dispatch(addUserId(values));
        counterRef.current = true;
        setBackendErrors(errors => ({...errors, username: ''}));
        setUserId('jb');
        let ti = 0;
        setTimer(300);
        const interval = setInterval(function () {
          if (ti < 300 && counterRef.current) {
            setTimer(e => e - 1);
            ti += 1;
          } else {
            clearInterval(interval);
          }
        }, 1000);
        return () => clearInterval(interval);
      // const res = await axiosInstance.post(`/api/user/checkRegister`, {
      //   username: values.trim(),
      //   isTermAccepted: '1',
      //   isPolicyAccepted: '1',
      // });
      // if (res.data.status === 200) {
      //   Toast.show(t('Verification_Code_Sent'), Toast.SHORT);
      // //   dispatch(addUserId(values));
      //   counterRef.current = true;
      //   setBackendErrors(errors => ({...errors, username: ''}));
      // //   dispatch(checkCodeSend(true));
      //   setUserId(res.data.data[0].id);
      //   let ti = 0;
      //   setTimer(300);
      //   const interval = setInterval(function () {
      //     if (ti < 300 && counterRef.current) {
      //       setTimer(e => e - 1);
      //       ti += 1;
      //     } else {
      //       clearInterval(interval);
      //     }
      //   }, 1000);
      //   return () => clearInterval(interval);
      // } else if (res.data.status === 401) {
      //   setBackendErrors(errors => ({
      //     ...errors,
      //     otpBlock: res.data.msg,
      //   }));
      // } else if (res.data.status == 400) {
      //   setBackendErrors(errors => ({
      //     ...errors,
      //     username: res.data.errors[0].msg,
      //   }));
      // }
    } catch (error) {}
  };
  const Authenticate = async (code) => {
    try {
      console.log("done===============");
      setAuth(true);
      navigation.navigate('RegisterTwo');
        counterRef.current = false;
        setTimer(0);
      // const res = await axiosInstance.post(`/api/user/otpVerify`, {
      //   userId: `${userId}`,
      //   otp: code,
      // });
      // if (res.data.status === 200) {
      //   Toast.show(t('Verification_Code_Authenticated'), Toast.SHORT);
      //   setFocused('');
      //   setAuth(true);
      //   setBackendErrors(errors => ({...errors, verificationCode: ''}));
      //   navigation.navigate('RegisterTwo');
      //   counterRef.current = false;
      //   setTimer(0);
      // }
      // if (res.data.status === 400) {
      //   setBackendErrors(errors => ({
      //     ...errors,
      //     verificationCode: res.data.msg,
      //   }));
      // }
    } catch (error) {}
  };
  const userNameYupSchema = Yup.object().shape({
    username: Yup.string()
      .required("Enter your email address")
      .email("Enter valid company email address"),
  });
  const userNameSchema = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Enter your email address";
    } else if (
      values.username &&
      // values.username.trim().toLowerCase().endsWith(COMPANY_DOMAIN_NAME) ==
      //   false &&
      // values.username.trim().toLowerCase().endsWith(DOMANIN_NAME) == false &&
      values.username.trim().endsWith("@hbsmith.io") == false &&
      values.username.trim().toLowerCase().endsWith("@gmail.com") == false
    ) {
      errors.username = "Enter valid company email address";
    }

    return errors;
  };
  const verificationCodeSchema = Yup.object().shape({
    verificationCode: Yup.string()
      .required("Required")
      .min(4, "Incorrect verification code")
      .matches(/^[0-9]{4}$/, "Required"),
  });

  return (
    <>
      {isConnected == true && refreshing == false ? (
        <SafeAreaView style={globalStyles.safeArea}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.logoWrap}>
              {/* <Image source={require('../assets/images/PTK-logo.png')} /> */}
              <Text style={globalStyles.logoTagline}>Create account</Text>
              <Text style={styles.enterYourEmailAccountAndSendVerificationCode}>
                Enter your email address and get a verification code
              </Text>
            </View>
            <View style={globalStyles.formBox}>
              {/* Username, terms and privacy section */}
              <Formik
                initialValues={{
                  username: "",
                }}
                validationSchema={userNameYupSchema}
                validate={(values) => userNameSchema(values)}
                onSubmit={(value, actions) => {
                  setTimeout(() => {
                    handleVerification(value.username);
                    actions.setSubmitting(false);
                  }, 300);
                }}
              >
                {({
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                  isSubmitting,
                }) => (
                  <>
                    <View
                      style={[
                        globalStyles.inputBox,
                        {
                          borderColor:
                            focused == "username" ? "#EA5242" : "#d9d9d9",
                        },
                      ]}
                    >
                      <View style={globalStyles.iconBox}>
                        {/* <CustomIcon
                        name="id"
                        size={20}
                        style={{
                          color:
                            focused || auth == 'username'
                              ? '#EA5242'
                              : '#BDBDBD',
                          fontSize: 20,
                        }}
                      /> */}
                        <Icon
                          name="card-account-mail"
                          size={20}
                          color={
                            focused || auth == "username"
                              ? "#EA5242"
                              : "#BDBDBD"
                          }
                        />
                      </View>

                      <TextInput
                        editable={!isCodeSend}
                        onFocus={() => setFocused("username")}
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        value={values.username}
                        placeholderTextColor="#BDBDBD"
                        style={[
                          globalStyles.inputGroup,

                          isDarkTheme ? { color: "#080808" } : null,
                        ]}
                        placeholder={"Email address"}
                      />
                      {values.username && (
                        <Pressable
                          disabled={isCodeSend}
                          onPress={handleChange("username", "")}
                          style={globalStyles.clearFeild}
                        >
                          {/* <CustomIcon
                          name="close-fill"
                          size={18}
                          style={{color: '#bdbdbd'}}
                        /> */}
                          <Icon name="close-circle" size={20} color="#BDBDBD" />
                        </Pressable>
                      )}
                    </View>
                    <View>
                      {errors.username && touched.username && (
                        <Text style={globalStyles.errorTxt}>
                          {errors.username}
                        </Text>
                      )}
                      {backendErrors.username && !errors.username && (
                        <Text style={globalStyles.errorTxt}>
                          {backendErrors.username}
                        </Text>
                      )}
                    </View>
                    <View style={styles.tncWrap}>
                      <Pressable
                        disabled={isCodeSend}
                        onPress={() => {
                          if (terms) {
                            dispatch(HandleTerms(!terms));
                          } else {
                            navigation.navigate("TermsAndConditions", {
                              readable: false,
                            });
                          }
                        }}
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                          marginLeft: 5,
                        }}
                      >
                        <CheckBox value={terms} />
                        <Text
                          style={{
                            color: "#080808",
                            fontSize: 14,
                            fontFamily: "Roboto-Regular",
                          }}
                        >
                          Terms & Conditions
                          <Text
                            style={[globalStyles.primaryTxt, { fontSize: 14 }]}
                          >
                            Required
                          </Text>
                        </Text>
                      </Pressable>
                      <Pressable
                        disabled={isCodeSend}
                        onPress={() => {
                          if (privacy) {
                            dispatch(setPrivacy(!privacy));
                          } else {
                            navigation.navigate("PrivacyPolicy", {
                              readable: false,
                            });
                          }
                        }}
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                          marginLeft: 5,
                        }}
                      >
                        <CheckBox value={privacy} />
                        <Text
                          style={{
                            color: "#080808",
                            fontSize: 14,
                            fontFamily: "Roboto-Regular",
                          }}
                        >
                          Privacy Policy
                          <Text
                            style={[globalStyles.primaryTxt, { fontSize: 14 }]}
                          >
                            Required
                          </Text>
                        </Text>
                      </Pressable>
                    </View>
                    <View style={styles.btnWrap}>
                      {!isCodeSend && (
                        <Pressable
                          onPress={handleSubmit}
                          style={({ pressed }) => [
                            globalStyles.lightBgBtn,
                            {
                              opacity: pressed ? 0.5 : 1,
                              backgroundColor:
                                values.username &&
                                !isSubmitting &&
                                terms &&
                                privacy
                                  ? "#EA5242"
                                  : "#D9D9D9",
                              marginBottom: backendErrors.otpBlock ? 10 : 20,
                            },
                          ]}
                          disabled={
                            !values.username ||
                            !terms ||
                            !privacy ||
                            isSubmitting
                          }
                        >
                          <Text
                            style={[
                              globalStyles.lightBgBtnTxt,
                              {
                                color:
                                  values.username &&
                                  !isSubmitting &&
                                  terms &&
                                  privacy
                                    ? "#fff"
                                    : "#A0A0A0",
                              },
                            ]}
                          >
                            Send verification code
                          </Text>
                        </Pressable>
                      )}

                      {isCodeSend && (
                        <Pressable
                          style={({ pressed }) => [
                            globalStyles.blackBtn,

                            {
                              opacity: pressed ? 0.6 : 1,

                              backgroundColor:
                                timer <= 210 && values.username && !isSubmitting
                                  ? "#000"
                                  : "#D9D9D9",
                              marginBottom: backendErrors.otpBlock ? 10 : 20,
                            },
                          ]}
                          disabled={timer >= 210 || isSubmitting}
                          onPress={() => {
                            counterRef.current = false;
                            handleVerification(values.username);
                          }}
                        >
                          {/* <CustomIcon
                          name="again"
                          size={14}
                          color="#fff"
                          style={{
                            color:
                              timer <= 210 && !isSubmitting
                                ? '#fff'
                                : '#A0A0A0',
                            marginRight: 9,
                          }}
                        /> */}
                          <MaterialIcons
                            name="loop"
                            size={14}
                            color={
                              timer <= 210 && !isSubmitting ? "#fff" : "#A0A0A0"
                            }
                          />
                          <Text
                            style={[
                              globalStyles.blackBtnTxt,
                              {
                                color:
                                  timer <= 210 && !isSubmitting
                                    ? "#fff"
                                    : "#A0A0A0",
                              },
                            ]}
                          >
                            Send verification code again
                          </Text>
                        </Pressable>
                      )}
                      {backendErrors?.otpBlock ? (
                        <Text
                          style={[
                            globalStyles.errorTxt,
                            { marginTop: 0, marginBottom: 20 },
                          ]}
                        >
                          {backendErrors?.otpBlock}
                        </Text>
                      ) : null}
                    </View>
                  </>
                )}
              </Formik>
              {/* Verification code section */}
              {isCodeSend && (
                <Formik
                  initialValues={{
                    verificationCode: "",
                  }}
                  validationSchema={verificationCodeSchema}
                  onSubmit={(values, actions) => {
                    setTimeout(() => {
                      Authenticate(values.verificationCode);
                      actions.setSubmitting(false);
                    }, 300);
                  }}
                >
                  {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    values,
                    touched,
                    errors,
                  }) => (
                    <>
                      <View
                        style={[
                          globalStyles.inputBox,
                          {
                            paddingRight: 10,
                            borderColor:
                              focused == "verificationCode"
                                ? "#EA5242"
                                : "#d9d9d9",
                          },
                        ]}
                      >
                        <View style={[globalStyles.iconBox]}>
                          {/* <Image
                      style={globalStyles.formInptImg}
                      source={require('../assets/images/verification_cord.png')}
                    /> */}
                          {/* <CustomIcon
                          name="verification"
                          size={20}
                          style={{color: '#080808'}}
                        /> */}
                          <MaterialIcons
                            name="verified"
                            size={20}
                            color={"#080808"}
                          />
                        </View>

                        <TextInput
                          onFocus={() => setFocused("verificationCode")}
                          onChangeText={handleChange("verificationCode")}
                          onBlur={handleBlur("verificationCode")}
                          value={values.verificationCode}
                          placeholderTextColor="#BDBDBD"
                          style={[
                            globalStyles.inputGroup,
                            isDarkTheme ? { color: "#080808" } : null,
                          ]}
                          maxLength={4}
                          keyboardType="number-pad"
                          placeholder={"Verification code"}
                        />

                        {timer > 0 && (
                          <Text style={styles.codeTimer}>
                            {formateTime(timer)}
                          </Text>
                        )}
                      </View>

                      <View style={styles.verificationWrap}>
                        {backendErrors.verificationCode &&
                          touched.verificationCode && (
                            <Text
                              style={[globalStyles.errorTxt, { marginTop: 0 }]}
                            >
                              {backendErrors.verificationCode}
                            </Text>
                          )}
                        {errors.verificationCode &&
                          !backendErrors.verificationCode &&
                          touched.verificationCode && (
                            <Text
                              style={[globalStyles.errorTxt, { marginTop: 0 }]}
                            >
                              {errors.verificationCode}
                            </Text>
                          )}
                      </View>

                      <View style={{ marginTop: 10 }}>
                        <Pressable
                          style={({ pressed }) => [
                            globalStyles.primaryBtn,

                            {
                              backgroundColor:
                                !auth &&
                                values.verificationCode &&
                                !isSubmitting
                                  ? "#EA5242"
                                  : "#D9D9D9",
                              opacity: pressed ? 0.5 : 1,
                            },
                          ]}
                          onPress={handleSubmit}
                          disabled={
                            auth || !values.verificationCode || isSubmitting
                          }
                        >
                          <Text
                            style={[
                              globalStyles.primaryBtnTxt,
                              {
                                color:
                                  values.verificationCode && !isSubmitting
                                    ? "#fff"
                                    : "#A0A0A0",
                              },
                            ]}
                          >
                            Verify
                          </Text>
                        </Pressable>
                      </View>
                    </>
                  )}
                </Formik>
              )}
              <Pressable
                style={{ width: "20%", alignSelf: "center" }}
                onPress={() => navigation.navigate("SignIn")}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      globalStyles.createAcTxt,
                      { opacity: pressed ? 0.5 : 1, marginTop: 0 },
                    ]}
                  >
                    Sign in
                  </Text>
                )}
              </Pressable>
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
  logoWrap: {
    marginHorizontal: 20,
    marginVertical: 50,
    display: "flex",
    alignItems: "center",
  },

  tncWrap: {
    marginTop: 13,
    marginBottom: 26,
    gap: 10,
    width: "90%",
  },

  verificationWrap: {
    marginTop: 5,
    marginBottom: 30,
  },

  verificationMsg: {
    color: "#000",
    fontSize: 12,
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
    marginBottom: 40,
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
  },

  createBt: {
    marginTop: 20,
  },

  codeTimer: {
    color: "#aaaaaa",
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    marginRight: 10,
  },
  enterYourEmailAccountAndSendVerificationCode: {
    maxWidth: "70%",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#888989",
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default Register;

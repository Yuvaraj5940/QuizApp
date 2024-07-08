import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  useColorScheme,
  Modal,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { globalStyles } from "../../styles/globalStyles";
import * as Yup from "yup";
import { Formik } from "formik";
//   import {DOMANIN_NAME, COMPANY_DOMAIN_NAME} from '@env';
//   import EncryptedStorage from 'react-native-encrypted-storage';
import CheckBox from "../../components/checkbox";
//   import CustomIcon from '../../components/customIcon';
import { useDispatch, useSelector } from "react-redux";
//   import {
//     AddPrivacyPolicy,
//     addTermsAndConditions,
//     addToken,
//     addUserData,
//     checkCodeSend,
//   } from '../Redux/actions';
//   import {CommonActions, useFocusEffect} from '@react-navigation/native';
import Toast from "react-native-simple-toast";
//   import {t} from '../Locales/translationGetters';
//   import axiosInstance from '../utils/axiosInstance';
import NetInfo from "@react-native-community/netinfo";

import ErrorModal from "../../components/errorModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NetworkError from "../network";
//   import crashlytics from '@react-native-firebase/crashlytics';

const SignIn = ({ navigation }) => {
  const [focused, setFocused] = useState("");
  const [error, setError] = useState("Error in Sign in");
  const [remember, setRemember] = useState(false);
  const [signedin, setSignedin] = useState(false);
  const [localusername, setLocalUserName] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showError, setShowError] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [pswdExpModal, setPswdExpModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // const fcmtoken = useSelector(state => state.fcmToken);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchUserName();
  //   }, []),
  // );

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
    // console.log('refreshing', refreshing, isConnected);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }, [refreshing]);

  // const fetchUserName = async () => {
  //   let user = await EncryptedStorage.getItem('localUserName');
  //   setLocalUserName(JSON.parse(user));
  //   user !== null ? setRemember(true) : null;
  // };

  const dispatch = useDispatch();
  //react-native-encrypted-storage
  // async function storeUserSession(values) {
  //   try {
  //     await EncryptedStorage.setItem('user_session', JSON.stringify(values));
  //   } catch (error) {}
  // }

  // const resetAction = CommonActions.reset({
  //   index: 0, // The index of the screen you want to reset to (typically, the first screen)
  //   routes: [
  //     {name: 'BottomTabNavigation'}, // Replace 'ScreenName' with the name of the screen you want to reset to
  //   ],
  // });
  // const resetStack = CommonActions.reset({
  //   index: 0, // The index of the screen you want to reset to (typically, the first screen)
  //   routes: [
  //     {name: 'OnBoard'}, // Replace 'ScreenName' with the name of the screen you want to reset to
  //   ],
  // });

  // const ChangePasswordCheck = async () => {
  //   token = await EncryptedStorage.getItem('user_session');
  //   const onBoard = await EncryptedStorage.getItem('PtkOnboardStatus');
  //   axiosInstance({
  //     method: 'GET',
  //     url: `api/getAppConfigAuth`,
  //   }).then(async res => {
  //     if (res.data.status == 201) {
  //       await EncryptedStorage.setItem(
  //         'ptkConfig',
  //         JSON.stringify(res.data.data),
  //       );
  //       if (res.data.data.auth.showUpdatePasswordPopup == 1) {
  //         setEmailCheck(true);
  //       } else {
  //         Toast.show(`${t('Signed_Successfully')}`, Toast.SHORT);
  //         if (onBoard) {
  //           navigation.dispatch(resetAction);
  //         } else {
  //           navigation.dispatch(resetStack);
  //         }
  //       }
  //     } else {
  //       console.log('error', res.data);
  //     }
  //   });
  // };

  const handlepswdExpModal = () => {
    setPswdExpModal(!pswdExpModal);
    Toast.show("Signed_Successfully", Toast.SHORT);
    //   navigation.navigate('BottomTabNavigation');
  };

  const handleChngPswd = async () => {
    //   navigation.navigate('ChangeExpiryPassword');
    setPswdExpModal(false);
  };

  const handleSubmit = async (values, actions) => {
    if(values.username.trim().endsWith('@hbsmith.io') == false &&
      values.username.trim().toLowerCase().endsWith('@gmail.com') == false){
        setLoading(false);
        // setError(`Incorrect email or password.
        // Go back and try again`)
        setEmailCheck(true); 
      }else{
        setLoading(false)
        navigation.navigate('Home')
      }

    // if (
    //   values.username &&
    //   // values.username.trim().toLowerCase().endsWith(COMPANY_DOMAIN_NAME) ==
    //   //   false &&
    //   // values.username.trim().toLowerCase().endsWith(DOMANIN_NAME) == false &&
    //   values.username.trim().endsWith('@hbsmith.io') == false &&
    //   values.username.trim().toLowerCase().endsWith('@gmail.com') == false
    // ) {
    //   setLoading(false);
    //   // setError(`Incorrect email or password.
    //   // Go back and try again`)
    //   setEmailCheck(true);
    // } else {
    //   try {
    //     let staySigned = signedin ? 1 : 0;
    //     const res = await axiosInstance.post(`/api/user/login`, {
    //       username: values.username.trim(),
    //       password: values.password.trim(),
    //       staysignedin: staySigned,
    //       deviceId: 'null',
    //       fcmToken: fcmtoken,
    //     });
    //     setLoading(false);
    //     if (res.data.status === 200) {
    //       crashlytics().setUserId(res.data.userdata.id.toString()),
    //         crashlytics().setAttributes({
    //           id: res.data.userdata.id.toString(),
    //           name: res.data.userdata.englishName,
    //           email: res.data.userdata.email,
    //           employeeCode: res.data.userdata.employeeCode,
    //           knoxId: res.data.userdata.knoxId,
    //         });
    //       await EncryptedStorage.setItem(
    //         'UserID',
    //         JSON.stringify(res.data.userdata.id),
    //       );
    //       dispatch(addUserData(res.data.userdata));
    //       await EncryptedStorage.setItem(
    //         'userData',
    //         JSON.stringify(res.data.userdata),
    //       );
    //       if (remember == true) {
    //         await EncryptedStorage.setItem(
    //           'localUserName',
    //           JSON.stringify(values.username),
    //         );
    //       } else if (remember == false) {
    //         await EncryptedStorage.removeItem('localUserName');
    //       }
    //       if (signedin == true) {
    //         storeUserSession(res.data.token);
    //       }
    //       await EncryptedStorage.setItem(
    //         'token',
    //         JSON.stringify(res.data.token),
    //       );
    //       dispatch(addToken(res.data.token));
    //       // ChangePasswordCheck();
    //       setFocused('');
    //       actions.resetForm();
    //       setSignedin(false);
    //       setShowError(false);
    //     }
    //     if (res.data.status === 403) {
    //       setEmailCheck(true);
    //     }
    //     if (res.data.status === 400) {
    //       setEmailCheck(true);
    //     }
    //   } catch (error) {
    //     setLoading(false);
    //     console.log(error);
    //   }
    // }
  };

  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  return (
    <>
    {isConnected == true && refreshing == false ? (
    <>
      {pswdExpModal ? (
        <View style={globalStyles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={pswdExpModal}
          >
            <View style={globalStyles.centeredView}>
              <View style={globalStyles.modalView}>
                <Text style={globalStyles.modalText}>
                  Change the password to protect your personal data
                </Text>
                <Text
                  style={[
                    globalStyles.textStyle,
                    { color: "#000000", marginBottom: 15 },
                  ]}
                >
                  You haven't changed your password in the last 6 months (180
                  days).
                </Text>

                <Pressable
                  style={[
                    styles.button,
                    { backgroundColor: "#EA5242", flex: 0 },
                  ]}
                  onPress={handleChngPswd}
                >
                  <Text style={styles.textStyle}>{Change_Password}</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    { backgroundColor: "#808080", flex: 0 },
                  ]}
                  onPress={handlepswdExpModal}
                >
                  <Text style={styles.textStyle}>Change later</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <SafeAreaView style={[globalStyles.safeArea]}>
          <View style={styles.flexarea}>
            <View style={styles.logoWrap}>
              {/* <Image source={require('../assets/images/PTK-logo.png')} /> */}
            </View>
            <Formik
              enableReinitialize
              initialValues={{
                username: localusername !== "" ? localusername : "",
                password: "",
              }}
              // validate={values => ValidationSchema(values)}
              // validationSchema={userNameYupSchema}
              onSubmit={(values, actions) => {
                setLoading(true);
                setTimeout(() => {
                  handleSubmit(values, actions);
                  actions.setSubmitting(false);
                }, 300);
              }}
            >
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
                touched,
                values,
                isSubmitting,
                errors,
              }) => (
                <View>
                  <View style={globalStyles.formBox}>
                    <View style={styles.inputBoxWrap}>
                      <View
                        style={[
                          styles.emailBox,
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
                                  focused == 'username'
                                    ? '#EA5242'
                                    : '#bdbdbd',
                                fontSize: 18,
                              }}
                            /> */}
                          <Icon
                            name="card-account-mail"
                            size={20}
                            color={"#BDBDBD"}
                          />
                        </View>
                        <TextInput
                          style={[
                            globalStyles.inputGroup,
                            isDarkTheme ? { color: "#080808" } : null,
                          ]}
                          onFocus={() => setFocused("username")}
                          placeholder={"Email address"}
                          value={values.username}
                          onChangeText={handleChange("username")}
                          onBlur={handleBlur("username")}
                          placeholderTextColor={"#BDBDBD"}
                          keyboardType="email-address"
                        />

                        {values.username && (
                          <Pressable
                            style={globalStyles.clearFeild}
                            onPress={handleChange("username", "")}
                          >
                            {/* <CustomIcon
                                name="close-fill"
                                size={16}
                                style={{color: '#bdbdbd'}}
                              /> */}
                            <Icon
                              name="close-circle"
                              size={20}
                              color={"#BDBDBD"}
                            />
                          </Pressable>
                        )}
                      </View>
                      {/* {errors.username && touched.username && (
                      <Text style={globalStyles.errorTxt}>
                        {errors.username}
                      </Text>
                    )} */}
                      <View
                        style={[
                          styles.passwordBox,
                          {
                            borderColor:
                              focused == "password" ? "#EA5242" : "#d9d9d9",
                          },
                        ]}
                      >
                        <View style={globalStyles.iconBox}>
                          {/* <CustomIcon
                              name="password-l"
                              size={20}
                              style={{
                                color:
                                  focused == 'password'
                                    ? '#EA5242'
                                    : '#bdbdbd',
                                fontSize: 18,
                              }}
                            /> */}
                          <MaterialIcons
                            name="password"
                            size={20}
                            color={"#BDBDBD"}
                          />
                        </View>

                        <TextInput
                          style={[
                            globalStyles.inputGroup,
                            isDarkTheme ? { color: "#080808" } : null,
                          ]}
                          onFocus={() => setFocused("password")}
                          placeholder={"Password"}
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          secureTextEntry={true}
                          placeholderTextColor={"#BDBDBD"}
                        />

                        {values.password && (
                          <Pressable
                            style={globalStyles.clearFeild}
                            onPress={handleChange("password", "")}
                          >
                            {/* <CustomIcon
                                name="close-fill"
                                size={16}
                                style={{color: '#bdbdbd'}}
                              /> */}
                            <Icon
                              name="close-circle"
                              size={20}
                              color={"#BDBDBD"}
                            />
                          </Pressable>
                        )}
                      </View>
                    </View>
                    <ErrorModal
                      error={error}
                      modalVisible={emailCheck}
                      setModalVisible={setEmailCheck}
                    />

                    <View style={styles.remFrgtPsd}>
                      <View style={styles.remId}>
                        <Pressable
                          style={styles.checkboxes}
                          onPress={() => setRemember(!remember)}
                        >
                          <CheckBox value={remember} />
                          <Text style={[styles.remtxt]}>Remember ID</Text>
                        </Pressable>
                        <Pressable
                          style={styles.checkboxes}
                          onPress={() => setSignedin(!signedin)}
                        >
                          <CheckBox value={signedin} />

                          <Text style={[styles.remtxt]}>Auto sign-in</Text>
                        </Pressable>
                      </View>

                      <Pressable style={styles.frgtPsd}>
                        <Text
                          style={styles.frgtTxt}
                          onPress={() => {
                            resetForm();
                            setShowError(false);
                            setFocused("");
                            //   navigation.navigate('Password');
                          }}
                        >
                          Forgot password?
                        </Text>
                      </Pressable>
                    </View>
                  </View>

                  <View style={globalStyles.btnWrap}>
                    <Pressable
                      onPress={
                        handleSubmit
                      }
                      disabled={
                        !values.username || !values.password || isSubmitting
                      }
                      style={({ pressed }) =>
                        values.username && values.password && !isSubmitting
                          ? [
                              { opacity: pressed ? 0.5 : 1 },
                              globalStyles.primaryBtn,
                            ]
                          : globalStyles.lightBgBtn
                      }
                    >
                      <Text
                        style={
                          values.username && values.password && !isSubmitting
                            ? [globalStyles.primaryBtnTxt]
                            : globalStyles.lightBgBtnTxt
                        }
                      >
                        Sign in
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{ width: "40%", alignSelf: "center" }}
                      onPress={() => {
                        //   dispatch(addTermsAndConditions(false));
                        //   dispatch(AddPrivacyPolicy(false));
                        //   dispatch(checkCodeSend(false));
                        navigation.navigate("Register");
                      }}
                    >
                      {({ pressed }) => (
                        <Text
                          style={[
                            globalStyles.createAcTxt,
                            { opacity: pressed ? 0.5 : 1 },
                          ]}
                        >
                          Create account
                        </Text>
                      )}
                    </Pressable>
                  </View>
                </View>
              )}
            </Formik>
          </View>
          <Modal animationType="fade" transparent={true} visible={loading}>
            <View style={globalStyles.centeredView}>
              <ActivityIndicator color="#ea5242" size={50} />
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
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
    paddingVertical: 100,
    display: "flex",
    alignItems: "center",
  },

  emailBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },

  passwordBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  frgtTxt: {
    fontSize: 14,
    color: "#EA5242",
    marginBottom: 30,
    fontFamily: "Roboto-Regular",
  },

  remFrgtPsd: {
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  remId: {
    marginBottom: 25,
    gap: 8,
  },
  remtxt: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Roboto-Regular",
  },
  chngPswd: {
    backgroundColor: "#EA5242",
    padding: 10,
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    borderRadius: 70,
    width: "100%",
  },

  chngLtr: {
    backgroundColor: "#808080",
    padding: 10,
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    borderRadius: 70,
    width: "100%",
  },

  notChngPswd: {
    textAlign: "center",
  },

  checkboxes: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginLeft: 5,
    width: "auto",
    // borderWidth: 1,
    marginBottom: 5,
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textStyle: {
    color: "white",
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
});

export default SignIn;

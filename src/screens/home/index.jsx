import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  SafeAreaView,
  FlatList,
} from 'react-native';
// import globalStyles from "../../styles/globalStyles";
import {COLORS, FONTSIZE} from '../../theme/theme';
import NetworkError from '../network';
import NetInfo from '@react-native-community/netinfo';
import CustomModal from '../../components/model/CustomModal';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../styles/globalStyles';
import {resetQuiz, setQuizArray} from '../../store/slices/quizSlice';
import {useDispatch, useSelector} from 'react-redux';
import Aptitude_easy from '../../components/quastions/Aptitude_easy.json';
import Aptitude_medium from '../../components/quastions/Aptitude_medium.json';
import Aptitude_hard from '../../components/quastions/Aptitude_hard.json';
import Python_easy from '../../components/quastions/Python_easy.json';
import Python_medium from '../../components/quastions/Python_medim.json';
import Python_hard from '../../components/quastions/Python_hard.json';
import Git_easy from '../../components/quastions/Git_easy.json';
import Git_medium from '../../components/quastions/Git_average.json';
import Git_hard from '../../components/quastions/Git_hard.json';
import React_native_easy from '../../components/quastions/React_Native_easy.json';
import React_native_Average from '../../components/quastions/React_Native_medium.json';
import React_native_hard from '../../components/quastions/React_native_hard.json';

const HomeScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setModalMenuVisible] = useState(false);
  const [selectmodel, setSelectmodel] = useState(false);
  const [visible, setVisible] = useState('');
  const [title, setTitle] = useState([]);
  const dispatch = useDispatch();
  const quizArray = useSelector(state => state.quiz.QuizArray);
  // console.log('=======================', quizArray);
  useEffect(() => {
    const backAction = () => {
      navigation.canGoBack(false);
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
      // console.log('Connection type', state.type);
      // console.log('Is connected', state.isConnected);
      setIsConnected(state.isConnected);
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
    dispatch(resetQuiz());
    BackHandler.exitApp();
  };
  const handleSelectClose = () => {
    setSelectmodel(false);
  };

  const handleSelectModalYes = () => {
    setSelectmodel(false);
    navigation.navigate('Quiz');
  };
  const toggleModal = () => {
    setModalMenuVisible(!menuVisible);
  };
  useEffect(() => {
    setModalMenuVisible(false);
    dispatch(resetQuiz());
  }, []);

  const supplyCatagoryList = [
    {
      id: 1,
      name: 'React Native',
      subCategories: [
        {
          id: 101,
          name: 'Simple',
        },
        {
          id: 102,
          name: 'Average',
        },
        {
          id: 103,
          name: 'Hard',
        },
      ],
    },
    {
      id: 2,
      name: 'Git',
      subCategories: [
        {
          id: 201,
          name: 'Simple',
        },
        {
          id: 202,
          name: 'Average',
        },
        {
          id: 203,
          name: 'Hard',
        },
      ],
    },
    {
      id: 3,
      name: 'python',
      subCategories: [
        {
          id: 301,
          name: 'Simple',
        },
        {
          id: 302,
          name: 'Average',
        },
        {
          id: 303,
          name: 'Hard',
        },
      ],
    },
    {
      id: 4,
      name: 'Aptitude',
      subCategories: [
        {
          id: 401,
          name: 'Simple',
        },
        {
          id: 402,
          name: 'Average',
        },
        {
          id: 403,
          name: 'Hard',
        },
      ],
    },
  ];
  const handleLoad = (id, data, name) => {
    console.log('you have selected', id, data);
    setTitle(pre => [`${name}`, `${data.name}`]);
    switch (id) {
      case 1:
        console.log('React Native selected:', data);
        if (data.name === 'Simple') {
          dispatch(setQuizArray(React_native_easy));
        } else if (data.name === 'Average') {
          dispatch(setQuizArray(React_native_Average));
        } else if (data.name === 'Hard') {
          dispatch(setQuizArray(React_native_hard));
        }

        break;
      case 2:
        console.log('Electronics selected:', data);
        if (data.name === 'Simple') {
          dispatch(setQuizArray(Git_easy));
        } else if (data.name === 'Average') {
          dispatch(setQuizArray(Git_medium));
        } else if (data.name === 'Hard') {
          dispatch(setQuizArray(Git_hard));
        }
        break;
      case 3:
        console.log('Furniture selected:', data);
        if (data.name === 'Simple') {
          dispatch(setQuizArray(Python_easy));
        } else if (data.name === 'Average') {
          dispatch(setQuizArray(Python_medium));
        } else if (data.name === 'Hard') {
          dispatch(setQuizArray(Python_hard));
        }
        break;
      case 4:
        console.log('Cleaning Supplies selected:', data);
        if (data.name === 'Simple') {
          dispatch(setQuizArray(Aptitude_easy));
        } else if (data.name === 'Average') {
          dispatch(setQuizArray(Aptitude_medium));
        } else if (data.name === 'Hard') {
          dispatch(setQuizArray(Aptitude_hard));
        }
        break;
      default:
        console.log('Unknown category selected:', data);
        break;
    }
    setSelectmodel(true);
  };

  return (
    <>
      {isConnected == true && refreshing == false ? (
        <SafeAreaView style={globalStyles.safeArea}>
          <View style={globalStyles.header}>
            <View style={[globalStyles.flexHeader]}>
              <View style={globalStyles.backIcon}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{marginLeft: 10}}>
                  <Icon name="menu" size={24} color="#080808" />
                </TouchableOpacity>
              </View>
              <View style={[globalStyles.headerTxtWrapTwo]}>
                <Text style={styles.logoImg}>HOME</Text>
              </View>
              <View style={[globalStyles.topRightIcon]}>
                <TouchableOpacity
                  style={globalStyles.topRghtBtn}
                  onPress={() => {
                    navigation.navigate('profile');
                  }}>
                  <Icon
                    name="person-circle-outline"
                    size={26}
                    color="#080808"
                  />

                  {/* {dot ? <View style={styles.notifyDot}></View> : null} */}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={[styles.title]}>Welcome to the Quiz Game</Text>
          <Text style={[styles.title2]}> please select any one</Text>

          <>
            <FlatList
              data={supplyCatagoryList}
              renderItem={({item, index}) => (
                <Collapse
                  style={styles.accordionWrapList}
                  onToggle={isExpanded => {
                    // console.log(item.name, isExpanded);
                    setVisible(isExpanded ? `${item.name}` : '');
                  }}
                  isExpanded={visible == `${item.name}`}>
                  <CollapseHeader style={styles.accordionHeader}>
                    <Text style={styles.accordionHeaderTxt}>{item?.name}</Text>
                    <View>
                      <Icon
                        name={
                          visible == `${item?.name}`
                            ? 'chevron-up'
                            : 'chevron-down'
                        }
                        size={10}
                        color="#828282"
                      />
                    </View>
                  </CollapseHeader>
                  <CollapseBody style={styles.accordionBody}>
                    {item?.subCategories.map(x => (
                      <TouchableOpacity
                        style={styles.accordionList}
                        key={x.id}
                        onPress={() => {
                          handleLoad(item?.id, x, item?.name);
                        }}>
                        <Text style={styles.accordionListTxt}>{x?.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </CollapseBody>
                </Collapse>
              )}
            />
          </>

          <CustomModal
            visible={modalVisible}
            onClose={handleModalClose}
            onYes={handleModalYes}
            title="Exit App">
            <Text>Are you sure you want to exit?</Text>
          </CustomModal>

          <CustomModal
            visible={selectmodel}
            onClose={handleSelectClose}
            onYes={handleSelectModalYes}
            title="You selected ">
            <Text style={{fontWeight: 'bold'}}>
              {title[0]}
              <Text style={{fontWeight: '400'}}> with priority </Text>
              {title[1]}
            </Text>
          </CustomModal>

          <Modal
            isVisible={menuVisible}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            onBackdropPress={() => setModalMenuVisible(!menuVisible)}
            style={{
              marginLeft: 0,
              marginTop: 0,
              marginBottom: 0,
              width: '80%',
            }}>
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <View>
                <View style={styles.menuBoxHeader}>
                  <View style={styles.menuBoxLogo}>
                    <Text>Side Menu</Text>
                  </View>
                  <TouchableOpacity onPress={() => {}}>
                    <Icon name="settings" size={22} color="#080808" />
                  </TouchableOpacity>
                </View>

                <View style={styles.menuAccordion}>
                  <Collapse
                    style={styles.accordionWrapList}
                    onToggle={isExpanded => {
                      setVisible(isExpanded ? 'Mypage' : '');
                    }}
                    isExpanded={visible == 'Mypage'}>
                    <CollapseHeader style={styles.accordionHeader}>
                      <Text style={styles.accordionHeaderTxt}>Main Menu</Text>
                      <View
                        style={{
                          transform: [
                            {
                              rotate: visible == 'Mypage' ? '180deg' : '0deg',
                            },
                          ],
                        }}>
                        <Icon name="arrow-down" size={15} color="#BDBDBD" />
                      </View>
                    </CollapseHeader>
                    <CollapseBody style={styles.accordionBody}>
                      <TouchableOpacity
                        style={styles.accordionList}
                        onPress={() => {}}>
                        <Text style={styles.accordionListTxt}>Inner Menu</Text>
                      </TouchableOpacity>
                    </CollapseBody>
                  </Collapse>
                </View>
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
              <ActivityIndicator size={40} color={'#EA5242'} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.LightGrey,
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontSize: FONTSIZE.size_24,
    fontWeight: 'bold',
    color: COLORS.DarkBlue,
    paddingBottom: 20,
    textAlign: 'center',
  },
  touchableBtn: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: COLORS.RoyalBlue,
    elevation: 5, // Adds a shadow for Android
    shadowColor: '#000', // Adds a shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    color: COLORS.White,
  },
  menuBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    borderBottomColor: '#E3E2E2',
    borderBottomWidth: 1,
    paddingLeft: 25,
  },
  menuBoxLogo: {
    // width: 200,
    // height: 20,
    width: 200,
    height: 20,
  },
  menuAccordion: {
    padding: 20,
  },
  accordionWrapList: {
    marginBottom: 10,
  },
  accordionHeader: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionHeaderTxt: {
    fontSize: 14,
    color: '#080808',
    fontFamily: 'Roboto-Medium',
    paddingRight: 5,
  },
  accordionBody: {
    backgroundColor: '#f6f6f6',
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1,
    padding: 10,
  },
  accordionList: {
    paddingVertical: 10,
  },
  accordionListTxt: {
    fontSize: 14,
    color: '#080808',
    fontFamily: 'Roboto-Regular',
  },
  accArrow: {
    color: '#828282',
  },
  logoImg: {
    // width: 190,
    // height: 12,
  },
  title2: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    color: COLORS.Yellow,
    paddingBottom: 14,
    textAlign: 'center',
  },
});

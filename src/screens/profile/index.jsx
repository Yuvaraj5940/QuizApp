import {View, Text, BackHandler, StyleSheet, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../../styles/globalStyles';

const Profile = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={globalStyles.safeArea}>
        <View style={styles.availablePointWrap}>

      <View style={styles.availablePointLeft}>
        <Text style={styles.availablePointLeftTxt}>
          Available Points
        </Text>
        <View style={styles.availablePoint}>
          {/* <Image
            style={styles.availablePointImg}
            source={require('../assets/images/points.png')}
          /> */}
          <Text style={styles.availablePointTxt}>
            { Number(300).toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              }
          </Text>
        </View>
      </View>
        </View>
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
    availablePointLeft: {
        flex: 1,
        paddingRight: 5,
      },
      availablePoint: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      availablePointImg: {
        width: 25,
        height: 25,
      },
      availablePointLeftTxt: {
        fontSize: 14,
        color: '#080808',
        marginBottom: 10,
        fontFamily: 'Roboto-Regular',
      },availablePoint: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      availablePointTxt: {
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        color: '#080808',
        paddingLeft: 8,
      },
      availablePointWrap: {
        flexDirection: 'row',
        borderBottomColor: '#f6f6f6',
        borderBottomWidth: 8,
        padding: 20,
      },
})
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

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
          <Text style={styles.availablePointLeftTxt}>Available amount</Text>
          <View style={styles.availablePoint}>
            <Text style={styles.availablePointTxt}>
              {Number(300).toLocaleString('en-US', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
            <TouchableOpacity style={styles.addtoWallet}>
              <Text style={styles.addtoWalletTxt}>Add to wallet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsText}>Number of tests taken</Text>
          <Text style={styles.detailsNumber}>000</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsText}>Number of tests cleared</Text>
          <Text style={styles.detailsNumber}>000</Text>
        </View>
      </View>
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
  availablePointLeftTxt: {
    fontSize: 16,
    color: COLORS.DarkGray,
    marginBottom: 10,
    fontFamily: FONTFAMILY.roboto_regular,
  },
  availablePointTxt: {
    fontSize: 30,
    fontFamily: FONTFAMILY.roboto_medium,
    color: COLORS.Success,
    paddingLeft: 8,
  },
  availablePointWrap: {
    flexDirection: 'row',
    borderBottomColor: COLORS.LightGray,
    borderBottomWidth: 8,
    padding: 20,
    backgroundColor: COLORS.White,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: COLORS.White,
    marginTop: 10,
    borderRadius: 8,
    elevation: 2, // For Android shadow
    shadowColor: COLORS.Black, // For iOS shadow
    shadowOffset: {width: 0, height: 2}, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 8, // For iOS shadow
  },
  detailsText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.PrimaryDark,
  },
  detailsNumber: {
    color: COLORS.Secondary,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  addtoWallet: {
    padding: 8,
    backgroundColor: COLORS.RoyalBlue,
    borderRadius: 4,
    marginLeft: 10,
  },
  addtoWalletTxt: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.roboto_medium,
    fontSize: 14,
  },
});

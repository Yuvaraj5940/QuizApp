import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
//   import NetInfo from '@react-native-community/netinfo';
import { globalStyles } from "../../styles/globalStyles";
//   import CustomIcon from '../Components/customIcon';
//   import {t} from '../Locales/translationGetters';
// import { withNavigation } from 'react-navigation';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const NetworkError = ({ onpress, navigation }) => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.header}>
        <View style={globalStyles.flexHeader}>
          <View
            style={[
              globalStyles.backIcon,
              {
                width: 70,
                flexDirection: "row",
                justifyContent: "space-around",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[globalStyles.backBtn, { marginLeft: 10 }]}
            >
              {/* <CustomIcon name="back" size={22} style={{color: '#080808'}} /> */}
              <Ionicons name="arrow-back" size={22} color="#080808" />
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.backBtn}
              onPress={() => {
                if (navigation) {
                  //   console.log(navigation);
                  navigation.navigate("Home");
                } else {
                  return null;
                }
              }}
            >
              {/* <CustomIcon
                  name="home-filled"
                  size={22}
                  style={{color: '#080808'}}
                /> */}
              <Ionicons name="home" size={22} color="#080808" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.networkerrWrp}>
        <View style={styles.networkerrCont}>
          {/* <CustomIcon
              name="server-error"
              size={80}
              style={{color: '#ea5242'}}
            /> */}
          <MaterialCommunityIcons
            name="access-point-network-off"
            size={22}
            color="#080808"
          />

          <Text style={styles.networkerrHead}>Oops</Text>
          <Text style={styles.networkerrTxt}>
            Slow or no internet connection. Please check your internet settings.
          </Text>
        </View>
        <TouchableOpacity
          onPress={onpress}
          style={[
            globalStyles.blackBtn,
            {
              width: "100%",
              flex: 0,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            },
          ]}
        >
          <Ionicons name="reload" size={14} color="#080808" />
          <Text style={[globalStyles.blackBtnTxt]}>
            {/* <CustomIcon name="again" size={14} color={'#fff'} />{' '} */}
            Try again
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  networkerrWrp: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  networkerrCont: {
    alignItems: "center",
  },
  networkerrHead: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    color: "#080808",
    marginTop: 20,
    marginBottom: 8,
  },
  networkerrTxt: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#888989",
    marginBottom: 56,
    textAlign: "center",
  },
});
export default NetworkError;

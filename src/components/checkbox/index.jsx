import {StyleSheet, View, Pressable, Text} from 'react-native';
import React from 'react';
// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icoMoonConfig from '../assets/fonts/icomoon/selection.json';
// export const CustomAppIcon = createIconSetFromIcoMoon(icoMoonConfig);
import Icon from "react-native-vector-icons/Ionicons";

const CheckBox = ({value, style}) => {
  return (
    <View style={[styles.container, style, {borderWidth: value ? 0 : 1}]}>
      <View
        style={[
          styles.innerContainer,
          {backgroundColor: value ? '#ea5242' : 'transparent'},
        ]}>
        {value && (
        //   <CustomAppIcon name="check" size={7} style={{color: '#fcfcfc'}} />
        <Icon name="checkmark-circle" size={13} color="#fcfcfc" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 15,
    height: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#A5A5A5',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CheckBox;

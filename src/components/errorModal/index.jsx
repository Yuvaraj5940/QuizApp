import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
// import {t} from '../Locales/translationGetters';

const ErrorModal = ({error, modalVisible, setModalVisible}) => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={globalStyles.centeredView}>
          <View style={globalStyles.modalView}>
            <Text style={globalStyles.modalSingleTxt}>{error}</Text>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#EA5242',
    padding: 10,
    color: '#fff',
    fontSize: 16,
    borderRadius: 70,
    width: '80%',
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
    padding: 10,
  },
});

export default ErrorModal;

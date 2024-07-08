import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import EncryptedStorage from 'react-native-encrypted-storage';
import Toast from 'react-native-simple-toast';
import ErrorModal from '../../components/errorModal';

const Profile = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorModel, setErrorModel] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  useEffect(() => {
    requestPermissions();
    loadProfileImage();
  }, []);

  const requestPermissions = () => {
    try {
      requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      ]).then(statuses => {
        console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
        console.log(
          'Storage',
          statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES],
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error:', response.error);
        setErrorMsg(response.error);
        setErrorModel(true);
      } else {
        const source = {uri: response.assets[0].uri};
        updateImage(source);
      }
    });
  };

  const loadProfileImage = async () => {
    try {
      const img = await EncryptedStorage.getItem('quizProfileImg');
      if (img) {
        setSelectedImage({uri: img});
        // console.log('Image loaded:', img);
        
      } else {
        console.log('Please select an image.');
      }
    } catch (error) {
      console.error('Error loading image from AsyncStorage:', error);
    }
  };

  const updateImage = async source => {
    try {
      await EncryptedStorage.setItem('quizProfileImg', source.uri);
      // console.log('Image saved:', source.uri);
      Toast.show('Profile Image saved.', Toast.SHORT, {
        backgroundColor: 'blue',
      });
      loadProfileImage();
    } catch (error) {
      console.error('Error saving image to AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={selectedImage} style={styles.profileImage} />
          ) : (
            <Icon name="person-circle-outline" size={100} color="#080808" />
          )}
          <TouchableOpacity style={styles.editButton} onPress={openImagePicker}>
            <Text style={styles.editButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Amount</Text>
          <View style={styles.availableAmount}>
            <Text style={styles.amountText}>
              {Number(300).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
            <TouchableOpacity style={styles.addToWalletButton}>
              <Text style={styles.addToWalletButtonText}>Add to Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Number of Tests Taken</Text>
            <Text style={styles.detailNumber}>000</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Number of Tests Cleared</Text>
            <Text style={styles.detailNumber}>000</Text>
          </View>
        </View>
        <ErrorModal
          error={errorMsg}
          modalVisible={errorModel}
          setModalVisible={setErrorModel}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.White,
  },
  title: {
    fontSize: FONTSIZE.size_22,
    fontFamily: FONTFAMILY.poppins_medium,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.LightGray,
  },
  editButton: {
    backgroundColor: COLORS.Coral,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: COLORS.Black,
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.PrimaryDark,
    marginBottom: 10,
  },
  availableAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.roboto_medium,
    color: COLORS.Success,
    paddingRight: 8,
  },
  addToWalletButton: {
    backgroundColor: COLORS.RoyalBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 10,
  },
  addToWalletButtonText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.PrimaryDark,
  },
  detailNumber: {
    fontFamily: FONTFAMILY.roboto_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.Secondary,
  },
});

export default Profile;

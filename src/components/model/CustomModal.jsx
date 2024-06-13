import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'; // Ensure you import your theme

const CustomModal = ({ visible, onClose, onYes, title, children }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={styles.modalContent}>
            {children}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.yesButton} onPress={onYes}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={onClose}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    padding: SPACING.space_20,
    alignItems: 'center',
    shadowColor: COLORS.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: FONTSIZE.size_22,
    fontWeight: '600',
    marginBottom: SPACING.space_10,
    textAlign: 'center',
    color: COLORS.PrimaryDark,
  },
  modalContent: {
    marginBottom: SPACING.space_20,
    alignItems: 'center',
    paddingHorizontal: SPACING.space_10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  yesButton: {
    backgroundColor: COLORS.Success,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    borderRadius: 10,
    marginHorizontal: SPACING.space_8,
    alignItems: 'center',
    flex: 1,
  },
  noButton: {
    backgroundColor: COLORS.Danger,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    borderRadius: 10,
    marginHorizontal: SPACING.space_8,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
  },
});

export default CustomModal;

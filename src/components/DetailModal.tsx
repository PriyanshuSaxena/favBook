import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Volume} from '../constants/interface/InterfaceConstants';

const DetailModal = ({
  bookDetails,
  modalVisible,
  onModalClose,
}: {
  bookDetails?: Volume;
  modalVisible: boolean;
  onModalClose: Function;
}) => {
  return (
    <Modal visible={modalVisible} transparent>
      <TouchableOpacity
        onPress={() => {
          onModalClose();
        }}
        style={styles.container}
        activeOpacity={1}>
        <View style={styles.whiteBox}>
          <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
            <View>
              <Image
                style={styles.imgDimensions}
                source={
                  bookDetails?.volumeInfo?.imageLinks?.thumbnail
                    ? {uri: bookDetails?.volumeInfo?.imageLinks?.thumbnail}
                    : require('../assets/pngImage/defaultBook.jpg')
                }
              />

              <Text
                style={[styles.headingStyles, {fontSize: 24, marginTop: 20}]}>
                {bookDetails?.volumeInfo?.title}
              </Text>
              <Text style={styles.headingStyles}>
                {bookDetails?.volumeInfo?.publishedDate}
              </Text>
              <Text style={styles.headingStyles}>
                {bookDetails?.volumeInfo?.publisher}
              </Text>
              <Text style={styles.descriptionStyle}>
                {bookDetails?.volumeInfo?.description}
              </Text>
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    backgroundColor: '#fff',
    width: '80%',
    height: '70%',
    padding: 10,
  },
  imgDimensions: {
    width: 150,
    height: 150,
    borderRadius: 8,
    alignSelf: 'center',
  },
  headingStyles: {
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize',
  },
  descriptionStyle: {
    marginTop: 10,
    textTransform: 'capitalize',
  },
});

export default DetailModal;

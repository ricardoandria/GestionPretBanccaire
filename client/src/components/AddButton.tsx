import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {};

const AddButton = ({setIsModalVisible}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => setIsModalVisible(true)}>
        <Icon name="plus" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 165,
  },
  btnAdd: {
    backgroundColor: '#92cace',
    width: 65,
    height: 65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default AddButton;

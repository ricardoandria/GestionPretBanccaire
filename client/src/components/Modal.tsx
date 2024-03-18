import axios from 'axios';
import React, {useState} from 'react';
import {View, Button, Modal, TextInput, StyleSheet, Text} from 'react-native';

interface AddLocationModalProps {
  visible: boolean;
  onClose: () => void;
}

interface LocationItem {
  nomClient: string;
  nomBanque: string;
  montant: number;
  tauxPret: number;
}

const AddLocationModal: React.FC<AddLocationModalProps> = ({
  visible,
  onClose,
}) => {
  const [nomClient, setNomClient] = useState('');
  const [nomBanque, setNomBanque] = useState('');
  const [montant, setMontant] = useState('');
  const [tauxPret, setTauxPret] = useState('');

  const handleSubmit = async () => {
    const newLocation: LocationItem = {
      nomClient,
      nomBanque,
      montant: parseInt(montant),
      tauxPret: parseInt(tauxPret),
    };

    await axios
      .post('http://192.168.88.21:5000/pretBancaire/', newLocation)
      .then(response => {
        console.log('Location added successfully:', response.data);
        onClose();
      })
      .catch(error => {
        console.error('Error adding location:', error);
      });

    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      style={{width: '80%'}}>
      <View style={styles.modalContent}>
        <TextInput
          style={styles.input}
          placeholder="Nom du client"
          value={nomClient}
          onChangeText={setNomClient}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom banque"
          value={nomBanque}
          onChangeText={setNomBanque}
        />
        <TextInput
          style={styles.input}
          placeholder="Montant"
          value={montant}
          onChangeText={setMontant}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Taux de pret"
          value={tauxPret}
          onChangeText={setTauxPret}
          keyboardType="numeric"
        />

        <Button title="Ajouter" onPress={handleSubmit} />
        <Button title="Annuler" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 7,
    backgroundColor: '#bcd5ff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
});

export default AddLocationModal;

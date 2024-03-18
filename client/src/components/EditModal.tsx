import React, {useEffect, useState} from 'react';
import {View, Modal, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';

interface EditLocationModalProps {
  visible: boolean;
  onClose: () => void;
  id: string;
}

const EditLocationModal: React.FC<EditLocationModalProps> = ({
  visible,
  onClose,
  id,
}) => {
  const [nomClient, setNomClient] = useState('');
  const [nomBanque, setNomBanque] = useState('');
  const [montant, setMontant] = useState('');
  const [tauxPret, setTauxPret] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.88.21:5000/pretBancaire/${id}`,
        );
        const locationData = response.data;
        setNomClient(locationData.nomClient);
        setNomBanque(locationData.nomBanque);
        setMontant(locationData.montant.toString());
        setTauxPret(locationData.tauxPret.toString());
      } catch (error) {
        console.error('Error fetching location details:', error);
      }
    };

    if (visible && id) {
      fetchData();
    }
  }, [visible, id]);

  const handleSubmit = async () => {
    const updatedLocation = {
      nomClient,
      nomBanque,
      montant: parseInt(montant),
      tauxPret: parseInt(tauxPret),
    };

    try {
      await axios.put(
        `http://192.168.88.21:5000/pretBancaire/${id}`,
        updatedLocation,
      );
      onClose();
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
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

        <Button title="Modifier" onPress={handleSubmit} />
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

export default EditLocationModal;

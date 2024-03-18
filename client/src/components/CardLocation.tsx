import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import EditLocationModal from './EditModal';

type Props = {};

type Item = {
  id: string;
  nomClient: string;
  nomBanque: string;
  montant: number;
  tauxPret: number;
  createdAt: string;
};

const LocationItem = ({
  id,
  nomBanque,
  nomClient,
  montant,
  tauxPret,
  createdAt,
  onDelete,
  onEdit,
  setIsModalVisible,
  setIdPass,
}: Item & {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIdPass: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleEdit = () => {
    onEdit(id);
    setIsModalVisible(true);
    setIdPass(id);
  };

  return (
    <View style={styles.cardContent}>
      <View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Numero Compte:</Text>
          <Text style={styles.content}>{id}</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Nom Client:</Text>
          <Text style={styles.content}>{nomClient}</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Nom Banque:</Text>
          <Text style={styles.content}>{nomBanque}</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Montant:</Text>
          <Text style={styles.content}>{montant}</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Date pret:</Text>
          <Text style={styles.content}>{createdAt}</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>Montant de pret:</Text>
          <Text style={styles.content}>{tauxPret + 1}</Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            borderColor: 'white',
            borderWidth: 1,
            padding: 4,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white'}}>Supprimer</Text>
          <Icon name="delete" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEdit}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            borderColor: 'white',
            borderWidth: 1,
            padding: 4,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white'}}>Modifier</Text>
          <Icon name="edit" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CardLocation = (props: Props) => {
  const [location, setLocation] = useState<Item[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idPass, setIdPass] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://192.168.88.21:5000/pretBancaire/',
        );
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [location]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://192.168.88.21:5000/pretBancaire/${id}`);
      setLocation(prevLocation => prevLocation.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (id: string) => {
    setIsModalVisible(true);
    setIdPass(id);
  };

  const renderItem = ({item}: {item: Item}) => (
    <LocationItem
      {...item}
      onDelete={handleDelete}
      onEdit={handleEdit}
      setIsModalVisible={setIsModalVisible}
      setIdPass={setIdPass}
    />
  );

  return (
    <View style={styles.container}>
      {location ? (
        <FlatList
          data={location}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>No data available</Text>
      )}
      {/* Le modal d'édition */}
      <EditLocationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        id={idPass}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    zIndex: 0,
    marginTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 0,
  },
  cardContent: {
    borderLeftColor: '#92cace',
    borderWidth: 1,
    borderLeftWidth: 5,
    padding: 10,
    gap: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    color: 'white',
    fontSize: 16,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    paddingRight: 10,
  },
});

export default CardLocation;

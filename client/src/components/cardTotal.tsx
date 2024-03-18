import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type LocationItem = {
  tauxPret: number;
};

const CardTotal = () => {
  const [location, setLocation] = useState<LocationItem[]>([]);

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
  }, []);

  const calculateTotalRent = () => {
    let totalRent = 0;
    location.forEach(item => {
      totalRent += item.tauxPret + 1;
    });
    return totalRent;
  };

  const calculateMinimalRent = () => {
    if (location.length === 0) return 0;
    let minimalRent = location[0].tauxPret + 1;
    location.forEach(item => {
      const rent = item.tauxPret + 1;
      if (rent < minimalRent) minimalRent = rent;
    });
    return minimalRent;
  };

  const calculateMaximalRent = () => {
    if (location.length === 0) return 0;
    let maximalRent = location[0].tauxPret + 1;
    location.forEach(item => {
      const rent = item.tauxPret + 1;
      if (rent > maximalRent) maximalRent = rent;
    });
    return maximalRent;
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalItems}>
        <Text style={styles.title}>Montant a payer Total:</Text>
        <Text style={styles.value}>{calculateTotalRent()} Ar</Text>
      </View>
      <View style={styles.totalItems}>
        <Text style={styles.title}>Montant a payer Minimal:</Text>
        <Text style={styles.value}>{calculateMinimalRent()} Ar</Text>
      </View>
      <View style={styles.totalItems}>
        <Text style={styles.title}>Montant a payer Maximal:</Text>
        <Text style={styles.value}>{calculateMaximalRent()} Ar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftColor: '#92cace',
    borderLeftWidth: 5,
    padding: 5,
    gap: 5,
    borderRadius: 5,
  },
  totalItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
  },
});

export default CardTotal;

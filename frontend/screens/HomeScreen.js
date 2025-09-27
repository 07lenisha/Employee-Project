import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from '../Config/axios';

export default function HomeScreen() {
  const [employees, setEmployees] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEmployees();
  }, []);

  const renderEmployee = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Employee', { empId: item._id })}
      activeOpacity={0.7}
    >
      <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
      <View style={styles.details}>
        <Text style={styles.detailText}>Email: {item.email}</Text>
        <Text style={styles.detailText}>Username: {item.username}</Text>
        <Text style={styles.detailText}>Mobile: {item.mobile}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee List</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item._id}
        renderItem={renderEmployee}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'green',
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  details: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from '../Config/axios';

export default function Employee({ route }) {
  const { empId } = route.params;
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await axios.get(`/api/employees/${empId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEmployee();
  }, [empId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" /> 
        <Text style={styles.loadingText}>Loading employee...</Text>
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Employee not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Employee Details</Text>
        <View style={styles.detailSection}>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Name: </Text>
            {employee.firstName} {employee.lastName}
          </Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Email: </Text>
            {employee.email}
          </Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Username: </Text>
            {employee.username}
          </Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Mobile: </Text>
            {employee.mobile}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 8,
    color: '#6b7280',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: 24,
    textAlign: 'center',
  },
  detailSection: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 18,
    color: '#374151',
  },
  label: {
    fontWeight: '600',
    color: '#1f2937',
  },
});
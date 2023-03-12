import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const AlarmResponderReportForm = () => {
  const [incident, setIncident] = useState('');
  const [description, setDescription] = useState('');
  const [responded, setResponded] = useState(false);

  const handleIncidentChange = (value) => {
    setIncident(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleRespondedChange = () => {
    setResponded(!responded);
  };

  const handleSubmit = () => {
    // Submit the form data to the server or perform other actions
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Incident:</Text>
        <TextInput
          id="incident"
          value={incident}
          onChangeText={handleIncidentChange}
          style={styles.input}
          required
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          id="description"
          value={description}
          onChangeText={handleDescriptionChange}
          style={[styles.input, { height: 100 }]}
          multiline
          numberOfLines={4}
          required
        />
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={handleRespondedChange}>
          {responded ? (
            <Text style={{ fontSize: 24, marginRight: 10 }}>✅</Text>
          ) : (
            <Text style={{ fontSize: 24, marginRight: 10 }}>❌</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Responded</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>


      </View>
    );
  };

function ReportsScreen({ navigation }) {
    return <AlarmResponderReportForm />;
}

export default ReportsScreen;

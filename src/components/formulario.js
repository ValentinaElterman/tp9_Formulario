import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export function Formulario({
  label,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  placeholder = '',
  maxLength,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#999"
        maxLength={maxLength}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontWeight: 'bold', marginBottom: 6, color: '#6DB8FA' },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    color: '#fff',
  },
  inputError: { borderColor: '#f3af19', borderWidth: 1 },
  error: { color: '#f3af19', marginTop: 6, fontSize: 12 },
});
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const Formulario = ({ 
  label,           
  value,           
  onChangeText,    
  error,           
  keyboardType = 'default', 
  placeholder,     
  maxLength        
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#777"
        maxLength={maxLength}
        autoCapitalize="none" 
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6DB8FA',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#d6b1e4',
    borderWidth: 1,
    borderColor: '#9d4dbb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputError: {
    borderColor: '#f3af19',
  },
  errorText: {
    color: '#f3af19',
    fontSize: 12,
    marginTop: 4,
  },
});
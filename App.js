import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Formulario } from './src/components/formulario';

export default function App() {
  const [formData, setFormData] = useState({
    nombreEquipo: '',
    nombreCapitan: '',
    email: '',
    telefono: '',
    categoria: '',
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const getErrors = () => {
    const errors = {};

    const equipoTrim = formData.nombreEquipo.trim();
    if (!equipoTrim) {
      errors.nombreEquipo = 'El nombre del equipo es obligatorio.';
    } else if (equipoTrim.length < 3 || equipoTrim.length > 20) {
      errors.nombreEquipo = 'Debe tener entre 3 y 20 caracteres.';
    }

    if (!formData.nombreCapitan.trim()) {
      errors.nombreCapitan = 'El nombre del capitán es obligatorio.';
    }

    const emailTrim = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrim) {
      errors.email = 'El email es obligatorio.';
    } else if (!emailRegex.test(emailTrim)) {
      errors.email = 'Formato de email inválido (ejemplo@dominio.com).';
    }

    const telefonoTrim = formData.telefono.trim();
    const phoneRegex = /^[0-9]+$/;
    if (!telefonoTrim) {
      errors.telefono = 'El teléfono es obligatorio.';
    } else if (!phoneRegex.test(telefonoTrim)) {
      errors.telefono = 'El teléfono solo debe contener números.';
    }

    if (!formData.categoria) {
      errors.categoria = 'Debes seleccionar una categoría.';
    }

    return errors;
  };

  const errors = getErrors();
  const isFormInvalid = Object.keys(errors).length > 0;

  const handleSubmit = () => {
    if (isFormInvalid) return;

    Alert.alert(
      "¡Inscripción Exitosa! YAYAYAY",
      `Equipo ${formData.nombreEquipo} anotado correctamente en categoría ${formData.categoria}.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>TORNEO DE FORTNITE 2026!!!</Text>
          <Text style={styles.subtitle}>Formulario de Inscripción</Text>

          <Formulario
            label="Nombre del Equipo"
            value={formData.nombreEquipo}
            onChangeText={(val) => handleChange('nombreEquipo', val)}
            error={errors.nombreEquipo}
            keyboardType="default"
            placeholder="Ej. fortnine auras "
            maxLength={20}
          />

          <Formulario
            label="Nombre del Capitán"
            value={formData.nombreCapitan}
            onChangeText={(val) => handleChange('nombreCapitan', val)}
            error={errors.nombreCapitan}
            keyboardType="default"
            placeholder="Ej. valu elter"
          />

          <Formulario
            label="Email de Contacto"
            value={formData.email}
            onChangeText={(val) => handleChange('email', val)}
            error={errors.email}
            keyboardType="email-address"
            placeholder="ailuseve@gmail.com"
          />

          <Formulario
            label="Teléfono"
            value={formData.telefono}
            onChangeText={(val) => handleChange('telefono', val)}
            error={errors.telefono}
            keyboardType="phone-pad"
            placeholder="1112345678"
          />

          <View style={styles.categoriaContainer}>
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  formData.categoria === 'Sub-16' && styles.toggleButtonActive,
                ]}
                onPress={() => handleChange('categoria', 'Sub-16')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    formData.categoria === 'Sub-16' && styles.toggleTextActive,
                  ]}
                >
                  Sub-16
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  formData.categoria === 'Libre' && styles.toggleButtonActive,
                ]}
                onPress={() => handleChange('categoria', 'Libre')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    formData.categoria === 'Libre' && styles.toggleTextActive,
                  ]}
                >
                  Libre
                </Text>
              </TouchableOpacity>
            </View>
            {errors.categoria ? (
              <Text style={styles.errorText}>{errors.categoria}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isFormInvalid && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isFormInvalid}
          >
            <Text style={styles.submitButtonText}>Confirmar inscripción</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4c51f7',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8A8A9E',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6DB8FA',
    marginBottom: 6,
  },
  categoriaContainer: {
    marginBottom: 24,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: '#9d4dbb',
    borderWidth: 1,
    borderColor: '#6f2c88',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#6DB8FA',
    borderColor: '#569ddb',
  },
  toggleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#0F0F1A',
  },
  errorText: {
    color: '#f3af19',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#f3af19',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#ffc700',
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
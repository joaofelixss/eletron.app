import React, { useEffect, useRef } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window');

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessModal({ 
  visible, 
  onClose, 
  title = "Sucesso!", 
  message = "Operação realizada com sucesso." 
}: SuccessModalProps) {
  
  // Valores animados para escala (zoom) e opacidade (fade)
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Quando abre: Animação de "Pop" elástico
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5, // Quão "elástico" é
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Quando fecha: Reseta os valores
      scaleValue.setValue(0);
      opacityValue.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none" // Vamos controlar a animação manualmente
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Fundo escuro animado */}
        <Animated.View style={[styles.backdrop, { opacity: opacityValue }]} />

        {/* Card do Modal Animado */}
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          
          {/* Círculo do Ícone */}
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark" size={40} color="#FFF" />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8} 
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Continuar</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>

        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Escurece o fundo
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: width * 0.85, // Ocupa 85% da largura da tela
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    // Sombras suaves (Elevation)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#10B981', // Verde Sucesso (Emerald 500)
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    // Sombra interna no ícone
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937', // Cinza Escuro
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#6B7280', // Cinza Médio
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary || '#000', // Usa a cor principal do app
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    gap: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
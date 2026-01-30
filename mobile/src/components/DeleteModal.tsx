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

const { width } = Dimensions.get('window');

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function DeleteModal({ 
  visible, 
  onClose, 
  onConfirm,
  title = "Excluir Produto?", 
  message = "Essa ação não pode ser desfeita. O item será removido permanentemente do estoque." 
}: DeleteModalProps) {
  
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5,
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
      scaleValue.setValue(0);
      opacityValue.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, { opacity: opacityValue }]} />

        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          
          {/* Ícone de Lixeira com Fundo Vermelho Suave */}
          <View style={styles.iconContainer}>
            <Ionicons name="trash-outline" size={32} color="#DC2626" />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.row}>
            {/* Botão Cancelar */}
            <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={onClose}
                activeOpacity={0.8}
            >
                <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            {/* Botão Confirmar (Perigo) */}
            <TouchableOpacity 
                style={[styles.button, styles.confirmButton]} 
                onPress={onConfirm}
                activeOpacity={0.8}
            >
                <Text style={styles.confirmText}>Sim, Excluir</Text>
            </TouchableOpacity>
          </View>

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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#FEE2E2', // Vermelho bem claro
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  confirmButton: {
    backgroundColor: '#DC2626', // Vermelho Perigo
  },
  cancelText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
  confirmText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
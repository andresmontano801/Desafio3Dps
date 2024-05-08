import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; 
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Agregar = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fotoURL, setFotoURL] = useState('');

  const guardarProducto = async () => {
    try {
      await addDoc(collection(db, 'productos'), {
        Categoria: categoria,
        Img: fotoURL,
        Nombre: nombre,
        Precio: parseFloat(precio),
      });
      Alert.alert('Producto creado')
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la foto"
        value={fotoURL}
        onChangeText={setFotoURL}
      />
      {fotoURL !== '' && (
        <Image source={{ uri: fotoURL }} />
      )}
      <Button title="Guardar" onPress={guardarProducto}  color='#58c1f5' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#7407db'
    },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    height: 50
  },
  boton:{
    backgroundColor: '#58c1f5',
color:'white'
  }
});

export default Agregar;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Button, Modal} from 'react-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, deleteDoc, doc, updateDoc, onSnapshot   } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const Hogar = () => {
  const navigation = useNavigation(); 
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const q = query(collection(db, 'productos'), where('Categoria', '==', 'Hogar'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const productosList = [];
          snapshot.forEach((doc) => {
            const { Categoria, Img, Nombre, Precio } = doc.data();
            productosList.push({
              id: doc.id,
              categoria: Categoria,
              img: Img,
              nombre: Nombre,
              precio: Precio,
            });
          });
  
          const productosFiltrados = productosList.filter((producto) =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
          );
  
          setProductos(productosFiltrados);
        });
  
        return () => unsubscribe();
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
  
    fetchProductos();
  }, [busqueda]);

  const renderProducto = ({ item }) => (
    <View style={styles.productoContainer}>
      <Image source={{ uri: item.img }} style={styles.productoImagen} />
      <View style={styles.textContainer}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoPrecio}>${item.precio}</Text>
      </View>
      <View style={styles.botonesContainer}>
        <Button title="Editar" onPress={() => handleEditarProducto(item)} />
        <Button title="Eliminar" onPress={() => onDeleteProducto(item.id)} color="red" style={styles.botonEliminar} />
      </View>
    </View>
  );

  const handleEditarProducto = (producto) => {
    setProductoEditado(producto);
    setModalVisible(true);
  };

  const handleGuardarEdicion = async () => {
    try {
      await updateDoc(doc(db, 'productos', productoEditado.id), {
        Nombre: productoEditado.nombre,
        Precio: productoEditado.precio,
      });
      setModalVisible(false);
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };

  onDeleteProducto = async (productId) => {
    try {
      await deleteDoc(doc(db, 'productos', productId));
      setProductos(prevProductos => prevProductos.filter(producto => producto.id !== productId));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }; 

  return (
    <View style={styles.container}>
            <Text style={styles.title}>Productos Hogar</Text>
      <View style={styles.busquedaContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar productos..."
          value={busqueda}
          onChangeText={(text) => setBusqueda(text)}
        />
      </View>
      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item) => item.id}
      />

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Producto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del producto"
              value={productoEditado ? productoEditado.nombre : ''}
              onChangeText={(text) => setProductoEditado(prev => ({ ...prev, nombre: text }))}
            />
            <TextInput style={styles.input} placeholder="Precio del producto" 
  value={productoEditado && productoEditado.precio !== null ? productoEditado.precio.toString() : ''}
  onChangeText={(text) => setProductoEditado(prev => ({ ...prev, precio: text !== '' ? parseFloat(text) : null }))}
  keyboardType="numeric"
/>
            <Button title="Guardar" onPress={handleGuardarEdicion} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal> 
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
  },
  busquedaContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  productoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  productoImagen: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productoPrecio: {
    fontSize: 16,
    color: 'green',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botonesContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  botonEliminar: {
    marginTop: 5,
  },
});

export default Hogar;

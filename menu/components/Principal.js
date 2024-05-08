import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { firebaseConfig } from '../firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Principal = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const q = query(collection(db, 'productos'));
        const productosSnapshot = await getDocs(q);

        const productosList = [];
        productosSnapshot.forEach((doc) => {
          const { Categoria, Img, Nombre, Precio } = doc.data();
          productosList.push({
            id: doc.id,
            categoria: Categoria,
            img: Img,
            nombre: Nombre,
            precio: Precio,
          });
        });

        setProductos(productosList);
        setFilteredProductos(productosList); // Inicializar productos filtrados con todos los productos
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    // Filtrar productos según el término de búsqueda
    const filtered = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProductos(filtered);
  }, [searchTerm, productos]);

  const renderProducto = ({ item }) => (
    <View style={styles.productoContainer}>
      <Image source={{ uri: item.img }} style={styles.productoImagen} />
      <View style={styles.textContainer}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoPrecio}>${item.precio}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a nuestra tienda</Text>
      <View style={styles.cont}>
        <Image style={styles.img}source={require('../img/image.jpg')}/>
        </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <FlatList
        data={filteredProductos}
        renderItem={renderProducto}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
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
  cont:{
    alignItems: 'center',
    margin: 20

},
});

export default Principal;

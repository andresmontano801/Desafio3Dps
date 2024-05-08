import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {Text, TouchableWithoutFeedback, View, Keyboard, Alert } from 'react-native';
import {firebaseConfig} from './firebase-config'
import Principal from './components/Principal';
import Electronicos from './components/Electronicos';
import Hogar from './components/Hogar';
import Ropa from './components/Ropa';
import Cocina from './components/Cocina'
import Login from './components/Login';
import Password from './components/Password';
import Agregar from './components/Agregar'


const app = initializeApp(firebaseConfig);
// Crea el Drawer Navigator
const Drawer = createDrawerNavigator();

const Logo = () => {
  return (
    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Tus compritas</Text>
  );
};

export default function App() {

  // Ocultar el teclado
  const cerrarTeclado = () => { Keyboard.dismiss(); }

  // Estado para el inicio de sesión 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para crear cuenta
  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('cuenta creada', userCredential.user)
        Alert.alert('Cuenta creada')
        onLogin();
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Ingresa una cuenta valida')
      });
  };
//funcion para inicio den sesion
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('sesion iniciada', userCredential.user)
        onLogin();
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Cuenta no encontrada');
      })
  }

  
  //cerrar sesion
  const HandleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        Alert.alert('Sesion cerrada')
      })
      .catch(error => console.log(error));
  };

  const onLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
          <View style={{ flex: 1 }}>
            <Login onLogin={onLogin}
              setEmail={setEmail}
              setPassword={setPassword}
              handleCreateAccount={handleCreateAccount}
              handleSignIn={handleSignIn}/>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <Drawer.Navigator screenOptions={{
          drawerStyle: {
            backgroundColor: '#d297fc',
            borderBottomRightRadius: 20,
          },
          headerStyle: {
            backgroundColor: '#d297fc',
          },
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          drawerActiveTintColor: '#9302fa',
          drawerInactiveTintColor: 'white',
          drawerLabelStyle: { fontSize: 20 },
        }}>
          <Drawer.Screen name="Inicio" component={Principal} />
          <Drawer.Screen name="Electronicos" component={Electronicos} />
          <Drawer.Screen name="Hogar" component={Hogar} />
          <Drawer.Screen name="Ropa" component={Ropa} />
          <Drawer.Screen name="Cocina" component={Cocina} />
          <Drawer.Screen name="Cambiar contraseña" component={Password} />
          <Drawer.Screen name="Agregar Producto" component={Agregar} />
          <Drawer.Screen name="Cerrar sesión" component={HandleSignOut} options={{ headerShown: false }} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

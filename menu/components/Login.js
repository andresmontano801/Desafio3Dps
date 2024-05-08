import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

const Login = ({ onLogin, setEmail, setPassword, handleCreateAccount, handleSignIn}) =>{

    return(
        <View style={styles.container}>

            <View>
                <Text style={styles.name}>Tus compritas</Text>
            </View>

<View>
<Text style={styles.label}>Email:</Text>
<TextInput onChangeText={(text) => setEmail(text)} placeholder='Email' style={styles.input} />
</View>

<View>
<Text style={styles.label}>Contraseña:</Text>
<TextInput onChangeText={(text) => setPassword(text)} placeholder='Contraseña' secureTextEntry={true} style={styles.input} />
</View>

<View>
<TouchableOpacity onPress={handleSignIn} style={styles.btnSubmitI} >
<Text style={styles.textoSubmit}>Iniciar</Text>
</TouchableOpacity>
</View>

<View>
<TouchableOpacity onPress={handleCreateAccount} style={styles.btnSubmitR}>
<Text style={styles.textoSubmit}>Crear Cuenta</Text>
</TouchableOpacity>
</View>

</View>
);
}

export default Login 

const styles = StyleSheet.create({

    name:{
        fontSize: 50,
        fontWeight: '900',
        textAlign: 'center',
        marginTop: '15%',
        padding: 10,
        color: '#7407db',
    },


    container: {
        paddingHorizontal: 20,
        paddingVertical: 50,
        flex: 1
        },
        label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        color: '#7407db'
        },
        input: {
        marginTop: 10,
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
        padding: 10
        },
        btnSubmitI: {
        padding: 10,
        backgroundColor: '#a55de8',
        marginTop: 50,
        borderRadius: 10,
        },
        btnSubmitR: {
            padding: 10,
            backgroundColor: '#58c1f5',
            marginVertical: 30,
            borderRadius: 10,
            },    
        textoSubmit: {
        color: '#f5f7f6',
        padding: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
        }
        
})
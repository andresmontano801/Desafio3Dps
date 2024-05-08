import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { updatePassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';



function Password() {

    const auth = getAuth();

    const [password, setPassword] = useState('');

    const user = auth.currentUser

    const handleChange = (text) =>{
        setPassword(text)
    }
     
    const handleSubmit = async (event) =>{
        event.preventDefault()
        try {
            await updatePassword(user, password);
console.log('se cambio la contraseña')
Alert.alert('Se cambio la contraseña correctamente')
setPassword(''); 
    }
    catch(error) {
        console.log(error)
        Alert.alert('Error al cambiar contraseña')
    }
    }
    

    return(
        <View style={styles.container}>

            <View>
                <Text style={styles.name}>Cambiar tu contraseña</Text>
            </View>

<View>
<Text style={styles.label}>Nueva Contraseña:</Text>
<TextInput value={password} onChangeText={handleChange} placeholder='Contraseña' secureTextEntry={true} style={styles.input} />
</View>

<View>
<TouchableOpacity onPress={handleSubmit} style={styles.btnSubmit} >
<Text style={styles.textoSubmit}>Guardar</Text>
</TouchableOpacity>
</View>
</View>
);
}

export default Password

const styles = StyleSheet.create({

    name:{
        fontSize: 30,
        textAlign: 'center',
        marginTop: '15%',
        padding: 10,
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
        btnSubmit: {
        padding: 10,
        backgroundColor: '#a55de8',
        marginTop: 50,
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
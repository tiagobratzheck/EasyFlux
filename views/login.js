import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

import { TextInput, Button, Checkbox, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import * as LoginService from '../services/loginService/loginService'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as userAction from '../actions/userAction';

import { useDispatch } from 'react-redux';


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0db337',
        accent: '#0DB337',
    },
};

export default function Login({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [checked, setChecked] = useState(false);
    const [msg, setMsg] = useState("");

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const getUsernameAndPassord = async () => {
            let email = await AsyncStorage.getItem("email")
            let senha = await AsyncStorage.getItem("senha")
            if (email) {
                setEmail(email)
                setChecked(true)
            }
            if (senha) setPassword(senha)
        }
        getUsernameAndPassord()

    }, [])

    const validarCredenciais = () => {
        if (email === undefined && password === undefined) {
            setMsg("Informe seu email e senha para entrar")
        } else {
            LoginService.login(email, password, checked)
                .then(() => {
                    dispatch(userAction.getUser(email))
                    navigation.navigate("home")
                    console.log("Login efetuado...")
                }).catch(erro => {
                    setMsg(erro)
                    console.log(erro)
                })
        }
    }

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <View style={styles.loginBox}>
                    <Image
                        style={styles.image}
                        source={require('../images/easy_logo_2.png')}
                    />
                    <View>
                        <TextInput style={styles.inputs}
                            label="Email"
                            keyboardType='email-address'
                            value={email}
                            mode='outlined'
                            onChangeText={(value) => setEmail(value)}
                        />
                        <TextInput style={styles.inputs}
                            label="Senha"
                            secureTextEntry={true}
                            value={password}
                            mode='outlined'
                            onChangeText={(value) => setPassword(value)}
                        />
                    </View>
                    <View style={styles.checkBox}>
                        <Text style={{ color: '#0DB337' }}>Lembrar email e senha</Text>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            uncheckedColor='#0DB337'
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                    </View>
                    <View style={styles.buttonBox}>
                        <Button mode="contained" onPress={validarCredenciais}>
                            Login
                        </Button>
                        <Button mode="contained" onPress={() => navigation.navigate("userRegister")}>
                            Definir senha
                        </Button>
                    </View>
                    <View style={styles.aboutBox}>
                        <Button icon="alert-circle-outline" mode="text" onPress={() => navigation.navigate('about')}>
                            <Text style={{ fontSize: 11 }}>Sobre o EasyFlux</Text>
                        </Button>
                    </View>
                </View>
                <View>
                    <Text style={{ color: "red", margin: 10 }}>{msg}</Text>
                </View>

            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginBox: {
        width: 330,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: 2,
        marginBottom: 3,
        borderWidth: 1.2,
        borderColor: '#0DB337',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    inputs: {
        width: 280,
        marginTop: 10,
        color: '#0DB337'
    },
    text: {
        color: '#178f25',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    checkBox: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonBox: {
        marginTop: 10,
        width: 300,
        height: 40,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    image: {
        width: 230,
        height: 80
    },
    aboutBox: {
        marginTop: 20
    }
})
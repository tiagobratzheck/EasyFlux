import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Appbar, TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import * as LoginService from '../services/loginService/loginService';
import * as EmployeeService from '../services/employeeService/employeeService';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0db337',
        accent: '#0DB337',
    },
};

export default function UserRegister({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState("");

    const handleRegister = async () => {
        const result = await EmployeeService.getEmployee(email).then((result) => {
            if (result.data() === undefined) {
                setMsg("Email não foi cadastrado na base de dados!")
            } else {
                createUser()
            }
        }).catch(erro => {
            console.log(erro)
        })
    }

    const createUser = async () => {
        const newUser = await LoginService.createUser(email, password).then((result) => {
            setMsg("Usuário criado com sucesso!")
            setEmail("")
            setPassword("")
        }).catch((erro) => {
            setMsg(erro)
        })
    }

    return (
        <PaperProvider theme={theme}>

            <Appbar.Header>
                <Appbar.Content style={{ marginLeft: 6 }} title="EasyFlux" subtitle="Registro de senha" />
                <Appbar.Action icon="arrow-left-bold-box-outline" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <View style={styles.container}>
                <View style={styles.loginBox}>
                    <Text>Registro de senha: </Text>
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

                    <View style={styles.buttonBox}>
                        {
                            email === undefined || password === undefined ?
                                <Button mode="contained" disabled onPress={() => { }}>
                                    Registrar
                                </Button>
                                :
                                <Button mode="contained" onPress={() => { handleRegister() }}>
                                    Registrar
                                </Button>
                        }
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
        height: 280,
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
        width: 200,
        height: 40,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    image: {
        width: 250,
        height: 90
    }
})
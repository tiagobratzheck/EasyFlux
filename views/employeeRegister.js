import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

import { Appbar, TextInput, Button, RadioButton, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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

export default function EmployeeRegister({ route, navigation }) {

    const { operacao, data, id } = route.params;

    const [message, setMessage] = useState();

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [value, setValue] = useState('Diretor');


    useEffect(() => {
        if (operacao === 'Atualizar') {
            setEmail(id);
            setNome(data.nome);
            setSobrenome(data.sobrenome);
            setValue(data.cargo);
        }
    }, [data])


    const handleButton = () => {
        if (operacao === 'Cadastrar') {
            cadastrar();
        } else {
            atualizar();
        }
    }

    const cadastrar = async () => {
        const data = {
            nome: nome,
            sobrenome: sobrenome,
            cargo: value
        };
        const result = await EmployeeService.saveEmployee(email, data)
            .then(() => {
                setMessage("Dados cadastrados com sucesso!")
            }).catch(erro => {
                console.log(erro)
            })
    }

    const atualizar = async () => {
        const data = {
            nome: nome,
            sobrenome: sobrenome,
            cargo: value
        };
        const result = await EmployeeService.updateEmployee(email, data)
            .then(() => {
                setMessage("Dados atualizados com sucesso!")
            }).catch(erro => {
                console.log(erro)
            })

    }

    const handleNavigation = () => {
        if (typeof message === 'undefined') {
            navigation.goBack()
        } else {
            setMessage(undefined)
        }

    }


    return (
        <PaperProvider theme={theme}>

            <Appbar.Header>
                <Appbar.Action icon="alpha-d-box-outline" onPress={() => { }} />
                <Appbar.Content style={{ marginLeft: 6 }} title="EasyFlux" subtitle={operacao === 'Cadastrar' ? "+ colaborador" : "atualizar"} />
                <Appbar.Action icon="account-group" onPress={() => { navigation.navigate('employees') }} />
                <Appbar.Action icon="arrow-left-bold-box-outline" onPress={() => handleNavigation()} />
            </Appbar.Header>

            <View style={styles.container}>

                <Image
                    source={require('../images/Easy_logo.png')}
                />

                {
                    typeof message === 'undefined' ?

                        <View style={{ alignContent: 'center', alignItems: 'center' }}>
                            <Text>Tela de registro de colaboradores</Text>

                            <View >
                                <TextInput style={styles.inputs}
                                    label="Email"
                                    mode='outlined'
                                    editable={operacao === 'Atualizar' ? false : true}
                                    keyboardType='email-address'
                                    value={email && email}
                                    onChangeText={email => setEmail(email)}
                                />
                                <TextInput style={styles.inputs}
                                    label="Nome"
                                    mode='outlined'
                                    value={nome && nome}
                                    onChangeText={nome => setNome(nome)}
                                />
                                <TextInput style={styles.inputs}
                                    label="Sobrenome"
                                    mode='outlined'
                                    value={sobrenome && sobrenome}
                                    onChangeText={sobrenome => setSobrenome(sobrenome)}
                                />
                            </View>

                            <Text style={styles.textStyles}>Selecione o cargo do seu colaborador:</Text>

                            <View style={styles.inputText}>
                                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value && value}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <RadioButton value="Diretor" />
                                        <Text>Diretor</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <RadioButton value="Analista" />
                                        <Text>Analista</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <RadioButton value="Gestor" />
                                        <Text>Gestor</Text>
                                    </View>
                                </RadioButton.Group>
                            </View>

                            <Button style={styles.button} mode="contained" onPress={() => handleButton()}>
                                <Text style={styles.textStyles}>{operacao}</Text>
                            </Button>
                        </View>

                        :

                        <View>
                            <Text>{message}</Text>
                        </View>

                }

            </View>

        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        width: 350,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-around',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        padding: 10,

    },
    inputs: {
        width: 330,
        marginTop: 10,
        color: '#0DB337'
    },
    textStyles: {
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    button: {
        width: 200,
        height: 40,
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 20

    }
})
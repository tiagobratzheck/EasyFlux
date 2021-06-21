import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { State } from 'react-native-gesture-handler';

import { Appbar, Colors, IconButton, DataTable, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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

export default function Employees({ route, navigation }) {


    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await EmployeeService.getAllEmployees()
                .then((result) => {
                    result.forEach((doc) => {
                        setData(prevState => ([...prevState, { id: doc.id, values: doc.data() }]
                        ));
                    });
                }).catch(erro => {
                    console.log(erro)
                })
        }
        fetchData()
    }, [])


    const updateEmployee = (id, values) => {        
        navigation.navigate("employeeRegister", {
            operacao: 'Atualizar',
            data: values,
            id: id
        })
    }


    return (
        <PaperProvider theme={theme}>

            <Appbar.Header>
                <Appbar.Action icon="alpha-d-box-outline" onPress={() => { }} />
                <Appbar.Content style={{ marginLeft: 6 }} title="EasyFlux" subtitle="Colaboradores" />
                <Appbar.Action icon="arrow-left-bold-box-outline" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <View style={styles.container}>

                <Image
                    source={require('../images/Easy_logo.png')}
                />
                <Text style={{ marginBottom: 40 }}>Tabela de colaboradores</Text>

                {typeof data !== 'undefined' ?

                    <View style={styles.tableContainer}>
                        <DataTable >
                            <DataTable.Header >
                                <DataTable.Title style={styles.tableStyle}>
                                    <Text style={styles.textHeaderTable}>Nome</Text>
                                </DataTable.Title>                             
                                <DataTable.Title style={styles.tableStyle}>
                                    <Text style={styles.textHeaderTable}>Cargo</Text>
                                </DataTable.Title>
                                <DataTable.Title style={styles.tableStyle}>
                                    <Text style={styles.textHeaderTable}>Atualizar</Text>
                                </DataTable.Title>
                                <DataTable.Title style={styles.tableStyle}>
                                    <Text style={styles.textHeaderTable}>Deletar</Text>
                                </DataTable.Title>
                            </DataTable.Header>

                            {data.map((item, index) => {
                                return (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={styles.tableStyle}>{item.values.nome}</DataTable.Cell>                                     
                                        <DataTable.Cell style={styles.tableStyle}>{item.values.cargo}</DataTable.Cell>
                                        <DataTable.Cell style={styles.tableStyle}>
                                            <IconButton
                                                icon="update"
                                                color={Colors.green700}
                                                size={30}
                                                onPress={() => updateEmployee(item.id, item.values)}
                                            />
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableStyle}>
                                            <IconButton
                                                icon="trash-can-outline"
                                                color={Colors.red700}
                                                size={30}
                                                onPress={() => console.log('Pressed')}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                    </View>

                    :

                    <View>
                        <Text>sem dados</Text>
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
    tableContainer: {
        backgroundColor: '#fff',
        alignContent: 'space-around',
        justifyContent: 'space-evenly',
        width: 380
    },
    tableStyle: {
        justifyContent: 'space-evenly',
        alignContent: 'space-between',
    },
    textHeaderTable: {
        fontSize: 17,
        fontWeight: 'bold'
    }
})


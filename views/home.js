import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Appbar, Button, DefaultTheme, Provider as PaperProvider, Divider, Dialog, Portal, Paragraph } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import CircularProgressChart from '../components/circularProgressChart';

import * as DataService from '../services/dataService/dataService';
import * as LoginService from '../services/loginService/loginService';
import * as Tools from '../tools/calculationTools';

import { useSelector } from 'react-redux';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0db337',
        accent: '#0DB337',
    },
};


export default function Home({ navigation }) {

    // Variável para selecionar o estado do usuário logado
    const user = useSelector(user => user);

    // Variávies financeiras --
    const [dbData, setDbData] = useState();

    // Variáveis para tratamento da data --
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const formatedDate = ((date.getDate() + " de " + months[(date.getMonth())] + " de " + date.getFullYear()));

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const showMode = () => {
        setShow(true);
    };

    //Variáveis do dialog --
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    // Funções para renderização do componente e logout -- 
    useEffect(() => {
        fetchData()
    }, [date])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData()
        });
        return unsubscribe;
    }, [navigation, date]);


    const fetchData = async () => {
        const currentDate = date.toISOString().split('T')[0]
        const result = await DataService.getRegister(currentDate)
            .then((result) => {
                setDbData(result.data())
            }).catch(erro => {
                console.log(erro)
            })
    }


    const deleteRegister = () => {
        DataService.deleteRegister(date.toISOString().split('T')[0])
            .then(() => {
                console.log("Registro deletado")
            }).catch(erro => {
                console.log(erro)
            })
        setVisible(false)
        fetchData()
    }


    const addEmployee = () => {
        navigation.navigate("employeeRegister", {
            operacao: "Cadastrar",
            data: null,
            id: null
        })
    }

    const exit = () => {
        LoginService.logout()
            .then(() => {
                navigation.navigate("login")
                console.log("Até breve!")
            }).catch(erro => {
                console.log(erro)
            })
    }

    const getColor = (value) => {
        if (typeof dbData !== 'undefined') {
            if (value === "contas") {
                let fluxo = Tools.getContasPagas(
                    dbData.resultados.fluxo_caixa.total_contas_pagas,
                    dbData.resultados.resultados_financeiros.contas_pagar_dia
                );
                return getColorPicker(fluxo);
            } else {
                let fluxo = Tools.getClientesRecebidos(
                    dbData.resultados.fluxo_caixa.total_clientes_recebidos,
                    dbData.resultados.resultados_financeiros.clientes_receber_dia
                );
                return getColorPicker(fluxo);
            }
        }
    }

    const getColorPicker = (value) => {
        if (value < 89) {
            return "#E70303"
        } else if (value > 89 && value < 91) {
            return "#FE7402"
        } else if (value > 91 && value < 93) {
            return "#FABB09"
        } else if (value > 93 && value < 95) {
            return "#62FA09"
        } else if (value > 95 && value < 96) {
            return "#86D723"
        } else if (value > 96 && value < 97) {
            return "#23D748"
        } else if (value > 97) {
            return "#0DB337"
        }
    }

    const getIcon = () => {
        if (user !== undefined) {
            switch (user.cargo) {
                case 'Diretor':
                    return "alpha-d-box-outline";
                case 'Gestor':
                    return "alpha-g-box-outline";
                case 'Analista':
                    return "alpha-a-box-outline";
                default:
                    return '';
            }
        }
    }


    return (
        <PaperProvider theme={theme}>

            <Appbar.Header>
                <Appbar.Action icon={getIcon()} onPress={() => { }} />
                <Appbar.Content title="EasyFlux" subtitle="home" />
                {
                    user && user.cargo === 'Diretor' ?
                        <Appbar.Action icon="account-plus" onPress={addEmployee} />
                        :
                        null
                }
                <Appbar.Action icon="exit-run" onPress={exit} />
            </Appbar.Header>

            <View styles={styles.container}>

                <View style={styles.dataContainer}>
                    <Button style={styles.buttonStyle} icon="calendar" mode="contained" onPress={() => showMode()}>
                        <Text style={{ fontSize: 9 }}>Selecionar data</Text>
                    </Button>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            display="calendar"
                            onChange={onChange}

                        />
                    )}
                    <View>
                        <Text style={styles.textStyle}>{formatedDate}</Text>
                    </View>
                </View>

                {
                    typeof dbData === 'undefined' ?

                        <View style={[styles.informBox, { justifyContent: 'space-evenly' }]}>
                            <Text style={{ fontSize: 16 }}>Sem dados cadastrados!</Text>
                            {
                                user && user.cargo === 'Diretor' ?
                                    <Button mode="contained" onPress={() => navigation.navigate("registro", {
                                        operacao: "Cadastro",
                                        data: null,
                                        date: date.toISOString().split('T')[0]
                                    })}>
                                        Cadastrar
                                    </Button>
                                    :
                                    <Button mode="contained" disabled onPress={() => { }}>
                                        Cadastrar
                                    </Button>
                            }
                        </View>

                        :

                        <View>

                            <View style={[styles.informBox, { marginBottom: 25, marginLeft: 20, marginRight: 25 }]}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                                    O Resultado do dia é:
                                </Text>
                                <Text style={[Tools.getStyle(
                                    dbData.resultados.fluxo_caixa.total_clientes_recebidos,
                                    dbData.resultados.fluxo_caixa.total_contas_pagas
                                ), { fontSize: 22 }]}>
                                    {Tools.getIndice(
                                        dbData.resultados.fluxo_caixa.total_clientes_recebidos,
                                        dbData.resultados.fluxo_caixa.total_contas_pagas
                                    )}
                                </Text>
                            </View>

                            <View style={styles.progressBarContainer}>

                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                    < CircularProgressChart
                                        realizado={dbData.resultados.fluxo_caixa.total_contas_pagas}
                                        arealizar={dbData.resultados.resultados_financeiros.contas_pagar_dia}
                                    />
                                    <Text style={{ marginTop: 10 }}>Contas pagas do dia</Text>
                                    
                                </View>

                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                    < CircularProgressChart
                                        realizado={dbData.resultados.fluxo_caixa.total_clientes_recebidos}
                                        arealizar={dbData.resultados.resultados_financeiros.clientes_receber_dia}
                                    />
                                    <Text style={{ marginTop: 10 }}>Total clientes recebidos</Text>

                                </View>

                            </View>

                            <View style={styles.mainBoxContainer}>
                                <View style={styles.informBox}>
                                    <Text style={styles.textContainer}>Fluxo de caixa: </Text>
                                    <Text style={[Tools.getStyle(
                                        dbData.resultados.fluxo_caixa.total_clientes_recebidos,
                                        dbData.resultados.fluxo_caixa.total_contas_pagas
                                    ), { marginLeft: 50 }]}>
                                        {`R$ ${Tools.getFluxo(
                                            dbData.resultados.fluxo_caixa.total_clientes_recebidos,
                                            dbData.resultados.fluxo_caixa.total_contas_pagas
                                        )}`}
                                    </Text>
                                    <Button style={{ width: 100, marginLeft: 10 }} mode="contained" onPress={() => {
                                        navigation.navigate("analyticsFluxo", {
                                            operacao: "fluxo de caixa",
                                            date: date
                                        })
                                    }}>
                                        <Text style={{ fontSize: 9 }}>Histórico</Text>
                                    </Button>
                                </View>

                                <View style={styles.informBox}>
                                    <Text style={styles.textContainer}>Saldo de caixa do dia: </Text>
                                    <Text>
                                        {dbData && `R$ ${dbData.resultados.fluxo_caixa.saldo_caixa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                                    </Text>
                                    <Button style={{ width: 100, marginLeft: 10 }} mode="contained" onPress={() => {
                                        navigation.navigate("analyticsSaldo", {
                                            operacao: "saldo de caixa",
                                            date: date
                                        })
                                    }}>
                                        <Text style={{ fontSize: 9 }}>Histórico</Text>
                                    </Button>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Finanças</Text>
                            </View>

                            <View style={styles.mainBoxContainer}>
                                <View style={styles.infoContainer}>
                                    <View >
                                        <Text style={styles.textContainer}>Faturamento do dia: </Text>
                                    </View>
                                    <View >
                                        <Text style={[styles.numberContainer, { color: '#336DFF' }]}>
                                            {dbData && `R$ ${dbData.resultados.resultados_financeiros.faturamento_dia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View >
                                        <Text style={styles.textContainer}>Clientes à receber no dia: </Text>
                                    </View>
                                    <View >
                                        <Text style={[styles.numberContainer, { fontSize: 19 }]}>
                                            {dbData && `R$ ${dbData.resultados.resultados_financeiros.clientes_receber_dia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View >
                                        <Text style={styles.textContainer}>Total recebido no dia: </Text>
                                    </View>
                                    <View >
                                        <Text style={[styles.numberContainer, { fontSize: 19 }]}>
                                            {dbData && `R$ ${dbData.resultados.fluxo_caixa.total_clientes_recebidos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                                        </Text>
                                    </View>
                                </View>

                                <Divider />

                                <View style={[styles.infoContainer, { marginTop: 20 }]}>
                                    <View >
                                        <Text style={styles.textContainer}>Contas à pagar no dia: </Text>
                                    </View>
                                    <View >
                                        <Text style={[styles.numberContainer, { fontSize: 19, color: '#E70303' }]}>
                                            {dbData && `R$ ${dbData.resultados.resultados_financeiros.contas_pagar_dia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoContainer}>
                                    <View >
                                        <Text style={styles.textContainer}>Total de contas pagas: </Text>
                                    </View>
                                    <View >
                                        <Text style={[styles.numberContainer, { fontSize: 19, color: '#E70303' }]}>
                                            {dbData && `R$ ${dbData.resultados.fluxo_caixa.total_contas_pagas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                                        </Text>
                                    </View>
                                </View>

                            </View>

                            <View style={{ alignContent: 'center', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>

                                <Button style={{ width: 100, marginLeft: 10 }} mode="contained" onPress={() => navigation.navigate("registro", {
                                    operacao: "Atualização",
                                    data: dbData,
                                    date: date.toISOString().split('T')[0]
                                })}>
                                    <Text style={{ fontSize: 9 }}>Atualizar</Text>
                                </Button>

                                {
                                    user && user.cargo === 'Diretor' ?

                                        <Button style={{ width: 100, marginLeft: 10 }} mode="contained" onPress={showDialog}>
                                            <Text style={{ fontSize: 9 }}>Deletar</Text>
                                        </Button>
                                        :
                                        <Button style={{ width: 100, marginLeft: 10 }} mode="contained" disabled onPress={showDialog}>
                                            <Text style={{ fontSize: 9 }}>Deletar</Text>
                                        </Button>

                                }

                                <Portal>
                                    <Dialog visible={visible} onDismiss={hideDialog}>
                                        <Dialog.Title>Deletar o registro</Dialog.Title>
                                        <Dialog.Content>
                                            <Paragraph>{`Você realmente deseja deletar o registro do dia ${formatedDate}`} </Paragraph>
                                        </Dialog.Content>
                                        <Dialog.Actions>
                                            <Button onPress={hideDialog}>Não</Button>
                                            <Button
                                                onPress={deleteRegister}>
                                                Sim
                                            </Button>
                                        </Dialog.Actions>
                                    </Dialog>
                                </Portal>

                            </View>
                        </View>

                }

            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataContainer: {
        marginTop: 40,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonStyle: {
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30
    },
    textStyle: {
        marginLeft: 30,
        color: '#0DB337',
        fontSize: 18,
        fontWeight: 'bold'
    },
    progressBarContainer: {
        marginLeft: 20,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginRight: 20,
        marginBottom: 30
    },
    informBox: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mainBoxContainer: {
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 10,
        marginBottom: 3,
        borderWidth: 1,
        borderColor: '#0DB337',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    infoContainer: {
        marginTop: 5,
        marginStart: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textContainer: {
        fontSize: 13,
    },
    numberContainer: {
        marginRight: 20,
        color: '#0DB337',
        fontSize: 25,
        fontWeight: 'bold'
    }
});
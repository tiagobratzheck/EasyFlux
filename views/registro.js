import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

import { Appbar, TextInput, Button, Checkbox, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import * as DataService from '../services/dataService/dataService';

import CurrencyInput from 'react-native-currency-input';

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

export default function Registro({ route, navigation }) {

    // Variável para selecionar o estado do usuário logado
    const user = useSelector(user => user);

    const { operacao, data, date } = route.params;

    const [message, setMessage] = useState();

    // Variáveis financeiras --
    const [faturamento, setFaturamento] = useState(0);
    const [saldoCaixa, setSaldoCaixa] = useState(0);
    const [clientesReceber, setClientesReceber] = useState(0);
    const [clientesRecebidos, setClientesRecebidos] = useState(0);
    const [contasPagar, setContasPagar] = useState(0);
    const [contasPagas, setContasPagas] = useState(0);


    useEffect(() => {
        if (operacao === 'Atualização') {
            setFaturamento(data.resultados.resultados_financeiros.faturamento_dia);
            setSaldoCaixa(data.resultados.fluxo_caixa.saldo_caixa)
            setClientesReceber(data.resultados.resultados_financeiros.clientes_receber_dia)
            setClientesRecebidos(data.resultados.fluxo_caixa.total_clientes_recebidos)
            setContasPagar(data.resultados.resultados_financeiros.contas_pagar_dia)
            setContasPagas(data.resultados.fluxo_caixa.total_contas_pagas)
        }
    }, [])

    const handleButton = () => {
        if (operacao === 'Cadastro') {
            cadastrar();
        } else {
            atualizar();
        }
    }

    const cadastrar = async () => {
        const data = {
            dateRegister : date,
            resultados: {
                demais_fluxos: {
                    outras_entradas: 0,
                    outras_saidas: 0
                },
                fluxo_caixa: {
                    saldo_caixa: saldoCaixa,
                    total_clientes_recebidos: clientesRecebidos,
                    total_contas_pagas: contasPagas
                },
                resultados_financeiros: {
                    clientes_receber_dia: clientesReceber,
                    contas_pagar_dia: contasPagar,
                    faturamento_dia: faturamento
                }
            }
        };
        const result = await DataService.saveRegister(date, data)
            .then(() => {
                setMessage("Dados cadastrados com sucesso!")
            }).catch(erro => {
                console.log(erro)
            })
    }

    const atualizar = async () => {
        const data = {
            dateRegister : date,
            resultados: {
                demais_fluxos: {
                    outras_entradas: 0,
                    outras_saidas: 0
                },
                fluxo_caixa: {
                    saldo_caixa: saldoCaixa,
                    total_clientes_recebidos: clientesRecebidos,
                    total_contas_pagas: contasPagas
                },
                resultados_financeiros: {
                    clientes_receber_dia: clientesReceber,
                    contas_pagar_dia: contasPagar,
                    faturamento_dia: faturamento
                }
            }
        };
        const result = await DataService.updateRegister(date, data)
            .then(() => {
                setMessage("Dados atualizados com sucesso!")
            }).catch(erro => {
                console.log(erro)
            })
    }

    const getAccess = () => {
        if (user !== undefined) {
            switch (user.cargo) {
                case 'Diretor':
                    return true;
                case 'Gestor':
                    return false;
                case 'Analista':
                    return false;
                default:
                    break
            }
        }
    }


    return (
        <PaperProvider theme={theme}>

            <Appbar.Header>
                <Appbar.Action icon="alpha-d-box-outline" onPress={() => { }} />
                <Appbar.Content style={{ marginLeft: 6 }} title="EasyFlux" subtitle={operacao} />
                <Appbar.Action icon="arrow-left-bold-box-outline" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../images/Easy_logo.png')}
                />

                {
                    typeof message === 'undefined' ?

                        <View>
                            <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 30, marginLeft: 25 }}>
                                <Text style={{ fontSize: 17 }}>{`Tela de ${operacao} para o dia: `}</Text>
                                <Text style={{ fontSize: 17 }}>{date}</Text>
                            </View>

                            <View style={styles.inputText}>
                                <Text style={styles.textStyles}>Faturamento:</Text>
                                <CurrencyInput
                                    value={faturamento}
                                    onChangeValue={setFaturamento}
                                    unit="R$"
                                    delimiter="."
                                    separator=","
                                    prefix='R$ '
                                    precision={2}
                                    onChangeText={() => { }}
                                    style={{ fontSize: 18 }}
                                    editable={getAccess()}
                                />
                            </View>

                            <View style={styles.inputText}>
                                <Text style={styles.textStyles}>Saldo de caixa:</Text>
                                <CurrencyInput
                                    value={saldoCaixa}
                                    onChangeValue={setSaldoCaixa}
                                    unit="R$"
                                    delimiter="."
                                    separator=","
                                    prefix='R$ '
                                    precision={2}
                                    onChangeText={() => { }}
                                    style={{ fontSize: 18 }}
                                    editable={getAccess()}
                                />
                            </View>

                            <View style={styles.inputText}>
                                <Text style={styles.textStyles}>Clientes à receber:</Text>
                                <CurrencyInput
                                    value={clientesReceber}
                                    onChangeValue={setClientesReceber}
                                    unit="R$"
                                    delimiter="."
                                    separator=","
                                    prefix='R$ '
                                    precision={2}
                                    onChangeText={() => { }}
                                    style={{ fontSize: 18 }}
                                    editable={getAccess()}
                                />
                            </View>

                            <View style={styles.inputText}>
                                <Text style={styles.textStyles}>Clientes recebidos:</Text>
                                <CurrencyInput
                                    value={clientesRecebidos}
                                    onChangeValue={setClientesRecebidos}
                                    unit="R$"
                                    delimiter="."
                                    separator=","
                                    prefix='R$ '
                                    precision={2}
                                    onChangeText={() => { }}
                                    style={{ fontSize: 18 }}
                                />
                            </View>

                            <View style={styles.inputText}>
                                <Text style={styles.textStyles}>Contas à pagar:</Text>
                                <CurrencyInput
                                    value={contasPagar}
                                    onChangeValue={setContasPagar}
                                    unit="R$"
                                    delimiter="."
                                    separator=","
                                    prefix='R$ '
                                    precision={2}
                                    onChangeText={() => { }}
                                    style={{ fontSize: 18 }}
                                    editable={getAccess()}
                                />
                            </View>

                            <View style={styles.inputText}>
                                <Text style={styles.textStyles}>Contas pagas:</Text>
                                <CurrencyInput
                                    value={contasPagas}
                                    onChangeValue={setContasPagas}
                                    unit="R$"
                                    delimiter="."
                                    separator=","
                                    prefix='R$ '
                                    precision={2}
                                    onChangeText={() => { }}
                                    style={{ fontSize: 18 }}
                                />
                            </View>

                            {faturamento == 0 || saldoCaixa == 0 || clientesReceber == 0 || contasPagar == 0 ?

                                <Button style={styles.button} mode="contained" disabled onPress={() => handleButton()}>
                                    <Text style={styles.textStyles}>{operacao}</Text>
                                </Button>

                                :

                                <Button style={styles.button} mode="contained" onPress={() => handleButton()}>
                                    <Text style={styles.textStyles}>{operacao}</Text>
                                </Button>

                            }

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
        borderWidth: 1,
        borderColor: '#0DB337',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    textStyles: {
        fontSize: 17
    },
    button: {
        width: 350,
        height: 45,
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 20

    }
})
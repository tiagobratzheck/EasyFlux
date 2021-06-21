import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Tools from '../tools/calculationTools';
import * as Styles from '../tools/styleTools';

import { DataTable } from 'react-native-paper';


export default function TableChart(props) {


    return (
        <View>
            <DataTable >
                <DataTable.Header >
                    <DataTable.Title style={styles.tableStyle}>
                        <Text style={styles.textHeaderTable}>{props.firstColumn}</Text>
                    </DataTable.Title>
                    <DataTable.Title style={styles.tableStyle}>
                        <Text style={styles.textHeaderTable}>{props.secondColumn}</Text>
                    </DataTable.Title>
                    <DataTable.Title style={styles.tableStyle}>
                        <Text style={styles.textHeaderTable}>{props.thirdColumn}</Text>
                    </DataTable.Title>
                    <DataTable.Title style={styles.tableStyle}>
                        <Text style={styles.textHeaderTable}>{props.forthColumn}</Text>
                    </DataTable.Title>
                </DataTable.Header>
                {props.tableData.map((item, index) => {
                    return (
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={styles.tableStyle}>{item.date}</DataTable.Cell>
                            <DataTable.Cell style={styles.tableStyle}>
                                {
                                    props.table === "contas" ?
                                        <Text style={{ fontSize: 12 }}>{`R$ ${item.apagar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
                                        :
                                        <Text style={{ fontSize: 12 }}>{`R$ ${item.areceber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
                                }
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.tableStyle}>
                                {
                                    props.table === "contas" ?
                                        <Text style={{ fontSize: 12 }}>{`R$ ${item.pagos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
                                        :
                                        <Text style={{ fontSize: 12 }}>{`R$ ${item.recebidos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
                                }
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.tableStyle}>
                                {
                                    props.table === "contas" ?
                                        <Text style={[Styles.getColorTablePicker(parseFloat(Tools.getContasPagas(item.pagos, item.apagar))), { fontWeight: 'bold', fontSize: 17 }]}>
                                            {`${Tools.getContasPagas(item.pagos, item.apagar)}%`}
                                        </Text>
                                        :
                                        <Text style={[Styles.getColorTablePicker(parseFloat(Tools.getContasPagas(item.recebidos, item.areceber))), { fontWeight: 'bold', fontSize: 17 }]}>
                                            {`${Tools.getContasPagas(item.recebidos, item.areceber)}%`}
                                        </Text>
                                }
                            </DataTable.Cell>
                        </DataTable.Row>
                    )
                })}
            </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    tableStyle: {
        justifyContent: 'space-evenly',
        alignContent: 'space-between',
    },
    textHeaderTable: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0DB337'
    }
})

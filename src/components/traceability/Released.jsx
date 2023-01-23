import React from 'react';
import Humanize from "humanize-plus";
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import {map} from "lodash";

const styles = StyleSheet.create({
    text1: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: "Times-Roman",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        width: "10%",
        fontWeight: "bold"
    }, view: {
        width: "100%", marginHorizontal: 50

    }, section: {
        display: "flex", flexDirection: "row"
    }
});
const Released = ({released}) => {
    return (<View style={styles.view}>
        <Text style={{fontSize: "10", fontFamily: "Times-Roman"}}>6) CONTROL DE LIBERACIÓN DE PRODUCTO TERMINADO</Text>
        <View style={{fontSize: "10", marginTop: 4}}>
            <View style={styles.section}>
                <Text style={styles.text1}>Fecha de liberación</Text>
                <Text style={styles.text1}>Lote</Text>
                <Text style={styles.text1}>Cantidad</Text>
                <Text style={styles.text1}>Kg por caja</Text>
                <Text style={styles.text1}>Fecha de vencimiento</Text>
                <Text style={styles.text1}>Lote cajas</Text>
                <Text style={styles.text1}>Lote bolsas</Text>
            </View>
            {map(released, data => {
                return (<View style={styles.section}>
                    <Text style={styles.text1}>{new Date(data?.release_date).toLocaleDateString('es-PE', {
                        timeZone: 'UTC',
                    })}</Text>
                    <Text style={styles.text1}>{data?.lot}</Text>
                    <Text style={styles.text1}>{Humanize.formatNumber(data?.quantity, 0)}</Text>
                    <Text style={styles.text1}>{Humanize.formatNumber(data?.kg, 2)}</Text>
                    <Text style={styles.text1}>{new Date(data?.expiration_date).toLocaleDateString('es-PE', {
                        timeZone: 'UTC',
                    })}</Text>
                    <Text style={styles.text1}>{data?.lot_boxes}</Text>
                    <Text style={styles.text1}>{data?.lot_bags}</Text>
                </View>)
            })}
        </View>
    </View>);

};

export default Released;


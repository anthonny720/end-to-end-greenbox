import React from 'react';
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
        width: "17%",
        fontWeight: "bold",
        alignItems: "center"
    }, view: {
        width: "100%", marginHorizontal: 50, marginVertical: 10

    }, section: {
        display: "flex", flexDirection: "row"
    }
});
const COMEX = ({comex}) => {
    return (<View style={styles.view}>
        <Text style={{fontSize: "10", fontFamily: "Times-Roman"}}>8) DATOS RELACIONADO CON DESPACHO COMERCIAL</Text>
        <View style={{fontSize: "10", marginTop: 4}}>
            <View style={styles.section}>
                <Text style={styles.text1}>FCL</Text>
                <Text style={styles.text1}>Programa de despacho</Text>
                <Text style={styles.text1}>Destino</Text>
                <Text style={styles.text1}>Orden de pedido</Text>
                <Text style={styles.text1}>Guia de remisión</Text>
            </View>
            {map(comex, data => {
                return (<View style={styles.section}>date

                    <Text style={styles.text1}>{data?.reception_short_name}</Text>

                    <Text style={styles.text1}>{new Date(data?.date).toLocaleDateString('es-PE', {
                        timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                    })}</Text>
                    <Text style={styles.text1}>{data?.destine}</Text>

                    <Text style={styles.text1}>{data?.order}</Text>
                    <Text style={styles.text1}>{data?.guide} </Text>

                </View>)
            })}
        </View>
    </View>);

};

export default COMEX;


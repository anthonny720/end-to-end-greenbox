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
        width: "15%",
        fontWeight: "bold",
        alignItems: "center"
    }, text2: {
        fontSize: 10,
        textAlign: "center",
        fontFamily: "Times-Roman",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        width: "30%",
        fontWeight: "bold",
        alignItems: "center"
    }, view: {
        width: "100%", marginHorizontal: 50, marginVertical: 10

    }, section: {
        display: "flex", flexDirection: "row"
    }
});
const Packing = ({packing}) => {
    return (<View style={styles.view}>
        <Text style={{fontSize: "10", fontFamily: "Times-Roman"}}>7) DATOS RELACIONADO CON ENVASES/EMBALAJES</Text>
        <View style={{fontSize: "10", marginTop: 4}}>
            <View style={styles.section}>
                <Text style={styles.text1}>Fecha de ingreso</Text>
                <Text style={styles.text1}>Lote</Text>
                <Text style={styles.text2}>Descripción</Text>
                <Text style={styles.text1}>Proveedor</Text>
            </View>
            {map(packing, data => {
                return (<View style={styles.section}>
                    <Text style={styles.text1}>{new Date(data?.entry_date).toLocaleDateString('es-PE', {
                        timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                    })}</Text>
                    <Text style={styles.text1}>{data?.lot}</Text>

                    <Text style={styles.text2}>{data?.description}</Text>
                    <Text style={styles.text1}>{data?.provider_name} - {data?.provider_ruc}</Text>

                </View>)
            })}
        </View>
    </View>);

};

export default Packing;


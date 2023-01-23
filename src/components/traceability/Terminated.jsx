import React from 'react';
import Humanize from "humanize-plus";
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import {map} from "lodash";

const styles = StyleSheet.create({
    text1: {
        fontSize: 9,
        textAlign: "center",
        fontFamily: "Times-Roman",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        width: "9%",
        fontWeight: "bold"
    }, view: {
        width: "100%", marginHorizontal: 50

    }, section: {
        display: "flex", flexDirection: "row"
    }, text2: {
        fontSize: 8,
        textAlign: "center",
        fontFamily: "Times-Roman",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        width: "6.5%",
        fontWeight: "bold"
    },
});
const Terminated = ({terminated}) => {
    return (<View style={styles.view}>
        <Text style={{fontSize: "10", fontFamily: "Times-Roman"}}>5) CONTROL DE ENVASADO</Text>
        <View style={{fontSize: "10", marginTop: 4}}>
            <View style={styles.section}>
                <Text style={styles.text1}>Fecha de envasado</Text>
                <Text style={styles.text1}>Lote</Text>
                <Text style={styles.text2}>Brix</Text>
                <Text style={styles.text2}>pH</Text>
                <Text style={styles.text2}>Humedad</Text>
                <Text style={styles.text2}>Aroma</Text>
                <Text style={styles.text2}>Color</Text>
                <Text style={styles.text2}>Sabor</Text>
                <Text style={styles.text2}>Textura</Text>
                <Text style={styles.text2}>Espesor</Text>
                <Text style={styles.text2}>Defectos</Text>
            </View>
            {map(terminated, data => {
                return (<View style={styles.section}>
                    <Text style={styles.text1}>{new Date(data?.packing_date).toLocaleDateString('es-PE', {
                        timeZone: 'UTC',
                    })}</Text>
                    <Text style={styles.text1}>{data?.lot}</Text>
                    <Text style={styles.text2}>{Humanize.formatNumber(data?.brix_pt, 2)}</Text>
                    <Text style={styles.text2}>{Humanize.formatNumber(data?.ph_pt, 2)}</Text>
                    <Text style={styles.text2}>{Humanize.formatNumber(data?.humidity, 2)}</Text>
                    <Text style={styles.text2}>{Humanize.formatNumber(data?.aroma, 0)}</Text>
                    <Text style={styles.text2}>{Humanize.formatNumber(data?.color, 0)}</Text>
                    <Text style={styles.text2}>{Humanize.formatNumber(data?.flavor, 0)}</Text>
                    <Text style={styles.text2}>{Humanize.formatNumber(data?.texture, 0)}</Text>
                    <Text style={styles.text2}>{Humanize.formatNumber(data?.width_pt, 2)}</Text>
                    <Text style={styles.text2}>{Humanize.formatNumber(data?.defects, 2)}</Text>
                </View>)
            })}
        </View>
        <Text style={{fontSize: 10, fontFamily: "Times-Roman",marginTop:4}}>Observaciones</Text>
        <Text style={{fontSize: 10, fontFamily: "Times-Roman",}}>
            __________________________________________________________________________________________________
            __________________________________________________________________________________________________
            __________________________________________________________________________________________________
            __________________________________________________________________________________________________
            __________________________________________________________________________________________________
            __________________________________________________________________________________________________
            __________________________________________________________________________________________________


        </Text>
    </View>);

};

export default Terminated;

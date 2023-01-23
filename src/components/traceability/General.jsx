import React from 'react';
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import Humanize from "humanize-plus";

const styles = StyleSheet.create({
    text1: {
        fontSize: 10,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        minWidth: "30%",
        fontWeight: "bold"
    }, text2: {
        fontSize: 8,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        borderWidth: "1px",
        borderLeftWidth: "0px",
        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        minWidth: "80%",
        fontWeight: "bold",

    }, view: {
        width: "80%", marginHorizontal: 50

    }, section: {
        display: "flex", flexDirection: "row"
    },
    text_info: {
        fontSize: 8,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        backgroundColor: "rgba(0,0,0,0.05)",
        color:"black",
        marginHorizontal:6,
        marginVertical:3,
        padding: "3px",
        width: "auto",
        fontWeight: "bold",
        borderRadius:"50%"


    }


});

const General = ({acopio, report_mp}) => {
    return (

        <View style={styles.view}>
            <Text style={{fontSize: "10", fontFamily: "Times-Roman"}}>1) DATOS RELACIONADOS CON LA
                FRUTA</Text>
            <View style={{fontSize: "10", marginTop: 4}}>
                <View style={styles.section}>
                    <Text style={styles.text1}>Lote
                        ingresado de materia prima</Text>
                    <Text style={styles.text2}>{acopio?.lot}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Categoría</Text>
                    <Text style={styles.text2}>{acopio?.category_name} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Fecha del punto de partida</Text>
                    <Text style={styles.text2}>{new Date(acopio?.starting_point_date).toLocaleDateString('es-PE', {
                        timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                    })} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Fecha de ingreso</Text>
                    <Text style={styles.text2}>{new Date(acopio?.entryDate).toLocaleDateString('es-PE', {
                        timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                    })} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Fecha de descarga</Text>
                    <Text style={styles.text2}>{new Date(acopio?.downloadDate).toLocaleDateString('es-PE', {
                        timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                    })} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Proveedor</Text>
                    <Text style={styles.text2}>{acopio?.provider_name} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Procedencia</Text>
                    <Text style={styles.text2}>{acopio?.origin} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Variedad/Condición</Text>
                    <Text style={styles.text2}>{acopio?.variety} - {acopio?.condition} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Guía de remisión</Text>
                    <Text style={styles.text2}>{acopio?.providerGuide} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Guía de transporte</Text>
                    <Text style={styles.text2}>{acopio?.invoice_code} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Guía de transporte</Text>
                    <Text style={styles.text2}>{acopio?.carrierGuide} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Factura</Text>
                    <Text style={styles.text2}>{acopio?.invoice_code}  </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Parcela</Text>
                    <Text style={styles.text2}>{acopio?.parcel} </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text1}>Transporte</Text>
                    <Text style={styles.text2}> {report_mp?.driver} - {report_mp?.carrier} - {report_mp?.code}</Text>
                </View>
            </View>
            <View style={{display: "flex", flexWrap: "wrap", width: "100%", flexDirection: "row",justifyContent:"center"}}>
                <Text style={styles.text_info}>•Cantidad de jabas: {report_mp?.number_boxes} und</Text>
                <Text style={styles.text_info}>•Peso guía: {Humanize.formatNumber(report_mp?.weight_guide, 2)} kg</Text>
                <Text style={styles.text_info}>•Peso
                    bruto: {Humanize.formatNumber(report_mp?.brute_weight, 2)} kg</Text>
                <Text style={styles.text_info}>•Peso neto: {Humanize.formatNumber(report_mp?.net_weight, 2)} kg</Text>
                <Text
                    style={styles.text_info}>•Descuento: {Humanize.formatNumber(report_mp?.discount_percentage, 2)} %</Text>
                <Text style={styles.text_info}>•Peso
                    aprovechable: {Humanize.formatNumber(report_mp?.kg_usable, 2)} kg</Text>
                <Text style={styles.text_info}>•Total a pagar:
                    S/{Humanize.formatNumber(report_mp?.total_amount, 2)}</Text>
            </View>
            <Text style={{fontSize:10,fontFamily: "Times-Roman",}}>Observaciones</Text>
            <Text style={{fontSize:10,fontFamily: "Times-Roman",}}>
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________
                __________________________________________________________________________________________________


            </Text>

        </View>

    );
};

export default General;

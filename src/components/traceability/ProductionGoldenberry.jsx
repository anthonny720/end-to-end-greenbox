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
        fontWeight: "ultrabold"
    }, text2: {
        fontSize: 10,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        borderWidth: "1px",
        borderLeftWidth: "0px",
        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        minWidth: "25%",
        fontWeight: "bold",
        marginRight:2

    }, view: {
        width: "100%", marginHorizontal: 50

    }, section: {
        display: "flex", flexDirection: "row"
    },
});
const ProductionGoldenberry = ({production}) => {
   return (<View style={{fontSize: "10", marginTop: 4,display:"flex",flexDirection:"row"}}>
        <View>
            <View style={styles.section}>
                <Text style={styles.text1}>Fecha de Proceso</Text>

                <Text style={styles.text2}>{new Date(production?.date_process).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                })}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Kg procesados</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.kg_processed, 2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>% Deshidratación</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.dehydrated, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Kg descarte</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.kg_discarded, 2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Kg cáliz</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.caliz, 2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Kg merma</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.merma, 2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Kg habilitados</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.kg_enabled, 2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Rendimiento</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.performance_net, 2)} %</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Kg PT</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.kg_pt, 2)} kg</Text>
            </View>
        </View>
        <View>
            <View style={styles.section}>
                <Text style={styles.text1}>Corte/Presentación</Text>
                <Text style={styles.text2}>Retail</Text>
                <Text style={styles.text2}>Granel</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Enteros</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.retail_whole,2)} kg</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.granel_whole,2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Mitades</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.retail_halves,2)} kg</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.granel_halves,2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Cuartos</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.retail_quarter,2)} kg</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.granel_quarter,2)} kg</Text>
            </View>
        </View>
    </View>)
};

export default ProductionGoldenberry;

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
        minWidth: "40%",
        fontWeight: "bold",
        marginRight: 2
    }
    , view: {
        width: "100%", marginHorizontal: 50

    }, section: {
        display: "flex", flexDirection: "row"
    },
    text3: {
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
    },
     text4: {
        fontSize: 10,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        borderWidth: "1px",

        borderStyle: "solid",
        borderColor: "black",
        padding: "3px",
        minWidth: "50%",
        fontWeight: "bold",
    }
});

const ProductionMango = ({production}) => {
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
                <Text style={styles.text1}>Kg cáscara y pepa</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.shell, 2)} kg</Text>
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
                <Text style={styles.text2}>{Humanize.formatNumber(production?.performance_net, 2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Kg PT</Text>
                <Text style={styles.text2}>{Humanize.formatNumber(production?.kg_pt, 2)} kg</Text>
            </View>
        </View>
        <View>
            <View style={styles.section}>
                <Text style={styles.text1}>Corte/Presentación</Text>
                <Text style={styles.text3}>Retail</Text>
                <Text style={styles.text3}>Granel</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Slices</Text>
                <Text style={styles.text3}>{Humanize.formatNumber(production?.retail_slices,2)} kg</Text>
                <Text style={styles.text3}>{Humanize.formatNumber(production?.granel_slices,2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Cachetes</Text>
                <Text style={styles.text3}>{Humanize.formatNumber(production?.retail_cachetes,2)} kg</Text>
                <Text style={styles.text3}>{Humanize.formatNumber(production?.granel_cachetes,2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Chunks</Text>
                <Text style={styles.text3}>{Humanize.formatNumber(production?.retail_chunks,2)} kg</Text>
                <Text style={styles.text3}>{Humanize.formatNumber(production?.granel_chunks,2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text1}>Cubos</Text>
                <Text style={styles.text3}>{Humanize.formatNumber(production?.retail_cubs,2)} kg</Text>
                <Text style={styles.text3}>{Humanize.formatNumber(production?.granel_cubs,2)} kg</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text4}>Recuperable</Text>
                <Text style={styles.text4}>{Humanize.formatNumber(production?.recoverable,2)} kg</Text>
            </View>
        </View>
    </View>);
};

export default ProductionMango;

import React from 'react';
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import AnalysisMango from "./AnalysisMango";
import AnalysisGoldenberry from "./AnalysisGoldenberry";
import AnalysisBlueberry from "./AnalysisBlueberry";
import AnalysisPineapple from "./AnalysisPineapple";
import AnalysisBanano from "../../containers/pages/AnalysisBanano";

const styles = StyleSheet.create({
    view: {
        width: "80%", marginHorizontal: 50, marginVertical: 20
    }
});
const Analysis = ({analysis, category}) => {
    return (<View style={styles.view}>
        <Text style={{fontSize: "10", fontFamily: "Times-Roman"}}>3) DATOS RELACIONADOS CON EL ANÁLISIS</Text>
        {category && category !== null && category === 'Mango' && <AnalysisMango analysis={analysis}/>}
        {category && category !== null && category === 'Piña' && <AnalysisPineapple analysis={analysis}/>}
        {category && category !== null && category === 'Aguaymanto' && <AnalysisGoldenberry analysis={analysis}/>}
        {category && category !== null && category === 'Arándanos' && <AnalysisBlueberry analysis={analysis}/>}
        {category && category !== null && category === 'Banano' && <AnalysisBanano analysis={analysis}/>}
        {category && category !== null && category === 'Fresa' &&
            <Text style={{fontSize: 10, textAlign: "center"}}>No existen registros</Text>}
    </View>);
};

export default Analysis;

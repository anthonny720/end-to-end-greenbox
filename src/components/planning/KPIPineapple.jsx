import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";
import Humanize from "humanize-plus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {CustomTd} from "../../helpers/util";

const KPIPineapple = ({data, week, update}) => {
    const summary = useSelector(state => state.Planning.summary_pineapple)
    const columns = ['', 'Fecha', 'Semana', 'LOTES', 'PY DE INGRESO', 'REAL INGRESO', '% CUMPLIMIENTO', 'OBJETIVO', 'CALIBRE 6', 'CALIBRE 8 10 12', 'CALIBRE 14', 'MAD. 0', 'MAD. 1', 'MAD. 2-3', 'MAD. >= 4', 'KG DE CORONA', 'KG DE MP BRUTO', '% CUMPLIMIENTO', 'OBJETIVO', 'PRECIO', 'OBJETIVO', 'ORGÁNICO', 'CONVENCIONAL', 'STOCK'];
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <table ref={tableRef} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <CustomTd><FontAwesomeIcon icon={faEdit}
                                           onClick={() => {
                                               update(row)
                                           }}
                                           className={"text-blue-400 cursor-pointer"}/></CustomTd>

                <CustomTd><p
                    className={"text-center text-xs"}>{new Date(row?.date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC',
                })}</p></CustomTd>

                <CustomTd>{row?.week}</CustomTd>
                <CustomTd>{map(row?.lots, (lot, index) => (<p key={index} className={"text-xs"}><span
                    className={"font-bold text-xs"}>{lot?.lot}</span> {Humanize.formatNumber(lot?.get_total_net_weight, 2)} kg
                </p>))}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.entry, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.entry_real, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.compliance_entry, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.entry_objective, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.caliber_6, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.caliber_8_10_12, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.caliber_14, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.maduration_0, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.maduration_1, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.maduration_2_3, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.maduration_4_5, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.discard, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.kg_brute, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.compliance_production, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.objective, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.price, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.price_objective, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.condition?.organic, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.condition?.convencional, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.stock, 2)}</CustomTd>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={7}/></th>))}
            </tr>}
            <tr className={"font-bold text-black"}>
                <CustomTd></CustomTd>
                <CustomTd>Acumulado {week && week}</CustomTd>
                <CustomTd></CustomTd>
                <CustomTd></CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_entry, 2) : <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_real_entry, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_compliance_entry, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_entry, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_c6, 2) : <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_c8_10_12, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_c14, 2) : <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_maduration_0, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_maduration_1, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_maduration_2_3, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_maduration_4_5, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_discard, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_kg_brute, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_compliance_production, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_production, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_price, 2) : <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_price, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_organic, 2) :
                    <Skeleton count={1}/>}</CustomTd>

                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_convencional, 2) :
                    <Skeleton count={1}/>}</CustomTd>
            </tr>


            </tbody>
        </table>
    </div>);
};
export default KPIPineapple;
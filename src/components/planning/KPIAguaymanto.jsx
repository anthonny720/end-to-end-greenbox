import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";
import Humanize from "humanize-plus";
import {CustomTd} from "../../helpers/util";
import {useDispatch, useSelector} from "react-redux";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {setAlert} from "../../redux/actions/alert";

const KPIAguaymanto = ({data, week, update}) => {
    const summary = useSelector(state => state.Planning.summary_aguaymanto)
    const user = useSelector(state => state.Auth.user);
    const dispatch = useDispatch();

    const columns = ['', 'Fecha', 'Semana', 'LOTES', 'PY DE INGRESO', 'REAL INGRESO', '% CUMPLIMIENTO', 'OBJETIVO', 'MAD. 1', 'MAD. 2', 'MAD.3', 'HONGOS Y FERMENTADO', 'VERDE', 'APLASTADO', 'RAJADO', 'KG CALIZ', 'KG DESCARTE', 'KG DE MP BRUTO', '% CUMPLIMIENTO', 'OBJETIVO', '% DESCARTE', 'OBJETIVO', 'PRECIO', 'OBJETIVO', 'STOCK'];

    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="KPI Aguaymanto"
            sheet="KPI Aguaymanto"
            currentTableRef={tableRef.current}
        >
            <button
                className=" border-0 text-lg h-12 w-36 bg-green-400 hover:bg-green-500 text-white mt-2 px-3 rounded-md">
                <span>Descargar</span>
                <FontAwesomeIcon icon={faFileExcel} className={"ml-2"}/>
            </button>

        </DownloadTableExcel>
        <table ref={tableRef} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <CustomTd><FontAwesomeIcon icon={faEdit} onClick={() => {
                    user && user !== undefined && user !== null && user.get_role_name === 'Operaciones' ? update(row) : dispatch(setAlert('No tienes permisos para editar', 'warning'))
                }}
                                           className={"text-blue-400 cursor-pointer"}/></CustomTd>

                <CustomTd className="py-4 px-6 whitespace-nowrap text-center"><p
                    className={"text-center text-xs"}>{new Date(row?.date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC',
                })}</p></CustomTd>

                <CustomTd>{row?.week}</CustomTd>
                <CustomTd>{map(row?.lots, (lot, index) => (<p key={index} className={"text-xs"}><span
                    className={"font-bold text-xs"}>{lot?.lot}</span> {Humanize.formatNumber(lot?.get_total_net_weight, 2)} kg
                </p>))}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.entry, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.entry_real, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.compliance_entry, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.entry_objective, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.maduration_1, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.maduration_2, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.maduration_3, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.mushroom, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.green, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.crushed, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.cracked, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.caliz, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.discard, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.kg_brute, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.compliance_production, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.objective, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.discard_percentage, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.discard_objective, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.price, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.price_objective, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.stock, 2)}</CustomTd>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={20}/></th>))}
            </tr>}

            <tr className={"font-bold text-black"}>
                <CustomTd></CustomTd>
                <CustomTd>Acumulado {week && week}</CustomTd>
                <CustomTd></CustomTd>
                <CustomTd></CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_entry, 2) : <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_real_entry, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_compliance_entry, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_entry, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_maduration_1, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_maduration_2, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_maduration_3, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_mushroom, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_green, 2) : <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_crushed, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_cracked, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_caliz, 2) : <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_discard, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_kg_brute, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_compliance_production, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_production, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_discard_percentage, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_discard, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_price, 2) : <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_price, 2) :
                    <Skeleton count={1}/>}</CustomTd>
            </tr>


            </tbody>
        </table>
    </div>);
};
export default KPIAguaymanto;
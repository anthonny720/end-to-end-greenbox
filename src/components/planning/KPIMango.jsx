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

const KPIMango = ({data, week, update}) => {
    const user = useSelector(state => state.Auth.user);
    const dispatch = useDispatch();
    const columns = ['', 'Fecha', 'Semana', 'Lotes', 'PY DE INGRESO', 'REAL INGRESO', '% CUMPLIMIENTO', 'OBJETIVO', '<280G', '280-300G', '>300G', 'COLOR 1', 'COLOR 1.5-2.5 ', 'COLOR >=3', 'MECÁNICO', 'FISICO', 'PLAGAS Y ENFERMEDADES', 'OTROS', '% DEFECTOS', 'DESCARTE', 'KG DE MP BRUTO', '% CUMPLIMIENTO', 'OBJETIVO', 'PRECIO', 'OBJETIVO', 'KENT', 'EDWARD', 'HADEN', 'OTROS', 'STOCK'];
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto w-full relative scrollbar-hide">
        <DownloadTableExcel
            filename="KPI Mango"
            sheet="KPI Mango"
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
                <CustomTd><FontAwesomeIcon icon={faEdit}
                                           onClick={() => {
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
                <CustomTd>{Humanize.formatNumber(row?.info?.wt_280, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.wt_280_300, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.wt_300, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.color_1, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.color_1_5_2_5, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.color_3, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.mechanical_damage, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.physical_damage, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.plagues, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.others, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.info?.total, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.discard, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.kg_brute, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.compliance_production, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.objective, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.price, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.price_objective, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.variety?.kent, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.variety?.edward, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.variety?.haden, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.variety?.others, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.stock, 2)}</CustomTd>


            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={20}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>);
};
export default KPIMango;
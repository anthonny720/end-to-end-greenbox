import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React, {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {CustomTd} from "../../helpers/util";
import Humanize from "humanize-plus";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {setAlert} from "../../redux/actions/alert";

const KPIMaintenance = ({data, week, update}) => {
    const summary = useSelector(state => state.Planning.summary_maintenance)
    const dispatch = useDispatch();
    const user = useSelector(state => state.Auth.user);


    const columns = ['', 'Fecha', 'Semana', 'GLP', 'KG DE PRODUCTO TERMINADO', 'CONSUMO DE GLP', 'OBJETIVO GLP', 'Kg ejecutados', 'Capacidad de Picadora', 'Eficiencia de Máquina Picadora', 'OBJETIVO PICADORA', 'Ejecutadas', 'Planificadas', '% CUMPLIMIENTO', 'OBJETIVO DE ORDENES', 'OT CORRECTIVOS', '% Correctivo', 'OBJETIVO CORREC.', 'OT PREVENTIVO', '% Preventivo', 'OBJETIVO PREVE.', 'KG Producto defectuoso', 'KG Cantidad lanzada', 'Eficiencia de Maquina PND', 'OBJETIVO PND']
    const tableRef = useRef(null);
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <DownloadTableExcel
            filename="KPI Mantenimiento"
            sheet="KPI Mantenimiento"
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
                <th colSpan={3}></th>
                <th className={"text-center bg-green-300 text-white px-2 py-2 "} colSpan={4}>CONSUMO DE GLP</th>
                <th className={"text-center bg-orange-300 text-white px-2 py-2 "} colSpan={4}>EFICIENCIA DE LA MAQUINA
                    PICADORA
                </th>
                <th className={"text-center bg-blue-500 text-white  px-2 py-2 "} colSpan={4}>TAREAS PLANIFICADAS EN
                    SEMANA
                </th>
                <th className={"text-center bg-blue-400 text-white  px-2 py-2 "} colSpan={3}>N° DE TRABAJOS CORRECTIVO
                    EJECUTADOS
                </th>
                <th className={"text-center bg-blue-300 text-white  px-2 py-2 "} colSpan={3}>N° DE TRABAJOS CORRECTIVO
                    EJECUTADOS
                </th>
                <th className={"text-center bg-red-300 text-white  px-2 py-2 "} colSpan={4}>EFICIENCIA DE LA MAQUINA
                    PND
                </th>
            </tr>
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<tr key={index} className="bg-white border-b">
                <CustomTd><FontAwesomeIcon icon={faEdit}
                                           onClick={() => {
                                               user && user !== undefined && user !== null && user.get_role_name === 'Operaciones' || user.get_role_name === "Mantenimiento" ? update(row) : dispatch(setAlert('No tienes permisos para editar', 'warning'))
                                           }}
                                           className={"text-blue-400 cursor-pointer"}/></CustomTd>

                <CustomTd><p
                    className={"text-center text-xs"}>{new Date(row?.date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC',
                })}</p></CustomTd>
                <CustomTd>{row?.week}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.consumption, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.kg_terminated, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.consumption_real, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.objective_glp, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.kg_executed, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.ability, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.efficiency_machine, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.objective_machine, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.work_executed, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.works_scheduled, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.compliance_works, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.objective_works, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.work_corrective, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.compliance_corrective, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.objective_corrective, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.work_preventive, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.compliance_preventive, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.objective_preventive, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.kg_defective, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.kg_released, 2)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.efficiency_pnd, 0)}</CustomTd>
                <CustomTd>{Humanize.formatNumber(row?.objective_pnd, 0)}</CustomTd>
            </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={7}/></th>))}
            </tr>}
            <tr className={"font-bold text-black"}>
                <CustomTd></CustomTd>
                <CustomTd>Acumulado {week && week}</CustomTd>
                <CustomTd></CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_consumption, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_kg_terminated, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_consumption_real, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_glp, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_kg_executed, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_ability, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_efficiency_machine, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_machine, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_works_executed, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_works_scheduled, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_compliance_works, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_works, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_work_corrective, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_compliance_corrective, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_corrective, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_work_preventive, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_compliance_preventive, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_preventive, 0) :
                    <Skeleton count={1}/>}</CustomTd>

                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_kg_defective, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_kg_released, 2) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_compliance_pnd, 0) :
                    <Skeleton count={1}/>}</CustomTd>
                <CustomTd>{summary ? Humanize.formatNumber(summary?.total_objective_pnd, 0) :
                    <Skeleton count={1}/>}</CustomTd>
            </tr>


            </tbody>
        </table>
    </div>);
};
export default KPIMaintenance;
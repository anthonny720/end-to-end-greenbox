import React from 'react';
import {map, size} from "lodash";
import {CustomTd} from "../../helpers/util";
import Skeleton from "react-loading-skeleton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";

const TableCosts = ({data,viewer}) => {
    const columns = ['', 'Fecha', 'Materia prima', 'Kg procesados', 'Kg de producto terminado', 'Rendimiento', 'Costo producción', 'Costo unitario'];
    return (<div className="overflow-x-auto w-full relative scrollbar-hide ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(columns, (column, index) => (<th key={index} className="px-6 py-3 text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>
            {data !== null && size(data) > 0 ? map(data, (row, index) => (<>

                    <tr key={index} className="bg-white border-b">
                        <CustomTd><FontAwesomeIcon icon={faFile} onClick={()=>{viewer()}}
                                                   className={"text-blue-400 cursor-pointer"}/></CustomTd>
                        <CustomTd><p
                            className={"text-center text-xs"}>{new Date().toLocaleDateString('es-PE', {
                            timeZone: 'UTC',
                        })}</p></CustomTd>
                        <CustomTd>Mango</CustomTd>
                        <CustomTd>24,601.30</CustomTd>
                        <CustomTd>2,543.00 kg</CustomTd>
                        <CustomTd>10.52 %</CustomTd>
                        <CustomTd>14.33</CustomTd>
                        <CustomTd>0.56</CustomTd>

                    </tr>
                    <tr key={index} className="bg-white border-b">
                        <CustomTd><FontAwesomeIcon icon={faFile}
                                                   className={"text-blue-400 cursor-pointer"}/></CustomTd>
                        <CustomTd><p
                            className={"text-center text-xs"}>{new Date(2023,1,19).toLocaleDateString('es-PE', {
                            timeZone: 'UTC',
                        })}</p></CustomTd>
                        <CustomTd>Mango</CustomTd>
                        <CustomTd>20,101.40</CustomTd>
                        <CustomTd>2,043.00 kg</CustomTd>
                        <CustomTd>10.55 %</CustomTd>
                        <CustomTd>13.23</CustomTd>
                        <CustomTd>0.52</CustomTd>

                    </tr>
                </>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton count={7}/></th>))}
            </tr>}


            </tbody>
        </table>
    </div>)

};

export default TableCosts;

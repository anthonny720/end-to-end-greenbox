import React from 'react';

const BoxesBags = ({}) => {

    return (<div>
        <p className='font-semibold text-md font-sans my-3 w-full '>6) DATOS RELACIONADOS CON LA LIBERACIÓN Y EMPAQUES
            PRIMARIOS-SECUNDARIOS</p>
        <div className={"grid grid-cols-2 gap-2"}>

            <table className="bg-white w-full">
                <thead className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className={"border-1 border border-black"}>
                    {/*<th className="px-6 py-3 text-center border-1 border border-black">FECHA DE LIBERACION</th>*/}
                    {/*<th className="px-6 py-3 text-center border-1 border border-black">FECHA DE VENCIMIENTO</th>*/}
                    {/*<th className="px-6 py-3 text-center border-1 border border-black">LOTE</th>*/}
                    {/*<th className="px-6 py-3 text-center border-1 border border-black">CANTIDAD</th>*/}
                    {/*<th className="px-6 py-3 text-center border-1 border border-black">KG POR CAJA</th>*/}
                    <th className="px-6 py-3 text-center border-1 border border-black">PROVEEDOR CAJAS</th>
                    <th className="px-6 py-3 text-center border-1 border border-black">LOTE CAJAS</th>
                    <th className="px-6 py-3 text-center border-1 border border-black">PROVEEDOR BOLSAS</th>
                    <th className="px-6 py-3 text-center border-1 border border-black">LOTE BOLSAS</th>
                </tr>
                </thead>
                <tr>
                    {/*<td className="font-bold border-black border px-2 py-1 text-center">{new Date().toLocaleDateString()}</td>*/}
                    {/*<td className="font-bold border-black border px-2 py-1 text-center">{new Date().toLocaleDateString()}</td>*/}
                    {/*<td className="font-bold border-black border px-2 py-1 text-center">{"--------"}</td>*/}
                    {/*<td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0, 2)}</td>*/}
                    {/*<td className="font-bold border-black border px-2 py-1 text-center">{Humanize.formatNumber(0, 2)}</td>*/}
                    <td className="font-bold border-black border px-2 py-1 text-center">{"\tTRUPAL S.A."}</td>
                    <td className="font-bold border-black border px-2 py-1 text-center">{"5710509455"}</td>
                    <td className="font-bold border-black border px-2 py-1 text-center">{"PACKPLAST S.A.C."}</td>
                    <td className="font-bold border-black border px-2 py-1 text-center">{"94504-1"}</td>
                </tr>
            </table>
        </div>

    </div>);

};

export default BoxesBags;

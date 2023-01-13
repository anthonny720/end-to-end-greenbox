import React from 'react';
import Humanize from "humanize-plus";

const Production = ({production}) => {
    return (<div>
        <p className='font-semibold text-md font-sans my-3 w-full '>2) PRODUCCIÓN GENERAL</p>

        <div className={"grid grid-cols-2 gap-2"}>
            <table className="bg-white ">
                <tbody>
                <tr>
                    <td className="font-bold border border-black px-2 py-1">Fecha de proceso:
                    </td>
                    <td className="font-semibold  text-center border border-black px-2 py-1">
                        {new Date(production?.date_process).toLocaleDateString('es-PE', {
                            timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
                        })}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 py-1">Kg procesados</td>
                    <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(production?.kg_processed, 2)}</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 py-1">% Deshidratación</td>
                    <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(production?.dehydrated, 2)} %</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 py-1">Kg descarte</td>
                    <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(production?.kg_discarded, 2)} kg</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 py-1">Kg neto</td>
                    <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(production?.net_weight, 2)} kg</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 py-1">Kg cáscara y pepa</td>
                    <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(production?.shell, 2)} kg</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 py-1">Kg merma</td>
                    <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(production?.merma, 2)} kg</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 py-1">Kg habilitados</td>
                    <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(production?.kg_enabled, 2)} kg</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 py-1">Kg producto terminado</td>
                    <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(production?.kg_pt, 2)} kg</td>
                </tr>
                </tbody>
            </table>
            <table className="bg-white ">
                <thead className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr className={"border-2 border-black"}>
                    <th className="px-6 py-3 text-center border border-black font-bold">Corte/Presentación</th>
                    <th className="px-6 py-3 text-center border border-black font-bold">Retail</th>
                    <th className="px-6 py-3 text-center border border-black font-bold">Granel</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="font-bold border border-black px-2 ">Slices</td>
                    <td className="font-semibold  text-center border border-black px-8 ">{Humanize.formatNumber(production?.retail_slices, 2)}</td>
                    <td className="font-semibold  text-center border border-black px-8 ">{Humanize.formatNumber(production?.granel_slices, 2)}</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 ">Cachetes</td>
                    <td className="font-semibold  text-center border border-black px-8 ">{Humanize.formatNumber(production?.retail_cachetes, 2)} kg</td>
                    <td className="font-semibold  text-center border border-black px-8 ">{Humanize.formatNumber(production?.granel_cachetes, 2)} kg</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 ">Chunks</td>
                    <td className="font-semibold  text-center border border-black px-8 ">{Humanize.formatNumber(production?.retail_chunks, 2)} kg</td>
                    <td className="font-semibold  text-center border border-black px-8 ">{Humanize.formatNumber(production?.granel_chunks, 2)} kg</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 ">Cubos</td>
                    <td className="font-semibold  text-center border border-black px-8 ">{Humanize.formatNumber(production?.retail_cubs, 2)} kg</td>
                    <td className="font-semibold  text-center border border-black px-8 ">{Humanize.formatNumber(production?.granel_cubs, 2)} kg</td>
                </tr>
                <tr>
                    <td className="font-bold border border-black px-2 ">Recuperable</td>
                    <td className="font-semibold  text-center border border-black px-8 "
                        colSpan={2}>{Humanize.formatNumber(production?.recoverable, 2)} kg
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>);
};

export default Production;

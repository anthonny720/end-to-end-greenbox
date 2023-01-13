import React from 'react';
import {map, omit} from 'lodash';
import Humanize from "humanize-plus";

const Analysis = ({analysis}) => {
    const columns={'color_1':'Color 1',color_1_5:'Color 1.5',color_2:'Color 2',color_2_5:'Color 2.5',color_3:'Color 3',color_3_5:'Color 3.5',brix_7:'Brix < 7',brix_7_8:'Brix 7-8',brix_8_9:'Brix 8-9',brix_9:'Brix > 9',weight_280:'Peso < 280g',weight_280_300:'Peso 280-300g','weight_300':'Peso > 300'};
    return (<div>
        <p className='font-semibold text-md font-sans my-3 w-full '>3) DATOS RELACIONADOS CON EL ANÁLISIS</p>
        <div className={"grid grid-cols-2 gap-2"}>
            <table className="bg-white w-full">
                <tbody>
                {map(omit(analysis, ['id', 'entry_date', 'week', 'boxes', 'lot_name', 'net_weight', 'total_defects', 'total_unharmed', 'lot', 'mechanical_damage', 'cracked', 'sun_damage', 'anthracnose', 'rot', 'mature', 'latex', 'queresa', 'insect_bite', 'soft', 'advanced']), (item, index) => {
                    return (<tr key={index}>
                        <td className="font-bold border border-black px-2 py-1">{columns[index]}</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(item, 2)} %</td>
                    </tr>)
                })}
                </tbody>
            </table>
            <table className="bg-white w-full">
                <tbody>
                {map(omit(analysis, ['id', 'entry_date', 'week', 'boxes', 'lot_name', 'net_weight', 'total_defects', 'total_unharmed', 'lot', 'color_1', 'color_1_5', 'color_2', 'color_2_5', 'color_3', 'color_3_5', 'brix_7', 'brix_7_8', 'brix_8_9', 'brix_9', 'weight_280', 'weight_280_300', 'weight_300',]),
                    (item, index) => {
                    return (<tr key={index}>
                        <td className="font-bold border border-black px-2 py-1">{columns[index]}</td>
                        <td className="font-semibold  text-center border border-black px-8 py-1">{Humanize.formatNumber(item, 2)} %</td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>

    </div>);

};

export default Analysis;

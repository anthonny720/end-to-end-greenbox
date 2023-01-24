import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {update_costs} from "../../redux/actions/costs";


const FormUpdateCosts = ({data, close, params}) => {

    const [inf, setInf] = useState(data);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(update_costs(inf, params))
        close()
    }

    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

        <div className={`grid grid-cols-2 gap-2`}>

            {
                map(inf, (column, index) => (
                    <div key={index}>
                        <p className={"text-xs mt-4 font-medium leading-none text-gray-800"}>{index}:</p>
                        <input type={'number'} min={0}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                               value={`${inf[index]?.cost}`}
                               onChange={text => {
                                   setInf({...inf, [index]: {...inf[index], cost: text.target.value}})
                               }}
                        />
                    </div>))
            }
        </div>


        <div className="w-full flex justify-center">
            <button type="button" onClick={() => {
                handleSubmit()
            }
            }
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>)

};


export default FormUpdateCosts;

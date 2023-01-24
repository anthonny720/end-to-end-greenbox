import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import TableCosts from "../../components/costs/TableCosts";
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {addDays} from 'date-fns';
import Modal from "../../components/util/Modal";
import {ReportToPrint} from "../../components/costs/ReportCosts";
import FormCosts from "../../components/costs/FormCosts";
import {get_costs} from "../../redux/actions/costs";
import {useDispatch, useSelector} from "react-redux";
import FormUpdateCosts from "../../components/costs/FormUpdateCosts";

const Costs = () => {
    const dispatch = useDispatch();
    const costs = useSelector(state => state.Costs.costs);
    const [selection, setSelection] = useState([{
        startDate: new Date(), endDate: addDays(new Date(), 7), key: 'selection'
    }]);
    useEffect(() => {
        dispatch(get_costs({
            'startDate': new Date(selection[0].startDate).toISOString().slice(0, 10),
            'endDate': new Date(selection[0].endDate).toISOString().slice(0, 10)
        }))
    }, [selection]);


    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenViewer = (row) => {
        setTitle("")
        setIsOpen(true)
        setContent(<ReportToPrint data={row}/>)
    }

    const handleOpenUpdateData = (data) => {
        setTitle("")
        setIsOpen(true)
        setContent(<FormCosts close={openModal} data={data} params={{
            'startDate': new Date(selection[0].startDate).toISOString().slice(0, 10),
            'endDate': new Date(selection[0].endDate).toISOString().slice(0, 10)
        }}/>)
    }
     const handleOpenUpdateCostsData = (data) => {
        setTitle("")
        setIsOpen(true)
        setContent(<FormUpdateCosts close={openModal} data={data} params={{
            'startDate': new Date(selection[0].startDate).toISOString().slice(0, 10),
            'endDate': new Date(selection[0].endDate).toISOString().slice(0, 10)
        }}/>)
    }


    return (<Layout>


        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div className="flex flex-col  items-center bg-white ">
            <div className="overflow-x-auto w-full lg:ml-[25%]  scrollbar-hide justify-center items-center">
                <DateRangePicker
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={selection}
                    direction="horizontal"
                    onChange={item => setSelection([item.selection])}
                />
            </div>
            <TableCosts data={costs ? costs : []} viewer={handleOpenViewer} update={handleOpenUpdateData} update_costs={handleOpenUpdateCostsData}/>
        </div>


    </Layout>);
};

export default Costs;

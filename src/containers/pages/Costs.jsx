import React, {useState} from 'react';
import Layout from "../../hocs/Layout";
import TableCosts from "../../components/planning/TableCosts";
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {addDays} from 'date-fns';
import Modal from "../../components/util/Modal";
import {ReportToPrint} from "../../components/planning/ReportCosts";
import PDFFile from "../../components/traceability/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Costs = () => {
    const [selection, setSelection] = useState([{
        startDate: new Date(), endDate: addDays(new Date(), 7), key: 'selection'
    }]);
    /*MODAL*/
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenViewer = () => {
        setTitle("")
        setIsOpen(true)
        setContent(<ReportToPrint/>)
    }


    return (<Layout>
        <PDFFile/>
        <div className="App">
            <PDFDownloadLink document={<PDFFile/>} filename="FORM">
                {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button>)}
            </PDFDownloadLink>
            {/* <PDFFile /> */}
        </div>


        <Modal isOpen={isOpen} close={openModal} title={title} children={content}/>
        <div className="flex flex-col max-w-full justify-center items-center bg-white">
            <div className="overflow-x-auto   scrollbar-hide justify-center items-center">
                <DateRangePicker
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={selection}
                    direction="horizontal"
                    onChange={item => setSelection([item.selection])}
                />
            </div>
            <TableCosts data={[new Date()]} viewer={handleOpenViewer}/>
            {/*<ReportToPrint/>*/}
        </div>


    </Layout>);
};

export default Costs;

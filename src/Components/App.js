import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// components
import Nav from './Header/Nav';
import Backdrop from './Header/Backdrop';
import Note from './Header/Note';
import FoodItems from './FoodItems/FoodItems';
import BillModal from './Header/BillModal';



// data
import itemsDataDefault from '../data';

// This is the root App component
export default function App(props){
    const [itemsData, setItemsData] = useState(itemsDataDefault);
    const [modalActive, setModalActive] = useState(false);
    function cancelModal(){
        setModalActive(false);
    }
    function activateModal(){
        setModalActive(true);
    }

    // this is an event handler
    function changeItemsData(e){
        const key = e.target.dataset.key;
        const incrementAmount = parseInt(e.target.dataset.amount)
        setItemsData(prev => {
            const state = {...prev};
            state[key].amount += incrementAmount;
            return state;
        });
    }
    let total = 0;
    for (const key in itemsData){
        total += itemsData[key].amount;
    }
    return (
        <div>
            <BillModal active={modalActive} cancel={cancelModal}
             itemsData={itemsData} changeItemsData={changeItemsData}/>
            <Nav items={total} activateModal={activateModal}/>
            {ReactDOM.createPortal(<Backdrop />, document.getElementById('independents'))}
            <div className='px-4 pb-8'>
                <Note />
                <FoodItems itemsData={itemsData} setItemsData={setItemsData}/>
            </div>
        </div>
    );
}
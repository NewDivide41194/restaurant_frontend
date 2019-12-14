import React, { useEffect, useState } from 'react'
import { DesignationFetcher } from  '../../../api/apiFetcher'
import DesignationModal from './designationModal';
import MyButton from '../../../tools/myButton.js';
import moment from 'moment';

export default function DesignationTable(){
    const [designationData, setDesignationData] = useState([]);
    const [designation, setDesignation] = useState("");
    const [remark, setRemark] = useState("");
    const [active, setActive] = useState(0);
    const [designationId, setDesignationId] = useState("");
    const userId = designationData.userId;
    const [open, setOpen] = useState(false);

    const onOpenModal = (e,index)=> {
        if(index===undefined){
          setOpen(true)
        }
        else{
        const designation_data = designationData[index]
        console.log(designation_data)
        setDesignation(designation_data.designation);
        setRemark(designation_data.remark);
        setActive(designation_data.active.data[0]);
        setDesignationId(designation_data.designationId);
        setOpen(true);
        }
        
      };
    
      const onCloseModal = () => {
        setOpen(false);
      };
     
      const DesignationFetch = () => {
        DesignationFetcher((err, data) => {
          setDesignationData(data.payload);
          console.log(data.payload);
        });
      };

      useEffect(() => {
        DesignationFetch();
      }, []);
    
      const _handleAddNew = () => {
        setOpen(true);
        setDesignation("");
        setDesignationId("");
        setActive(1);
        setRemark("");
      };
    console.log();
    
      return (
        <div className="container">
          {open ? (
            <DesignationModal
              open={open}
              onCloseModal={onCloseModal}
              designation={designation}
              remark={remark}
              active={active}
              designationId={designationId}
            />
          ) : null}
    
          <MyButton
            className="my-2"
            text={"+ Add New Designation"}
            onClick={_handleAddNew}
            type={"submit"}
            style={{borderRadius:5,fontSize:18}}
          />
          <div className= "table-responsive ">
            <table className="table table-dark text-light text-left">
            <thead>
              <tr>
                <th>SINO</th>
                <th>DESIGNATION</th>
                <th>ACTIVE</th>
                <th>REMARK</th>
                <th>CREATED DATE</th>
                <th colSpan="2">CREATE BY</th>
              </tr>
            </thead>
            <tbody>
              {designationData.map((v, k) => (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>{v.designation}</td>
                  <td style={{fontSize:18}}>{v.active.data[0] === 1 ? <i className="fa fa-check-square"/> : <i className="fa fa-square"/>}</td>
                  <td>{v.remark}</td>
                  <td>{moment(v.createdDate).format('MM/DD/YYYY hh:mm A')}</td>
                  <td>{v.employeeName}</td>
                  <td>
                    <button
                      type={"button"}
                      onClick={() => onOpenModal(v,k)}
                      style={{
                        borderRadius: "8px",
                        backgroundColor: "#c7821c",
                        color: "white",
                        width: "80px"
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          
        </div>
      );
}
    
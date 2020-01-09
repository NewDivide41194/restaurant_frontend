import React from 'react'
import role from '../../../assets/icon/setupIcon/role.png'
import * as RoutePath from '../../../config/routeConfig'
import { withRouter } from "react-router-dom";

const SetUpCards =props =>{

    return(
        <div className='container py-5 my-auto'>
            <div className='d-flex flex-row flex-wrap justify-content-center'>
                <div onClick={()=>{alert('Create Login')}} className='col-md-4 m-3 pt-2 align-items-center' style={{cursor:"pointer",border:'1px solid white',borderRadius: '5px',minWidth:'190px',maxWidth:'200px', minHeight:'230px',background: 'rgba(0, 0, 0, 0.1)'}}>
                    <Cards icon={"fa fa-sign-in fa-4x"} text={"Create Login"}  /> 
                </div>
                <div 
                onClick={()=>{
                    props.history.push(`/${RoutePath.UserRole}`);
                }}
                className='col-md-4 m-3 pt-2 align-items-center' style={{cursor:"pointer",border:'1px solid white',borderRadius: '10px',minWidth:'190px',maxWidth:'200px', minHeight:'230px', background: 'rgba(0, 0, 0, 0.1)'}}>
                   <Cards img={role} text="Roles"/>
                </div>
                <div onClick={()=>props.history.push(`/${RoutePath.Employee}`)} className='col-md-4 m-3 pt-2 align-items-center' style={{cursor:"pointer",border:'1px solid white',borderRadius: '10px',minWidth:'190px',maxWidth:'200px', minHeight:'230px',background: 'rgba(0, 0, 0, 0.1)'}}>
                    <Cards icon={"fa fa-users fa-4x"} text={"Employees"} /> 
                </div>
                <div onClick={()=>props.history.push(`/${RoutePath.Designation}`)} className='col-md-4 m-3 pt-2 align-items-center' style={{cursor:"pointer",border:'1px solid white',borderRadius: '10px',minWidth:'190px',maxWidth:'200px', minHeight:'230px',background: 'rgba(0, 0, 0, 0.1)'}}>
                    <Cards icon={"fa fa-pencil-square-o fa-4x"} text={"Designations"} /> 
                </div>
                <div onClick={()=>props.history.push(`/${RoutePath.Department}`)}className='col-md-4 m-3 pt-2 align-items-center' style={{cursor:"pointer",border:'1px solid white',borderRadius: '10px',minWidth:'190px',maxWidth:'200px', minHeight:'230px', background: 'rgba(0, 0, 0, 0.1)'}}>
                    <Cards icon={"fa fa-building-o fa-4x" } text={"Departments"} /> 
                </div>
                <div onClick={()=>{alert('Exit')}} className='col-md-4 m-3 pt-2 align-items-center' style={{cursor:"pointer",border:'1px solid white',borderRadius: '10px',minWidth:'190px',maxWidth:'200px', minHeight:'230px', background: 'rgba(0, 0, 0, 0.1)'}}>
                    <Cards icon={"fa fa-sign-out fa-4x"} text={"Exit"} /> 
                </div>
            </div>
        </div>
    )
}
export default withRouter(SetUpCards)

const Cards=({icon,text,img})=>{
    return(
        <div>
            <div className='pt-5 pb-4'>
                <i className={icon} style={{color:'white'}}/>
               {img===undefined?null: <img className='img-fluid' src={img} style={{width:'60px'}} alt="Setup Cards"/>}

            </div>
            <div className='text-center text-light pt-3'>
                <h4>{text}</h4>
            </div>
            
        </div>
     
    )
}


import React from 'react'
import Clients from "../clients/Clients";
// import Sidebar from "./Sidebar";

export default function Dashboard() {
    return (
        <div className="row">
            {/* <div className="col-md-3 col-md-pull-9">
                <Sidebar />
            </div> */}
            <div className="col-md-12">
                <Clients />
            </div>
            
                
        </div>
    )
}

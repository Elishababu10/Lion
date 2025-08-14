import React from 'react'
import {Link} from 'react-router-dom'
const Navigate=()=>{
    return(
        <div style={{position:'absolute',top:0,right:0}}>

            <Link to="/home"><li style={{display:'inline-block',marginLeft:'20px'}}>Home</li></Link>
            <Link to="/display"><li style={{display:'inline-block',marginLeft:'10px',marginRight:'10px'}}>Display</li></Link>
        </div>
    )
}
export default Navigate
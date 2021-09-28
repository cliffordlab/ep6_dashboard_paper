import * as React from 'react'
import {Switch} from '@material-ui/core'
import './navbar.css'

const ToggleBtn=(e, val)=>{
    console.log(val)
}

export default function NavBar() {
    return (
        <div className="navbar">
            <div className="navbarWrapper">
                <span className="logo">EP6 Dashboard</span>
                <Switch
                color = "primary"
                size = "medium"
                onChange={ToggleBtn}
                />
            </div>
        </div>
    )
}

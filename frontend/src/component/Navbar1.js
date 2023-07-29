import React from 'react'
import { Link } from 'react-router-dom'

const Navbar=(props)=> {
   
        return (
            <>
                <nav className="navbar bg-body-tertiary topNav" style={props.displayContent}>
                    <div className="container-fluid topNav ">
                        <h5 >Daily-News</h5>
                        <Link className='category' to="/general"> general</Link>
                        <Link className='category' to="/business">business</Link>
                        <Link className='category' to="/entertainment">entertainment</Link>
                        <Link className='category' to="/health">health</Link>
                        <Link className='category' to="/science">science</Link>
                        <Link className='category' to="/sports">sports</Link>
                       
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <Link to="/profile"><img className='profile' src="./profile.png.png" alt="" /></Link>
                        </form>
                    </div>
                </nav>
            </>
        )
   
}
export default Navbar

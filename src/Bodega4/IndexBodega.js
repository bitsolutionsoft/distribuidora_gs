import React from 'react';
import img from "../Img/Logo.jpg";

function IndexBodega(props) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-80 ">
            <div className="card pt-20 w-50">
            <img src={img} className="card-img-top" alt="..." />
            <div className="card-body">
            <h5 className="card-title">{props.titulo}</h5>
             <p className="card-text">{props.msg}</p>
    
  </div>
</div>


        </div>
    )
}

export default IndexBodega

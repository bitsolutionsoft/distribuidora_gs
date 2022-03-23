import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js'
import DataInforme from "./DataInforme";
import DataDetalle from "../Venta/DataDetalle";
import React, { useState,useEffect } from 'react';
import moment from "moment";
import swal from "sweetalert";
import '../css/estado.css'


function Informe(props)  {

  Chart.register(LineController, LineElement, PointElement, LinearScale, Title,CategoryScale);

  const [fechainicio, setfechainicio] = useState("");
  const [fechaFinal, setfechaFinal] = useState("");

  const [datosVentas, setdatosVentas] = useState([]);
  const [datosGanacias, setdatosGanacias] = useState([]);

const [myChart, setmyChart] = useState("")

const [detalle, setDetalle] = useState([]);


  useEffect(() => {
//datosGrafica();
}, [])

const traducir = (params) => {

  switch (params.toString().toLowerCase()) {
    case "monday":
      return "lunes";
    case "tuesday":
      return "martes";
    case "wednesday":
      return "miercoles";
    case "thursday":
      return "jueves";
    case "friday":
      return "viernes";
    case "saturday":
      return "sabado";
    case "sunday":
      return "domingo";
    case "january":
      return "enero";
    case "february":
      return "febrero";
    case "march":
      return "marzo";
    case "april":
      return "abril";
    case "may":
      return "mayo";
    case "june":
      return "junio";
    case "july":
      return "julio";
    case "august":
      return "agosto";
    case "september":
      return "septiembre";
    case "october":
      return "octubre";
    case "november":
      return "noviembre";
    case "december":
      return "diciembre";
    default:
      return params;
      
  }
  
}

const verInforme = (params) => {
  switch(params){
    case "Dia":
      ventas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"dia")
      ganacias(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"gdia")
      infoVentas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"ventaxsem")
      break;
      case "Semana":
        ventas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"semana")
        ganacias(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"gsemana")
        infoVentas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"ventaxmes")
        break;
        case "Mes":
          ventas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"mes")
          ganacias(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"gmes")
          infoVentas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"ventaxanio")
          break;
          case "Rango":
            if(fechaFinal !=="" && fechainicio !==""){
            ventas(0,moment(fechainicio).format("YYYY-MM-DD"),moment(fechaFinal).format("YYYY-MM-DD"),"rango")
            ganacias(0,moment(fechainicio).format("YYYY-MM-DD"),moment(fechaFinal).format("YYYY-MM-DD"),"grango")
            infoVentas(0,moment(fechainicio).format("YYYY-MM-DD"),moment(fechaFinal).format("YYYY-MM-DD"),"ventaxran")
            }else{
              swal("Aviso","Por favor de seleccionar la fecha inical y fecha final", "success");
            }
            break; 
            default:
            break;
  }
  
}


async function verDetalle (item,e)  {
 
  let detalle=await DataDetalle.consultarDetalle(item.idfactura);
  if(detalle !== null){
    console.log(detalle)
      if(detalle.message ==="Success"){
          setDetalle(detalle.res)
      }
  }
  
  var myInput = document.getElementById("exampleModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });
}

async function ventas(idfac,fecha1,fecha2,accion){
  let informe={
    "id_fac": idfac,
    "fech1":fecha1,
    "fech2":fecha2,
    "accion":accion,
  }
  let dventas=await DataInforme.consultarInforme(informe);
  console.log(dventas)
  if(dventas!== null){
    if(dventas.message==="Success"){
 
      setdatosVentas(dventas.res)
    }
  }

}

async function ganacias(idfac,fecha1,fecha2,accion){
  let informe={
    "id_fac": idfac,
    "fech1":fecha1,
    "fech2":fecha2,
    "accion":accion,
  }
  let dventas=await DataInforme.consultarInforme(informe);
  console.log(dventas)
  if(dventas!== null){
    if(dventas.message==="Success"){
      setdatosGanacias(dventas.res)
    }
  }

}

async function infoVentas(idfac,fecha1,fecha2,accion){
  let informe={
    "id_fac": idfac,
    "fech1":fecha1,
    "fech2":fecha2,
    "accion":accion,
  }
  let dventas=await DataInforme.consultarInforme(informe);
  console.log(dventas)
  if(dventas!== null){
    if(dventas.message==="Success"){
    
      //setdatosinfoVentas(dventas.res)
      //setdataDatos(returnData(dventas.res));
      //setlabelsDatos(returnLabel(dventas.res));
graficarDatos(dventas.res);
     
    }
  }

}
  const returnLabel = (datos) => {
    let labels=[];
    datos.map(item=>{
      labels.push(traducir(item.nombre));
      return true;
    })
    return labels;
  }
  
const returnData = (datos) => {
  let data=[];
  datos.map(item=>{
    console.log(item.total)
    data.push(item.total);
    return true;
  })
  return data;
}



  const graficarDatos = (datos) => {
/**configuracion de  la grafica */ 
//etiquetas
const labels = returnLabel(datos);
console.log(labels)
//datos
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Ventas',
      data:returnData(datos),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor:'rgb(54, 162, 235)',
      yAxisID: 'y',
    },
  
  ]
};
//configuracion de la grafica
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: "Ventas"       
           }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
    
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      },
    };

    //obtner el id del canva de la grafica
    const ctx = document.getElementById('myChart').getContext('2d');
    //crear grafica y mardar los parametros
  

let chart = Chart.getChart('myChart');
if (typeof chart !== 'undefined') {
  chart.destroy() // Does not show anything because of this line, comment it out to show again
}
setmyChart( new Chart(ctx,config));

 
   
  }
  

return(
    <div className="container-fluid vh-100">
    <div className="mb-2">   <h5 className="modal-title">Informe</h5></div>

     <div className="row mb-2">

     <div className="col-4"> 
               <div className="form-check form-check-inline">
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Por Dia"  onClick={(e)=>verInforme("Dia")}/>
                  <label className="form-check-label" htmlFor="exampleRadios1">Por dia</label>
               </div>
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Por semana"  onClick={(e)=>verInforme("Semana")} />
                 <label className="form-check-label" htmlFor="exampleRadios2">Por semana</label>
               </div>
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Por mes"  onClick={(e)=>verInforme("Mes")}/>
                 <label className="form-check-label" htmlFor="exampleRadios3">Por mes</label> <br/>
               </div> 
               
               </div>         
            </div>


            <div className="col-8">
           <div className="row">
            <div className="col-auto d-flex" >
  <label  className="me-2" >Fecha inicial</label>
  <input type="date" className="form-control form-control-sm" value={fechainicio} onChange={(e)=>setfechainicio(moment(e.target.value).format("YYYY-MM-DD"))}/>
</div>
<div className="col-auto d-flex">
  <label htmlFor="exampleFormControlInput1" className="me-2"  >Fecha  final</label>
  <input type="date"  id="exampleFormControlInput1"  className="form-control form-control-sm"  value={fechaFinal} onChange={(e)=>setfechaFinal(moment(e.target.value).format("YYYY-MM-DD"))}/>
</div>
<div className="col-auto">
<button type="button" className="ml-1 btn btn-success" onClick={()=>verInforme("Rango")} >Buscar</button>
</div> 
</div>
 </div>            
<div className="row">
 

</div>
    
</div>
<div >
 
<table className="table-subitem">
  <thead >
          <tr>
            <th></th>
            <th>Ventas</th>
            <th>Inversion</th>
             <th>Ganacia</th>
           
          </tr>
        </thead>
       <tbody>
  {datosGanacias ?
datosGanacias.map((item,index)=>(
  <tr  key={index} >  
  <td></td>          
  <td>{item.ventas > 0 ? item.ventas.toFixed(2) : null}</td>
  <td>{item.compra > 0 ? item.compra.toFixed(2) : null}</td> 
  <td>{item.ganancia > 0 ? item.ganancia.toFixed(2) : null}</td>
</tr>
))

: null
}
</tbody>
      </table>
  
</div>
<div className="row vh-70">

<div className="col-12 col-sm-12 col-md-6 col-lg-6">
<canvas id="myChart" width="400" height="330"></canvas>
</div>
<div className="col-12 col-sm-12 col-md-6 col-lg-6 h-100 overflow-auto ">
  <h5>Historial de ventas</h5>
  <div className="tblheight">
<div className="table-wrap">
<table className="table-item">
  <thead >
          <tr>
          <th>#</th>
            <th>Fecha</th>
            <th>Cliente</th>
             <th>Total vendido</th>
             <th>Detalle</th>
           
          </tr>
        </thead>
       <tbody>
  {datosVentas ?
datosVentas.map((item,index)=>(
  <tr  key={index} > 
  <td>{item.idfactura}</td>           
  <td>{moment.utc(item.fecha).format("DD/MM/YYYY")}</td>
  <td>{item.cliente}</td> 
  <td>{item.total}</td>
  <td ><button  type="button" className="btn btn-sm-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>verDetalle(item,e.target)}><i style={{color: "#FABC2A"}} className="fa fa-info-circle gb-primary" aria-hidden="true"></i></button></td>
</tr>
))

: null
}
</tbody>
      </table>
</div>
</div>
</div>

</div>
 
{/**modal de detalle producto */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Detalle de la venta</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="table-wrap">
      <table className="table-item">
        <thead >
            <tr>
              <th>#</th>
              <th>Descripcion</th>
              <th>Rollo</th>
              <th>Yarda</th>
              <th>Precio </th>
              <th>Subtotal </th>
            </tr>
          </thead>
         <tbody>
        { detalle ?
             detalle.map((item, index) =>(
              <tr key={index} >
                 <td>{item.idfactura}</td>
                 <td>{item.descripcion}</td>
                  <td>{item.rollo}</td>
                 <td>{item.yarda}</td>  
                 <td>{item.precio}</td>
                 <td>{item.total}</td>
               </tr>
             )) 
             : null
             
        
             }
        
         </tbody>
        </table>

      </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Salir</button>
      
      </div>
    </div>
  </div>
</div>
{/**finañ del modal */}

 </div>

    );
}

export default Informe;
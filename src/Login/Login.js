import '../css/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import img from "../Img/Logo.jpg";
import 'font-awesome/css/font-awesome.min.css';
import DatosUsuario from "./DatosUsuario";
import md5 from 'md5';
import DataPermiso from '../Empleado/DataPermiso';
import React, { useState } from 'react';
import ls from "local-storage";
import swal from "sweetalert"

function Login(props)  {
    const [user, setuser] = useState("");
    const [password, setpassword] = useState("");

    async function  loguear(){
        let data={
          idusuario:0,
          idempleado:0,
          usuario:user,
          pass:md5(password)
        }
        console.log(data.pass)
         let usuario=await DatosUsuario.obtenerUsuario(data);
         console.log(usuario)
         if(usuario !== undefined){
             if(usuario.message==="Success"){
           console.log(usuario.res[0]);
           let d=usuario.res[0];
           ls.set('usuario',usuario.res[0]);
           consultarPermiso(d.idempleado)
           swal("Distribuidora Textiles G&S", "Bienvenido", "success");
           props.history.push('/Menu');}
           else{
            swal("Distribuidora Textiles G&S", "Usuario o Cantraseña Incorrecta", "warning");
           }
         }
     
     
     }
     async function consultarPermiso(idemp) {
        
        let dat = await DataPermiso.consultarPermiso(idemp);
        if (dat !== null) {
        if(dat.message ==="Success"){
          console.log(dat.res);
          ls.set('permiso',dat.res);
        }
    }
      }
   


return (
    
    <div className="container-fluid login">
     
    <div className="container w-75 mt-5">
        <div className="row bg-dark  bg-opacity-50 align-items-stretch rounded">
            <div className="col  d-none d-lg-block col-md-5 col-lg-5 col-xl-6 ">
                <img  src={img} className="rounded " alt ="logo" width="100%" height="100%"/>
            </div>
            <div className="col  p-2 rounded-end">
                <h2 className="fw-bold text-center pt-6 py-5  text-white"  >Bienvenido</h2>
                
                <div className="d-flex justify-content-center h-100 ">
                    <div> 
                        <div className="bg-dark p-2 t bg-opacity-10">
                            <div className="input-group form-group">
                                <div> 
                                    <label htmlFor="username" className="form-label text-white fw-bold" > Usuario: </label>
                                    <div className="input-group-prepend">
                                    <span className="fa fa-user form-control-icon fa-2x " style={{color:'black'}}  ></span>
                                    <input type="text" className="form-control " placeholder="Username" name="user"  onChange={(e) => setuser(e.target.value)}/>
                                    </div>
                                    
                                </div>
                            </div>
                              <div className="input-group form-group">
                                <div className="mb-3">
                                    
                                        <label htmlFor="password" className="form-label text-white fw-bold">Contraseña:</label>
                                        <div className="form-group py-1 pb-2">
                                        <span className="fa fa-lock form-control-icon fa-2x" style={{color:'black'}}></span><input type="password" className="form-control" placeholder="Password" name="password"  onChange={(e)=>setpassword(e.target.value)}/>
                                        </div>
                                </div>
                                
                            </div>
                        
 
                            <div className="mb-4 form-check">
                                <input type="checkbox" name="connected" className="form-check-input"/>
                                <label htmlFor="connected" className="form-check-label text-white fw-bold">Mantenerme conectado</label>
                                </div>
                            <div className="d-grid">
                                <div>
                                    <input type="submit" value="Iniciar Sesión" className="btn btn-primary w-100 my-100" onClick={()=> loguear()}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
</div>


         
        );
    
}
export default Login;
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Rifa from "./pages/Rifa";
import Pagamento from "./pages/Pagamento";

function AppRoutes(){

    return(

        <BrowserRouter>
             
                <Routes>

                    <Route path = "/" element = {<Home></Home>}></Route>
                    <Route path = "/Rifa/:idParticipante" element = {<Rifa></Rifa>}></Route>
                    <Route path = "/Pagamento" element = {<Pagamento></Pagamento>}></Route>

                 </Routes>


        </BrowserRouter>

    );

}

export default AppRoutes;
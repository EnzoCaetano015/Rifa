import Cartela from "../../components/Cartela";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";

function Rifa(){
  const {idParticipante} = useParams()

    return(
        
            <>
              <Container>
                <Cartela idParticipante={idParticipante}></Cartela><br/><br/>
              </Container>      
              <Footer/>
            </>
          
    );
}

export default Rifa;
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Pagar from "../../components/Pagar";

function Pagamento(){
    return(
        <>
        <Header/>
        <Container>
            <Pagar></Pagar>
        </Container>
        <Footer/>
        
        </>
    );
}

export default Pagamento;
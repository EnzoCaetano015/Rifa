import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Pagar.module.css';

function Pagamento() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { idParticipante, numerosSelecionados, valorTotal } = state;
    const [qrcodeUrl, setQrcodeUrl] = useState('');

    // Gera um QR Code usando a API do QR Server (goqr.me)
    useEffect(() => {
        const qrCodeData = `Pix para pagamento dos números ${numerosSelecionados.join(', ')} no valor de R$ ${valorTotal}`;
        const qrServerUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeData)}&size=200x200`;

        console.log("URL do QR Code:", qrServerUrl); // Verifique se a URL está correta
        setQrcodeUrl(qrServerUrl); // Define o URL do QR Code
    }, [numerosSelecionados, valorTotal]);

    const confirmarPagamento = async () => {
        try {
            const response = await fetch("http://localhost:5000/comprar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idParticipante, numeros: numerosSelecionados })
            });

            if (response.ok) {
                alert("Pagamento confirmado! Compra registrada com sucesso!");
                navigate('/'); // Redireciona para a página inicial ou tela de sucesso
            } else {
                alert("Erro ao registrar a compra.");
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className={styles.pagamento}>
            <p>Números selecionados: {numerosSelecionados.join(', ')}</p>
            <p>Valor total: R$ {valorTotal}</p>
            <div className={styles.qrcode}>
                <h3>Escaneie o QR Code para pagar:</h3>
                {qrcodeUrl ? (
                    <img src={qrcodeUrl} alt="QR Code para pagamento" />
                ) : (
                    <p>Carregando QR Code...</p>
                )}
            </div>
            <button onClick={confirmarPagamento}>Confirmar Pagamento</button>
        </div>
    );
}

export default Pagamento;

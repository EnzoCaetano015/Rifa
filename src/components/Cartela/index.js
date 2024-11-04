import { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Cartela/Cartela.module.css';

function Cartela({ idParticipante }) {
    const valorPorNumero = 10.0;
    const [numerosSelecionados, setNumerosSelecionados] = useState([]);
    const [numerosComprados, setNumerosComprados] = useState([]);
    const isInitialized = useRef(false);
    const navigate = useNavigate()

    const valorTotal = (numerosSelecionados.length * valorPorNumero).toFixed(2)

    // Função para buscar os números já comprados
    useEffect(() => {
        async function fetchNumerosComprados() {
            try {
                const response = await fetch("http://localhost:5000/numeros-comprados");
                if (response.ok) {
                    const data = await response.json();
                    setNumerosComprados(data);
                } else {
                    console.error("Erro ao buscar números comprados");
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        }
        fetchNumerosComprados();
    }, []);

    // Função para selecionar ou desmarcar um número
    const selecionarNumero = useCallback((numero, elemento) => {
        // Verifica se o número já foi comprado
        if (numerosComprados.includes(numero)) {
            alert(`O número ${numero} já foi comprado por outro participante.`);
            return;
        }

        setNumerosSelecionados((prevSelecionados) => {
            const index = prevSelecionados.indexOf(numero);
            let novosSelecionados;
            if (index > -1) {
                novosSelecionados = prevSelecionados.filter(n => n !== numero);
                elemento.classList.remove(styles.selecionado);
            } else {
                novosSelecionados = [...prevSelecionados, numero];
                elemento.classList.add(styles.selecionado);
            }
            return novosSelecionados;
        });
    }, [numerosComprados]);


    // Atualiza a legenda quando `numerosSelecionados` muda
    useEffect(() => {
        const numerosSelecionadosText = document.getElementById('numerosSelecionados');
        const valorTotalText = document.getElementById('valorTotal');
        numerosSelecionadosText.textContent = 
            'Números selecionados: ' + (numerosSelecionados.length > 0 ? numerosSelecionados.join(', ') : 'Nenhum');
        valorTotalText.textContent = 'Valor total: R$ ' + (numerosSelecionados.length * valorPorNumero).toFixed(2);
    }, [numerosSelecionados]);

    // Função para registrar a compra
    const redirecionarParaPagamento = () => {
        if (numerosSelecionados.length === 0) {
            alert("Por favor, selecione pelo menos um número.");
            return;
        }

        // Redireciona para a tela de pagamento com os dados necessários
        navigate('/pagamento', {
            state: {
                idParticipante,
                numerosSelecionados,
                valorTotal
            }
        });
    };

    // Atualiza a cartela sempre que `numerosComprados` muda
    useEffect(() => {
        function gerarCartela() {
            const cartela = document.getElementById('cartela');
            cartela.innerHTML = ''; // Limpa a cartela antes de preenchê-la novamente

            for (let i = 1; i <= 100; i++) {
                const numero = document.createElement('div');
                numero.classList.add(styles.numero);
                numero.textContent = i;

                // Marca os números comprados como selecionados
                if (numerosComprados.includes(i)) {
                    numero.classList.add(styles.comprado);
                }

                numero.onclick = () => selecionarNumero(i, numero);
                numero.onmouseover = () => {
                    if (numerosComprados.includes(i)) {
                        numero.title = `O número ${i} já foi comprado.`;
                    }
                };
                cartela.appendChild(numero);
            }
        }

        if (!isInitialized.current || numerosComprados.length > 0) {
            gerarCartela();
            isInitialized.current = true;
        }
    }, [numerosComprados, selecionarNumero]);

    return (
        <>
           <h1>Escolha um Número</h1><br/><br/>

            <div id="cartela" className={styles.cartela}></div>

            <div className={styles.legenda}>
                <p id="numerosSelecionados">Números selecionados: Nenhum</p>
                <p id="valorTotal">Valor total: R$ 0,00</p>
            </div><br/><br/>

            <button onClick={redirecionarParaPagamento}>Comprar</button>
        </>
    );
}

export default Cartela;

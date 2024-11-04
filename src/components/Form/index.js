import styles from "./Form.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: ""
  });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Função de Cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(''); // Limpa qualquer erro anterior
    console.log("Formulário de cadastro enviado com os dados:", formData);

    try {
      const response = await fetch("http://localhost:5000/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resposta do servidor ao cadastrar:", data);
        alert("Participante cadastrado com sucesso!");
        setTimeout(() => {
          navigate(`/Rifa/${data.idParticipante}`);
        }, 1500);
      } else {
        // Lê a mensagem de erro do servidor e exibe no frontend
        const errorData = await response.json();
        console.error("Erro na resposta do servidor ao cadastrar:", response.status, errorData.error);
        setErro(errorData.error || "Erro ao cadastrar participante.");
      }
    } catch (error) {
      console.error("Erro na requisição ao cadastrar:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  // Função de Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    console.log("Formulário de login enviado com os dados:", formData);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      console.log("Resposta completa do servidor ao tentar login:", response);

      if (response.ok) {
        const data = await response.json();
        if (data.idParticipante) {
          console.log("Login bem-sucedido, dados do participante:", data);
          navigate(`/Rifa/${data.idParticipante}`);
        } else {
          setErro("Dados incorretos. Verifique suas informações e tente novamente.");
        }
      } else {
        console.error("Erro na resposta do servidor ao realizar login:", response.status, response.statusText);
        setErro("Erro ao realizar login.");
      }
    } catch (error) {
      console.error("Erro na requisição ao realizar login:", error.message);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.form}>
      <h2>Formulário de Cadastro/Login</h2><br/>
      {erro && <p className={styles.error}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label><br />
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="cpf">CPF:</label><br />
        <input
          type="text"
          id="cpf"
          name="cpf"
          pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="telefone">Telefone:</label><br />
        <input
          type="tel"
          id="telefone"
          name="telefone"
          pattern="\(\d{2}\) \d{4,5}-\d{4}"
          placeholder="(00) 00000-0000"
          value={formData.telefone}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Cadastrar</button><br /><br />
        <button type="button" onClick={handleLogin} className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
}

export default Form;

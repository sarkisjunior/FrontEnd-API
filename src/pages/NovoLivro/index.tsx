import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NaviBar';
import api from '../../database/api';

import './styles.css'
export const valorInicial = {
    id: 0,
    titulo: '',
    autor: '',
    editora: '',
    paginas: 0,
}
function NovoLivro() {

    const [livros, setLivros] = useState(valorInicial);

    const navigate = useNavigate();

    function editarLivros(evento: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = evento.target;

        setLivros({...livros, [name]: value})
        // evento.preventDefault();
    }

    async function salvarLivro(evento: React.FormEvent<HTMLFormElement>){
        evento.preventDefault();
        try{
            await api.post('livros', livros);
            navigate('/');
        }catch(error){
            console.log(`Erro ao listar livros: ${error}`);
            }
    }


    return(
        <> 
        <NavBar />
            <div className='main-novo-livro'>
                <form onSubmit={salvarLivro}>
                    <header>
                        <h1>Cadastrar Livro</h1>
                    </header>
                    <div className="campo">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" name="titulo" id="titulo" onChange={(e) => editarLivros(e)} required/>
                    </div>

                    <div className="campo">
                        <label htmlFor="autor">Autor</label>
                        <input type="text" name="autor" id="autor" onChange={(e) => editarLivros(e)} required/>
                    </div>

                    <div className="campo">
                        <label htmlFor="editora">Editora</label>
                        <input type="text" name="editora" id="editora" onChange={(e) => editarLivros(e)} required/>
                    </div>
                    <div className="campo">
                        <label htmlFor="paginas">Nº páginas</label>
                        <input type="text" name="paginas" id="paginas" onChange={(e) => editarLivros(e)} required/>
                    </div>

                    <div className="botoes">
                        <button type='submit' className='botao btnSalvar'>Salvar</button>
                        <button type='button' className='botao btnCancelar' onClick={() => navigate('/')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NovoLivro;
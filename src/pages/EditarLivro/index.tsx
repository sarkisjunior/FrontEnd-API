import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NaviBar";
import { ILivro } from "../../components/CardLivro";
import { valorInicial } from "../NovoLivro";
import { useNavigate } from "react-router-dom";
import MensagemExcluir from "../../components/MensagemExcluir";

import './styles.css'
import api from "../../database/api";

function EditarLivro(){
    const {id} = useParams();

    const [livro, setLivro] = useState<ILivro>(valorInicial);
    const [msgExcluir, setMsgExcluir] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{
        api.get(`livros/${id}`).then((response) =>{            
            setLivro(response.data[0])
        }).catch((error) => {
            console.log(`Erro ao consultar o livro: ${error}`);            
        })
    },[])

    function editarLivros(evento: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = evento.target;

        setLivro({...livro, [name]: value})
        // evento.preventDefault();
    }

    async function salvarLivro(evento: React.FormEvent<HTMLFormElement>){
        evento.preventDefault();
        try{
            await api.put(`livros/${id}`, livro);
            navigate('/');
        }catch(error){
            console.log(`Erro ao listar livros: ${error}`);
            }
    }

    

    return(
        <> 
        <NavBar />
        
        {msgExcluir ? <MensagemExcluir id={livro.id} titulo={livro.titulo} abortarExclusao={setMsgExcluir}/> :       
            <div className='main-novo-livro'>
                <form onSubmit={salvarLivro}>
                    <header>
                        <h1>Editar Livro</h1>
                        <button type="button" className="button-excluir" onClick={() => setMsgExcluir(true)}>Excluir Livro</button>
                    </header>

                    <div className="campo">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" name="titulo" id="titulo" value={livro.titulo} onChange={(e) => editarLivros(e)}required/>
                    </div>

                    <div className="campo">
                        <label htmlFor="autor">Autor</label>
                        <input type="text" name="autor" id="autor" value={livro.autor} onChange={(e) => editarLivros(e)} required/>
                    </div>

                    <div className="campo">
                        <label htmlFor="editora">Editora</label>
                        <input type="text" name="editora" id="editora" value={livro.editora} onChange={(e) => editarLivros(e)} required/>
                    </div>
                    <div className="campo">
                        <label htmlFor="paginas">Nº páginas</label>
                        <input type="text" name="paginas" id="paginas" value={livro.paginas} onChange={(e) => editarLivros(e)} required/>
                    </div>

                    <div className="botoes">
                        <button type='submit' className='botao btnSalvar'>Salvar</button>
                        <button type='button' className="botao btnCancelar" onClick={() => navigate('/')}>Cancelar</button>
                    </div>
                </form>
            </div>
        }
        </>
    )
}

export default EditarLivro;
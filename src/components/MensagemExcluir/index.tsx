import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../database/api';
import './style.css'

interface IMensagem{
    id: number;
    titulo: string;
    abortarExclusao: (type: boolean) => void;
}

function MensagemExcluir({id, titulo, abortarExclusao}: IMensagem){
    const navigate = useNavigate();

    function excluirLivro() {
        api.delete(`livros/${id}`).then(() => {
            navigate('/');
        }).catch((error) => {
            console.log(`Erro ao excluir o livro: ${error}`);        
        })
    }

    return(
        <>
            <div className="main-msg-excluir">
                <div className="mensagem">
                <p>Tem certeza que deseja excluir o livro</p>
                <p><strong>{titulo}</strong>?</p>

                <div className="msg-botao">
                    <button type="button" className="btn-msg-excluir" onClick={() => excluirLivro}>Sim</button>
                    <button type="button" className="btn-msg-excluir" onClick={() => {abortarExclusao(false)}}>Não</button>
                </div>
                </div>
            </div>
        </>
    )
}

export default MensagemExcluir;
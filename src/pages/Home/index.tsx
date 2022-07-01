import NavBar from "../../components/NaviBar";
import CardLivro from "../../components/CardLivro";
import api from "../../database/api";
import { ILivro } from "../../components/CardLivro";

import './styles.css';
import { useEffect, useState } from "react";

function Home() {

    const [livros, setLivros] = useState<ILivro[]>([]);

    useEffect(() => {
        api.get('livros').then((response) =>{
            setLivros(response.data);
        }).catch((erro)=>{
            console.log(`Erro ao listar livros: ${erro}`);            
        })
    },[])

    return(
        <>
            <NavBar/>

            <div className="main-home">
                <div className="title-home">
                    <h1>Meus Livros</h1>
                    <span className="total-livros">Total de livros: {livros.length}</span>
                </div>

                <section className="lista-livros">
                    {
                        livros.map(livro =>(
                            <CardLivro key={livro.id}
                                id={livro.id} 
                                titulo={livro.titulo}
                                autor={livro.autor} 
                                editora={livro.editora} 
                                paginas={livro.paginas} 
                            />
                        ))
                    }
                </section>
            </div>
        </>
    )
}

export default Home;
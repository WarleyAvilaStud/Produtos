import React from "react";
import {BsFillTrashFill, BsFillPenFill} from 'react-icons/bs';

const ListaProdutos = ({produto, editarProdutoClick, deletarProdutoClick}) =>{
    return(
        <tr>
            <td>{produto.nomeProduto}</td>
            <td>{produto.valorProduto}</td>
            <td>{produto.disponivelProduto === 'S' ? ("Sim") : ("Não")}</td>
            <td>{produto.descricaoProduto}</td>
            <td>
                <span className="acoes">
                    <BsFillPenFill onClick={(event) => editarProdutoClick(event, produto)} />
                    <BsFillTrashFill onClick={(event) => deletarProdutoClick(event, produto.id)} />
                </span>
            </td>
        </tr>
    )
}

export default ListaProdutos;
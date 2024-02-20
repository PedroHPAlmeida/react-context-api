import React, { useContext } from "react";
import Quantidade from "@/components/Quantidade";
import Botao from "@/components/Botao";
import ValorFormatado from "@/components/ValorFormatado";
import { CarrinhoContext } from "@/context/CarrinhoContext";

const ItemCarrinhoSuspenso = ({
  itemCarrinho,
  removerProdutoCarrinho,
  adicionarProduto,
}) => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    const ehOUltimo = produto.quantidade === 1;

    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((p) => p.id !== id)
      )
    }

    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((p) => {
        if (p.id === id) p.quantidade -= 1
        return p;
      })
    );
  }

  return (
    <li>
      <>
        <div className="produto">
          <img
            className="imagem__produto"
            src={itemCarrinho.src}
            alt={itemCarrinho.alt}
          />
          <div className="d-flex flex-column gap-3 w-100">
            <p className="fw-semibold fs-5 m-0">{itemCarrinho.titulo}</p>
            <Quantidade
              itemCarrinho={itemCarrinho}
              adicionarProduto={adicionarProduto}
              removerProduto={removerProduto}
            />
            <ValorFormatado valor={itemCarrinho.preco} />
          </div>
          <Botao
            variant="deleteItem"
            aria-label="Excluir"
            onClick={() => removerProdutoCarrinho(itemCarrinho.id)}
          >
            delete_forever
          </Botao>
        </div>
        <div className="divisor my-5" />
      </>
    </li>
  );
};

export default ItemCarrinhoSuspenso;

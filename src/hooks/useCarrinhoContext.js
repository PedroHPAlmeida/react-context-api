import { useContext, useEffect, useMemo } from "react"
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
    const { carrinho, setCarrinho, quantidade, setQuantidade, valorTotal, setValorTotal } = useContext(CarrinhoContext);

    function mudarQuantidade(id, quantidade) {
        return carrinho.map((itemDoCarrinho) => {
            if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho;
        })
    }

    function adicionarProduto(novoProduto) {
        const temOProduto = carrinho.some((itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id);

        if (!temOProduto) {
            novoProduto.quantidade = 1;
            return setCarrinho((carrinhoAnterior) => [
                ...carrinhoAnterior,
                novoProduto
            ]);
        }
        const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);
        setCarrinho([...carrinhoAtualizado]);
    }

    function removerProduto(id) {
        const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
        const ehOUltimo = produto.quantidade === 1;

        if (ehOUltimo) {
            return setCarrinho((carrinhoAnterior) =>
                carrinhoAnterior.filter((p) => p.id !== id)
            )
        }

        const carrinhoAtualizado = mudarQuantidade(id, -1)
        setCarrinho([...carrinhoAtualizado]);
    }

    function removerProdutoCarrinho(id) {
        const carrinhoAtualizado = carrinho.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
        setCarrinho(carrinhoAtualizado);
    }

    const { totalTemp, quantidadeTemp } = useMemo(() => {
        return carrinho.reduce((acc, produto) => {
            return {
                totalTemp: acc.totalTemp + (produto.preco * produto.quantidade),
                quantidadeTemp: acc.quantidadeTemp + produto.quantidade
            }
        }, { totalTemp: 0, quantidadeTemp: 0 });
    }, [carrinho]);

    useEffect(() => {
        setValorTotal(totalTemp);
        setQuantidade(quantidadeTemp);
    });

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        valorTotal,
        quantidade
    };
};

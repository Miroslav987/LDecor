import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { SetBasket } from "./BasketSlice";
import { useModal } from "@/context/ModalProvider";


export const useBasket = () => {
    const dispatch = useAppDispatch()
    const { basket } = useAppSelector(state => state.basket)
    const{closeModal} =useModal()

    const AddBasketProduct = (product: any) => {

        if (!basket.products) {
            const updateBasket = {
                ...basket,
                products: [product],
                total_quantity: 1
            }
            return (localStorage.setItem("basket", JSON.stringify(updateBasket)),
                dispatch(SetBasket(updateBasket)))
        }


        const products = [...basket.products, product]
        const updateBasket = {
            ...basket,
            products: products,
            total_quantity: basket.total_quantity + 1
        }

        let filterBasket = basket.products.filter((elem: any) => {
            return elem.id === product.id;
        });

        if (filterBasket.length > 0) {
            basket.products = basket.products.filter((elem: any) => {
                return elem.id !== product.id;
            });
        }
        else {
            dispatch(SetBasket(updateBasket))
            const newBasket = localStorage.setItem("basket", JSON.stringify(updateBasket));
        }
    }

    const DeleteBasketProduct = (id: string) => {
        const updateBasket = { ...basket }
        const products = updateBasket.products.filter((e: any) =>
            e.id !== id
        )
        const infoDeleteProduct = updateBasket.products.filter((e: any) =>
            e.id === id
        )
        const deleteProduct = {
            products,
            total_quantity: +updateBasket.total_quantity - +infoDeleteProduct[0].quantity
        }

        localStorage.setItem("basket", JSON.stringify(deleteProduct))
        dispatch(SetBasket(deleteProduct))
    }


    const PlusQuanty = (id: string) => {
        const updateBasket = { ...basket };

        const productIndex = updateBasket.products.findIndex((e: any) => e.id === id);


        if (productIndex !== -1) {
            const productDetail = updateBasket.products[productIndex];

            if (productDetail.quantity) {

                const updatedProduct = {
                    ...productDetail,
                    quantity: productDetail.quantity + 1,
                };

                const updatedProducts = updateBasket.products.map((product: any, index: number) =>
                    index === productIndex ? updatedProduct : product
                );

                const newBasket = {
                    ...updateBasket,
                    products: updatedProducts,
                    total_quantity: updateBasket.total_quantity + 1,
                };
                dispatch(SetBasket(newBasket));
                localStorage.setItem('basket', JSON.stringify(newBasket));
            }
        }
    };


    const MinusQuanty = (id: string) => {
        const updateBasket = { ...basket };

        const productIndex = updateBasket.products.findIndex((e: any) => e.id === id);

        if (productIndex !== -1) {
            const productDetail = updateBasket.products[productIndex];

            if (1 < productDetail.quantity) {

                const updatedProduct = {
                    ...productDetail,
                    quantity: productDetail.quantity - 1,
                };

                const updatedProducts = updateBasket.products.map((product: any, index: number) =>
                    index === productIndex ? updatedProduct : product
                );

                const newBasket = {
                    ...updateBasket,
                    products: updatedProducts,
                    total_quantity: updateBasket.total_quantity - 1,
                };
                dispatch(SetBasket(newBasket));
                localStorage.setItem('basket', JSON.stringify(newBasket));
            }
        }
    };
    const AllDeleteBasket =()=> {
        dispatch(SetBasket([]));
        localStorage.setItem('basket', JSON.stringify([]));
        closeModal()
    }

    const AllPriceProducts =(price:number)=> {
        const updateBasket = { ...basket };
        const updatePrice = {
            ...updateBasket ,
            price:price,
        }
        dispatch(SetBasket(updatePrice));
        localStorage.setItem('basket', JSON.stringify(updatePrice));
    }

    return ({ AddBasketProduct, DeleteBasketProduct, PlusQuanty, MinusQuanty, AllDeleteBasket, AllPriceProducts })
}
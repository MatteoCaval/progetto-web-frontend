import CatalogActionType from "./catalog.types";

const categories = [
    {
        id: 1,
        name: "Prima categoria",        
        image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/05/piadina-con-il-bimby/jcr:content/header-par/image-single.img10.jpg/1560520652683.jpg'
    },
    {
        id: 2,
        name: "Seconda categoria",
        image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/05/piadina-con-il-bimby/jcr:content/header-par/image-single.img10.jpg/1560520652683.jpg'
    },
    {
        id: 3,
        name: "Terza categoria",
        image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/05/piadina-con-il-bimby/jcr:content/header-par/image-single.img10.jpg/1560520652683.jpg'
    }
]

const products = [
    {
        id: 1,
        name: "Primo Prodotto",
        price: '6€',
        image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/05/piadina-con-il-bimby/jcr:content/header-par/image-single.img10.jpg/1560520652683.jpg'
    },
    {
        id: 2,
        name: "Secondo Prodotto",
        price: '5€',
        image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/05/piadina-con-il-bimby/jcr:content/header-par/image-single.img10.jpg/1560520652683.jpg'
    },
    {
        id: 3,
        name: "Terzo Prodotto",
        price: '4€',
        image: 'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2019/05/piadina-con-il-bimby/jcr:content/header-par/image-single.img10.jpg/1560520652683.jpg'
    }
]

// TODO da far diventare asincrone con i vari start, success/failure
export const fetchCategories = () => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_SUCCESS,
        payload: categories
    }
}

export const fetchProductsForCategory = (categoryId) => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_SUCCESS,
        payload: products
    }
}
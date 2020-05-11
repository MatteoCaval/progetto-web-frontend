import CatalogActionType from "./catalog.types";

const categories = [
    {
        id: 1,
        name: "Prima categoria"
    },
    {
        id: 2,
        name: "Seconda categoria"
    },
    {
        id: 3,
        name: "Terza categoria"
    }
]

const products = [
    {
        id: 1,
        name: "Primo Prodotto"
    },
    {
        id: 2,
        name: "Secondo Prodotto"
    },
    {
        id: 3,
        name: "Terzo Prodotto"
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
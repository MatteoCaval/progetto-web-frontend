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

export const fetchCategories = () => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_SUCCESS,
        payload: categories
    }
}
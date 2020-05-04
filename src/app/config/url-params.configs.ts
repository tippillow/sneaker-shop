import { DEFAULT } from './constants/url.constants';

export const URL_PARAMS = {
    GET_SHOE: (model: string) => `${DEFAULT}/${model}`,
    GET_BRAND_ITEMS: (brand: string) => `${DEFAULT}/${brand}`,
    GET_SEARCHED_ITEM: (searchedItem: string) => `${DEFAULT}/${searchedItem}`,
};

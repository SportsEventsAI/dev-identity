import { guid } from '../../models/guid';

import { ApiResult, deleteAsync, postAsync, putAsync, useGet } from '../helpers/useHttp';
import { ItemEditData } from './ItemEditForm';
import { EItemSearchType, Item, ItemHeader, ItemsSearchRequest, ValidTextRequest } from './models';

const apiBaseUrl = import.meta.env.VITE_AD_B2C_REACT_REDIRECT_URI || 'http://localhost:5000/api';

export function useGetItems(): [ApiResult<ItemHeader[]>, () => void] {
    const url = `${apiBaseUrl}/Items/`;

    const result = useGet<ItemHeader[]>(url);
    return result;
}

export async function deleteItem(id: guid): Promise<boolean> {
    const url = `${apiBaseUrl}/Items/${id}`;

    const result = await deleteAsync<boolean>(url);
    return result || false;
}

export function useItem(id: guid): [ApiResult<Item>, () => void] {
    const url = `${apiBaseUrl}/Items/${id}`;

    const result = useGet<Item>(url);
    return result;
}

export async function editItem(id: guid, item: ItemEditData): Promise<boolean> {
    const url = `${apiBaseUrl}/Items/${id}`;

    const result = await putAsync<ItemEditData, boolean>(url, item);
    return result || false;
}

export async function createItem(item: ItemEditData): Promise<boolean> {
    const url = `${apiBaseUrl}/Items/`;

    const result = await postAsync<ItemEditData, boolean>(url, item);
    return result || false;
}

export async function isTextValid(text: string): Promise<boolean> {
    const url = `${apiBaseUrl}/Items/valid-text`;

    const result = await postAsync<ValidTextRequest, boolean>(url, { text });
    return result || false;
}

export async function searchItems(type: EItemSearchType, text: string): Promise<ItemHeader[] | null> {
    const url = `${apiBaseUrl}/Items/search`;

    const result = await postAsync<ItemsSearchRequest, ItemHeader[]>(url, { type: +type, text });
    return result;
}

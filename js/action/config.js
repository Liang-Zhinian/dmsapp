import * as storageService from '../services/storage';

export const setConfig = (key, value)=> {
    return storageService.setItem(key, value);
}

export const updateConfig = (key, value)=> {
    return storageService.mergeItem(key, value);
}

export const removeConfig = (key)=>{
	return storageService.removeItem(key);
}

export const getConfig = (key)=> {
	return storageService.getItem(key);
}
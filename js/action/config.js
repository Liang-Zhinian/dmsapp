import * as storageService from '../services/storage';

export const updateConfig = (key, value)=> {
    return storageService.mergeItem(key, value);
}

export const removeConfig = (key)=>{
	return storageService.removeItem(key);
}

export const getConfig = (key)=> {
	return storageService.getItem(key);
}
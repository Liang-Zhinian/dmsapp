
//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'Accounts'

//action types
export const LOGIN = `${NAME}/LOGIN`
export const RENEW = `${NAME}/RENEW`;
export const VALID = `${NAME}/VALID`;
export const saveLocalStorage = (key, item) => {
  //encriptación del token
  localStorage.setItem(key, item)
  return true
}
export const getLocalStorage = (key) => {
  const result = localStorage.getItem(key)
  //desencriptación del token 
  return result;
}

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key)
  return true;
}
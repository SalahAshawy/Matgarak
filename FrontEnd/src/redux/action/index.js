//Adding item into my cart
export const addCart=(product)=>{
    return{
    type: "ADDITEM",
    payload: product   
   }
  // console.log(product.id);
}
//REMOVING item into my cart
export const delCart=(product)=>{
    return{
    type: "DELITEM",
    payload: product   
   }
}

export const setLoginState = (isLoggedIn) => {
  return {
      type: "SET_LOGIN_STATE",
      payload: isLoggedIn
  }
}

export const setAccessToken = (accessToken) => ({
  type: "SET_ACCESS_TOKEN",
  payload: accessToken
});

export const clearAccessToken = () => ({
  type: "CLEAR_ACCESS_TOKEN"
});
// actions.js
export const setUserInfo = (userInfo) => ({
  type: "SET_USER_INFO",
  payload: userInfo,
});

export const clearUserInfo = () => ({
  type: "CLEAR_USER_INFO",
});
export const setNotUpdated = () => ({
  type: "UPDATE",
});







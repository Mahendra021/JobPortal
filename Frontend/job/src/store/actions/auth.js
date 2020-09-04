import * as actionType from './actionType';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionType.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionType.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = expirationDate => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationDate * 1000)
    }
}

export const authLogin = (email, password) => {

    return dispatch => {

        dispatch(authStart());

        var data =  AuthLogin(email, password)

        async function AuthLogin(email, password) {
            
            var data
            await fetch("http://localhost:8000/rest-auth/login/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then(response => response.json())
                .then((responseData) => {
                    const token = responseData.key;
                    data = responseData.key
                    if(token === undefined)
                    {
                        const error = responseData
                        dispatch(authFail("Invalid details. Please check the Email ID - Password combination.",error))
                    }
                    else
                    {
                        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                        localStorage.setItem('token', token);
                        localStorage.setItem('expirationDate', expirationDate);
                        dispatch(authSuccess(token));
                        dispatch(checkAuthTimeOut(3600));
                    }
                })
                .catch(error => {
                    dispatch(authFail(error))
                });

            return data
        }

        return data
    }
}

export const authSignup = (username, email, usertype, password1, password2) => {
    return dispatch => {
        dispatch(authStart());

         var data = AuthSignup(username, email, usertype, password1, password2)

        async function AuthSignup(username, email, usertype, password1, password2) {

            var data
            await fetch("http://localhost:8000/rest-auth/registration/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    user_type : usertype,
                    password1: password1,
                    password2: password2
                })
            })
                .then(response => response.json())
                .then((responseData) => {
                    const token = responseData.key;
                    data = responseData.key
                    if(token === undefined)
                    {
                        dispatch(authFail(responseData))
                        console.log(responseData);
                    }
                    else
                    {
                        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                        localStorage.setItem('token', token);
                        localStorage.setItem('expirationDate', expirationDate);
                        dispatch(authSuccess(token));
                        dispatch(checkAuthTimeOut(3600));
                        console.log(responseData)                       
                    }
                })
                .catch(error => {
                    dispatch(authFail(error))
                    console.log(error)
                });

                return data
        }

        return data
    }
}

export const authCheckState = () => {
    
    return dispatch => {

        const token = localStorage.getItem('token');
        
        if (token === undefined)
        {
            console.log(token)
            dispatch(logout());
        }
        else
        {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date())
            {
                dispatch(logout());
            }
            else
            {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

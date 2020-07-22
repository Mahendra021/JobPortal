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
    localStorage.removeItem('user');
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

        AuthLogin(email, password)

        async function AuthLogin(email, password) {
            var data = await fetch("http://localhost:8000/rest-auth/login/", {
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
                    console.log(responseData);
                    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                    localStorage.setItem('token', token);
                    localStorage.setItem('expirationDate', expirationDate);
                    dispatch(authSuccess(token));
                    dispatch(checkAuthTimeOut(3600));
                })
                .catch(error => {
                    dispatch(authFail(error))
                    console.log(error)
                });

            return data
        }
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());

        AuthSignup(username, email, password1, password2)

        async function AuthSignup(username, email, password1, password2) {
            await fetch("http://localhost:8000/rest-auth/registration/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password1: password1,
                    password2: password2
                })
            })
                .then(response => response.json())
                .then((responseData) => {
                    const token = responseData.key;
                    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                    localStorage.setItem('token', token);
                    localStorage.setItem('expirationDate', expirationDate);
                    dispatch(authSuccess(token));
                    dispatch(checkAuthTimeOut(3600));
                })
                .catch(error => {
                    dispatch(authFail(error))
                    console.log(error)
                });
        }
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            console.log(token)
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

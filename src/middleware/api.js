require('isomorphic-fetch');

export const CALL_API = Symbol('Call API');

export function callApi(endpoint, method, data, passCredentials) {
    let date = new Date();
    const antiCacheEndpoint = endpoint.split('?').length > 1 ?
        `${endpoint}&t=${date.getTime()}` :
        `${endpoint}?t=${date.getTime()}`;

    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    return fetch(antiCacheEndpoint, {
        method,
        headers,
        credentials: passCredentials ? 'same-origin' : undefined,
        body: method === 'get' ? undefined : JSON.stringify(data)
    }).then(checkStatus).then(response => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json().then(json => ({json, response}));
    }).then(({json, response}) => {
        if (!response.ok) {
            return Promise.reject(json);
        }

        return json;
    }).catch(err => {
        return err;
    });
}
export default store => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    const type = action.type;
    let {endpoint} = callAPI;

    const {
        method,
        types: [
            successType,
            failureType
        ],
        credentials,
        data
    } = callAPI;

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];

        return finalAction;
    }

    next(actionWith({type, data}));

    return callApi(endpoint, method, data, credentials).then(
        res => {
            let actionsChain = Array.isArray(successType) ? successType : [successType];

            if (res.response && !res.response.ok) {
                next(actionWith({
                    type: failureType,
                    data: Object.assign({}, data, {
                        error: res.message
                    })
                }))
            } else {
                for (let i = 0; i < actionsChain.length; i++) {
                    let actionType = actionsChain[i];

                    if (typeof(actionType) === 'function') {
                        res = actionType(res);
                    } else {
                        next(actionWith({
                            data: res,
                            type: actionType
                        }));
                    }
                }
            }
        },
        error => next(actionWith({
            type: failureType,
            data: Object.assign({}, data, {
                error: error.message
            })
        }))
    );
};

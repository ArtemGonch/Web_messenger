const Host = `http://${process.env.REACT_APP_HOST_IP_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/api/`

export async function ApiService(url, params = { headers: {} }) {
    const refreshToken = window.localStorage.getItem("refresh");
    const accessToken = window.localStorage.getItem("access");
    const newParams = {
        ...params,
    };
    if (accessToken) {
        newParams.headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${Host}${url}`, newParams);
    let data = null;
    if (response.status === 401 && refreshToken) {
        const refreshData = await fetch(
            `${Host}token/refresh/`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh: refreshToken,
                }),
            }
        );
        const { access } = await refreshData.json();
        console.log(access);
        window.localStorage.setItem("access", access);

        newParams.headers.Authorization = `Bearer ${access}`;
        const newresponse = await fetch(
            `${Host}${url}`,
            newParams
        );
        data = await newresponse.json();
    } else {
        data = await response.json();
    }

    return data;
}

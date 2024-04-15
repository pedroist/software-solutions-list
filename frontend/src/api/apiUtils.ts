type ValidationError = {
    detail:
        | string
        | {
              loc: string[]
              msg: string
              type: string
          }[]
}

export class HTTPError extends Error {
    status: number
    statusText: string
    data?: ValidationError

    constructor(
        status: number,
        statusText: string,
        data?: any,
        ...params: any[]
    ) {
        // Pass remaining arguments to parent constructor
        super(...params)

        // Maintains proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HTTPError)
        }

        this.name = "HTTPError"

        this.status = status
        this.statusText = statusText
        this.data = data
    }
}

const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await fetch(url, options)

    if (!response.ok) {
        try {
            const error = await response.json()
            throw new HTTPError(response.status, response.statusText, error)
        } catch (e) {
            if (e instanceof HTTPError) {
                throw e
            } else {
                throw new HTTPError(response.status, response.statusText)
            }
        }
    }

    const data = await response.json()
    return data
}

export async function get<T>(
    url: string,
    fetchOptions?: RequestInit
): Promise<T> {
    return fetchWrapper(url, {
        method: "GET",
        headers: {
            Pragma: "no-cache" /* Fix IE11 caching API responses */,
            "Content-Type": "application/json",
        },
        ...fetchOptions,
    })
}

export async function post<T>(
    url: string,
    params: any,
    fetchOptions?: RequestInit
): Promise<T> {
    return fetchWrapper(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
        ...fetchOptions,
    })
}

export async function delete_<T>(
    url: string,
    params: any,
    fetchOptions?: RequestInit
): Promise<T> {
    return fetchWrapper(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
        ...fetchOptions,
    })
}

export async function put<T>(
    url: string,
    params: any,
    fetchOptions?: RequestInit
): Promise<T> {
    return fetchWrapper(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
        ...fetchOptions,
    })
}

export async function patch<T>(
    url: string,
    params: any,
    fetchOptions?: RequestInit
): Promise<T> {
    return fetchWrapper(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
        ...fetchOptions,
    })
}

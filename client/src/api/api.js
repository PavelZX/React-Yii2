const OBJECT_QUERY = '/articles'

export default class ApiService {

    _apiBase = 'http://blog'

    fetchResource = async (url, prop={}) => {
        const res = await fetch(url, prop)
        if (!res.ok) {
            alert(`Could not fetch ${url} received ${res.status}`)
            throw new Error(`Could not fetch ${url} received ${res.status}`)
        }
        return await res.json()
    }

    getArticles = async () => {
        const res =  this.fetchResource(`${this._apiBase}${OBJECT_QUERY}`,{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        return res
    }

    deleteArticle = async (id) => {
        const res =  this.fetchResource(`${this._apiBase}${OBJECT_QUERY}/${id}`,{
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        return res
    }

    updateArticle = async (id, data) => {
        const res =  this.fetchResource(`${this._apiBase}${OBJECT_QUERY}/${id}`,{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this._transToArticles(data))
        })

        return res
    }

    createArticle = async (data) => {
        const res =  this.fetchResource(`${this._apiBase}${OBJECT_QUERY}`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this._transToArticles(data))
        })

        return res
    }

    _transToArticles = (article) => {
        return {
            id: article.id,
            title: article.title,
            created_at: article.created_at,
            body: article.body,
        }
    }

}
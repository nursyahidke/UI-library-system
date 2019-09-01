import Axios from 'axios'

export const getBooks = () => {
    return {
        type: "GET_BOOK",
        payload: Axios.get("http://localhost:8000/books")
    }
}

export const addBook = (title, description, image, released_date, genre_id) => {
    return {
        type: "ADD_BOOK",
        payload: Axios.post("http://localhost:8000/books", {
            title,
            description,
            image,
            released_date,
            genre_id
        })
    }
}

export const updateBook = (id, title, description, image) => {
    return {
        type: "UPDATE_BOOK",
        payload: Axios.put(`http://localhost:8000/books`, {
            title,
            description,
            image
        })
    }
}

export const deleteBook = id => {
    return {
        type: "DELETE_BOOK",
        payload: Axios.delete(`http://localhost:8000/books?id=${id}`)
    }
}

export const borrowBook = id => {
    let token = window.localStorage.getItem("access_token")
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft()
    }
    return {
        type: "BORROW_BOOK",
        payload: Axios.post("http://localhost:8000/books/borrow?id=" + id, "",
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                x_token: token
            }
        })
    }
}

export const returnBook = id => {
    return {
        type: "RETURN_BOOK",
        payload: Axios.post(`http://localhost:8000/books/return?id=${id}`)
    }
}

export const getBorrow = () => {
    let token = window.localStorage.getItem("access_token")
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft()
    }
    return {
        type: "GET_BORROW_BOOK",
        payload: Axios.get(`http://localhost:8000/books/unavailable`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                x_token: token
            }
        })
    }
}

export const getGenres = () => {
    return {
        type: "GET_GENRES",
        payload: ("http://localhost:8000/books/genres")
    }
}
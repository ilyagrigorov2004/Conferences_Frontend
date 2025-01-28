import { AUTHORS_MOCK } from './Mock'
export interface AuthorI {
    author_id: number
    name: string
    description: string
    url: string
    department: string
    birthdate: string 
}

export interface ActiveConferenceI {
    id: number
    authors_count: number
}

export interface AuthorsI {
    current_conference: ActiveConferenceI
    authors: AuthorI[]
}

export const getAuthors = async (search_author = ""): Promise<AuthorsI> => {
    return fetch(`/api/Authors/?search_author=${search_author}`).then(
        (response) => response.json()
    ).catch(() => {
        let result: AuthorsI = { current_conference: AUTHORS_MOCK.current_conference, authors: [] }
        AUTHORS_MOCK.authors.forEach((author: AuthorI) => {
            if (author.name.includes(search_author) || author.department.includes(search_author))
                result.authors.push(author)
        })
        return result
    })
}

export const getAuthor = async (id: number): Promise<AuthorI> => {
    return fetch(`/api/Author/${id}/`).then(
        (response) => response.json()
    ).catch(() => {
        AUTHORS_MOCK.authors.forEach((author: AuthorI) => {
            if (author.author_id === id)
                return author
        })
    })
}
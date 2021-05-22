import mysql from "mysql2"

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "lab2",
})

export interface Book {
    id: string
    title: string
    author: string
    type: string
    publisher: string
    description: string
}

export interface User {
    username: string
    password: string
    id: string
}

export interface Student {
    id: string
    name: string
    gender: "男" | "女"
    age: number
    department: string
}

export interface BookQuery {
    id: string
    title: string
    author: string
    type: string
    publisher: string
    sqlLike: boolean
}

export function findOneAdmin(admin: {
    username: string
    password: string
}): Promise<boolean> {
    const { username, password } = admin
    return new Promise<boolean>((resolve, reject) => {
        db.query(
            `SELECT * FROM admin WHERE username = '${username}' AND password = '${password}'`,
            (error, results: any[]) => {
                if (error) {
                    reject(error)
                }
                if (results && results.length > 0) {
                    resolve(true)
                }
                resolve(false)
            }
        )
    })
}

export function findOneUser(user: {
    username: string
    password: string
}): Promise<boolean> {
    const { username, password } = user
    return new Promise<boolean>((resolve, reject) => {
        db.query(
            `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`,
            (error, results: any) => {
                if (error) {
                    reject(error)
                }
                if (results && results.length > 0) {
                    resolve(true)
                }
                resolve(false)
            }
        )
    })
}

export function addOneUser(user: User): Promise<boolean> {
    const { username, password, id } = user
    return new Promise<boolean>((resolve, reject) => {
        db.query(
            `INSERT INTO user (username, password,id) VALUES (${username},${password},${id})`,
            (error, results) => {
                if (error) {
                    reject(error)
                }
                console.log(results)
                if (results) {
                    resolve(true)
                }
                resolve(false)
            }
        )
    })
}

export function addOneStudent(student: Student): Promise<boolean> {
    const { id, name, gender, age, department } = student
    return new Promise<boolean>((resolve, reject) => {
        db.query(
            `INSERT INTO student(id, name, gender, age, department) VALUES ('${id}','${name}','${gender}','${age}','${department}')`,
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    db.query(
                        `INSERT INTO add_student(admin, student) VALUES ('admin','${id}')`,
                        (error, results) => {
                            if (error) {
                                reject(error)
                            }
                            if (results) {
                                resolve(true)
                            }
                            resolve(false)
                        }
                    )
                } else {
                    resolve(false)
                }
            }
        )
    })
}

export function addOneBook(book: Book): Promise<boolean> {
    const { id, title, author, type, publisher, description } = book
    return new Promise<boolean>((resolve, reject) => {
        db.query(
            `INSERT INTO book(id, title, author, type, publisher, description) VALUES ('${id}','${title}','${author}','${type}','${publisher}','${description}')`,
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    db.query(
                        `INSERT INTO add_book(admin, book) VALUES ('admin','${id}')`,
                        (error, results) => {
                            if (error) {
                                reject(error)
                            }
                            if (results) {
                                resolve(true)
                            }
                            resolve(false)
                        }
                    )
                } else {
                    resolve(false)
                }
            }
        )
    })
}

export function getOneBook(book: Book): Promise<Book> {
    const { id } = book
    return new Promise<Book>((resolve, reject) => {
        db.query(
            `SELECT * FROM book WHERE id = ${id}`,
            (error, results: any[]) => {
                if (error) {
                    reject(error)
                }
                if (results && results.length === 1) {
                    resolve(results[0])
                }
                reject(new Error("can not find book"))
            }
        )
    })
}

export function getBooks(query: BookQuery): Promise<Array<Book>> {
    const { id, title, author, type, publisher, sqlLike } = query

    const sql = sqlLike
        ? `SELECT * FROM book WHERE ${
              id ? "id LIKE '" + id + "%'" : true
          } AND ${title ? "title LIKE '" + title + "%'" : true} AND ${
              author ? "author LIKE '" + author + "%'" : true
          } AND ${type ? "type LIKE '" + type + "%'" : true} AND ${
              publisher ? "publisher LIKE '" + publisher + "%'" : true
          }`
        : `SELECT * FROM book WHERE ${id ? "id = '" + id + "'" : true} AND ${
              title ? "title = '" + title + "'" : true
          } AND ${author ? "author = '" + author + "'" : true} AND ${
              type ? "type = '" + type + "'" : true
          } AND ${publisher ? "publisher = '" + publisher + "'" : true}`

    return new Promise<Array<Book>>((resolve, reject) =>
        db.query(sql, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results) {
                resolve(results as [])
            }
            resolve([])
        })
    )
}

export function getUsers(): Promise<Array<User>> {
    return new Promise<Array<User>>((resolve, reject) => {
        db.query(`SELECT * FROM user`, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results) {
                resolve(results as [])
            }
            resolve([])
        })
    })
}

export function borrowBook(username: string, bookID: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE storage SET num = num - 1 WHERE book = '${bookID}'`,
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    db.query(
                        `INSERT INTO borrow_book(user, book) VALUES ('${username}','${bookID}')`,
                        (error, results) => {
                            if (error) {
                                reject(error)
                            }
                            if (results) {
                                resolve(true)
                            }
                            resolve(false)
                        }
                    )
                } else {
                    resolve(false)
                }
            }
        )
    })
}

export function returnBook(username: string, bookID: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE storage SET num = num + 1 WHERE book = '${bookID}'`,
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    db.query(
                        `INSERT INTO return_book(user, book) VALUES ('${username}','${bookID}')`,
                        (error, results) => {
                            if (error) {
                                reject(error)
                            }
                            if (results) {
                                resolve(true)
                            }
                            resolve(false)
                        }
                    )
                } else {
                    resolve(false)
                }
            }
        )
    })
}

export function deleteUser(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM user WHERE username = '${username}'`,
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    resolve(true)
                }
                resolve(false)
            }
        )
    })
}

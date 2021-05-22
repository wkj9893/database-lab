import TextField from "@material-ui/core/TextField"
import React, { useEffect, useState } from "react"
import styles from "../styles/user.module.css"
import Button from "@material-ui/core/Button"
import BookTable from "../components/BookTable"
import { Book, borrowBook } from "../database"
import Swal from "sweetalert2"

export default function user() {
    const [books, setBooks] = useState<Array<Book>>([])
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [type, setType] = useState("")
    const [publisher, setPublisher] = useState("")
    const [bookID, setBookID] = useState("")

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        const idQuery = id ? "id=" + id : ""
        const titleQuery = title ? "title=" + title : ""
        const authorQuery = author ? "author=" + author : ""
        const typeQuery = type ? "type=" + type : ""
        const publisherQuery = publisher ? "publisher=" + publisher : ""
        const response = await fetch(
            `/api/books?${idQuery}&${titleQuery}&${authorQuery}&${typeQuery}&${publisherQuery}`
        )
        setBooks(await response.json())
    }

    useEffect(() => {
        const getBooks = async () => {
            const idQuery = id ? "id=" + id : ""
            const titleQuery = title ? "title=" + title : ""
            const authorQuery = author ? "author=" + author : ""
            const typeQuery = type ? "type=" + type : ""
            const publisherQuery = publisher ? "publisher=" + publisher : ""
            const response = await fetch(
                `/api/books?${idQuery}&${titleQuery}&${authorQuery}&${typeQuery}&${publisherQuery}sqlLike=true`
            )
            setBooks(await response.json())
        }
        getBooks()
    }, [id, title, author, type, publisher])

    async function handleBorrow() {
        const username = window.location.pathname.slice(1)
        const response = await fetch("/api/borrow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, bookID }),
        })
        if (response.ok) {
            Swal.fire({
                title: "Success!",
                text: "Do you want to continue",
                icon: "success",
                confirmButtonText: "Cool",
            })
            return
        }
        Swal.fire({
            title: "Error!",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Cool",
        })
    }

    async function handleReturn() {
        const username = window.location.pathname.slice(1)
        const response = await fetch("/api/return", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, bookID }),
        })
        if (response.ok) {
            Swal.fire({
                title: "Success!",
                text: "Do you want to continue",
                icon: "success",
                confirmButtonText: "Cool",
            })
            return
        }
        Swal.fire({
            title: "Error!",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Cool",
        })
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    label="id"
                    onChange={(event) => setId(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="title"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="author"
                    onChange={(event) => setAuthor(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="type"
                    onChange={(event) => setType(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="publisher"
                    onChange={(event) => setPublisher(event.target.value)}
                />
                <Button variant="contained" type="submit">
                    search
                </Button>
            </form>
            <BookTable books={books} />
            <div className={styles.container}>
                <TextField
                    variant="filled"
                    label="书籍号码"
                    onChange={(event) => setBookID(event.target.value)}
                />
                <div className={styles.buttonGroup}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBorrow}
                    >
                        借阅
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReturn}
                    >
                        归还
                    </Button>
                </div>
            </div>
        </>
    )
}

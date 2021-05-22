import styles from "../styles/admin.module.css"
import React, { useState } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { Book, User } from "../database/index"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import BookTable from "../components/BookTable"
import UserTable from "../components/UserTable"
import Swal from "sweetalert2"

export default function admin() {
    // const [admin, setAdmin] = useState("");
    // const [book, setBook] = useState("");
    // const [user, setUser] = useState("");
    const [books, setBooks] = useState<Array<Book>>([])
    const [users, setUsers] = useState<Array<User>>([])

    const getBooks = async () => {
        const response = await fetch("/api/books")
        setBooks(await response.json())
    }
    const getUsers = async () => {
        const response = await fetch("/api/users")
        setUsers(await response.json())
    }

    const addBook = async () => {}

    const addUser = async () => {}

    return (
        <>
            <AppBar className="AppBar" position="static">
                <Toolbar className={styles.toolbar}>
                    <Typography
                        variant="h6"
                        style={{
                            color: "black",
                            fontSize: "18px",
                        }}
                    >
                        Admin
                    </Typography>
                    <Button>
                        <Typography
                            variant="h6"
                            style={{ fontSize: "18px" }}
                            onClick={getBooks}
                        >
                            Book
                        </Typography>
                    </Button>
                    <Button>
                        <Typography
                            variant="h6"
                            style={{ fontSize: "18px" }}
                            onClick={getUsers}
                        >
                            User
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>

            <Paper className={styles.paper} elevation={2}>
                <div className={styles.add}>
                    <AddUserDialog />
                    <AddBookDialog />
                    <DeleteUserDialog />
                </div>
                <BookTable books={books} />
                <UserTable users={users} />
            </Paper>
        </>
    )
}

function AddUserDialog() {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [department, setDepartment] = useState("")

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async () => {
        setOpen(false)
        const response = await fetch(`/api/students/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, gender, age, department }),
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
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Add Student
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>请输入学生信息</DialogContentText>
                    <TextField
                        label="Id"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setId(event.target.value)}
                    />
                    <TextField
                        label="Name"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        label="Gender"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setGender(event.target.value)}
                    />
                    <TextField
                        label="Age"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setAge(event.target.value)}
                    />
                    <TextField
                        label="Department"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setDepartment(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

function AddBookDialog() {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [type, setType] = useState("")
    const [publisher, setPublisher] = useState("")
    const [description, setDescription] = useState("")

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async () => {
        setOpen(false)
        const response = await fetch(`/api/books/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                author,
                type,
                publisher,
                description,
            }),
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
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Add Book
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
                <DialogContent>
                    <DialogContentText>请输入图书信息</DialogContentText>
                    <TextField
                        label="Id"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setId(event.target.value)}
                    />
                    <TextField
                        label="Title"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        label="Author"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                    <TextField
                        label="Type"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setType(event.target.value)}
                    />
                    <TextField
                        label="Publisher"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setPublisher(event.target.value)}
                    />
                    <TextField
                        label="Description"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

function DeleteUserDialog() {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("")

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async () => {
        setOpen(false)
        const response = await fetch(`/api/users/${username}`, {
            method: "DELETE",
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
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Delete User
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText>请输入用户名</DialogContentText>
                    <TextField
                        label="Id"
                        margin="normal"
                        fullWidth
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

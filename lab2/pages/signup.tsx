import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import styles from "../styles/signup.module.css"
import Swal from "sweetalert2"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Link from "@material-ui/core/Link"
import { useRouter } from "next/router"

export default function signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [id, setId] = useState("")
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (password !== confirmPassword) {
            Swal.fire({
                title: "Error!",
                text: "Do you want to continue",
                icon: "error",
                confirmButtonText: "Cool",
            })
            return
        }
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, id }),
        })
        if (response.ok) {
            Swal.fire({
                title: "Success!",
                text: "Do you want to continue",
                icon: "success",
                confirmButtonText: "Cool",
            })
            router.push(`/${username}`)
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
        <Paper className={styles.paper} elevation={3}>
            <Typography
                variant="h4"
                style={{ textAlign: "center", marginTop: "40px" }}
                gutterBottom
            >
                signup
            </Typography>
            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    label="Username"
                    variant="filled"
                    fullWidth
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="filled"
                    fullWidth
                    onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                    type="password"
                    label="Confirm Password"
                    variant="filled"
                    fullWidth
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <TextField
                    type="text"
                    label="Your Student ID"
                    variant="filled"
                    fullWidth
                    onChange={(event) => setId(event.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    signup
                </Button>
                <Typography>
                    Already have an account?
                    <Link href="/signin"> Sign in</Link>
                </Typography>
            </form>
        </Paper>
    )
}

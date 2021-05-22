import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import styles from "../styles/signin.module.css"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Swal from "sweetalert2"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Link from "@material-ui/core/Link"
import router from "next/router"

export default function signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user")

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        const response = await fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, role }),
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
                style={{ textAlign: "center", marginBottom: "30px" }}
                gutterBottom
            >
                signin
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
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">
                        Role
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        value={role}
                        onChange={(event: any) => setRole(event.target.value)}
                    >
                        <MenuItem value={"user"}>User</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    signin
                </Button>
                <Typography>
                    Don't have an account?
                    <Link href="/signup"> Sign Up</Link>
                </Typography>
            </form>
        </Paper>
    )
}

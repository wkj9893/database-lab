import Typography from "@material-ui/core/Typography"
import router from "next/router"
import { useEffect } from "react"

export default function index() {
    useEffect(() => {
        router.push("/signin")
    }, [])
    return (
        <>
            <Typography variant="h3" align="center">
                DataBase Lab
            </Typography>
        </>
    )
}

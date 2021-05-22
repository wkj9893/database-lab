import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { User } from "../database"

export default function UserTable(props: { users: Array<User> }) {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>username</TableCell>
                    <TableCell>password</TableCell>
                    <TableCell>id</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.users.map((user) => (
                    <TableRow key={user.username}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.password}</TableCell>
                        <TableCell>{user.id}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

import { Book } from "../database"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

export default function BookTable(props: { books: Array<Book> }) {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>title</TableCell>
                    <TableCell>author</TableCell>
                    <TableCell>type</TableCell>
                    <TableCell>publisher</TableCell>
                    <TableCell>description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.books.map((book) => (
                    <TableRow key={book.id}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.type}</TableCell>
                        <TableCell>{book.publisher}</TableCell>
                        <TableCell>{book.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

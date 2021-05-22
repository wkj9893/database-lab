interface record {
    A: string
    B: string
}

//  1MB RAM
const RAMSize = 1000000
//  length of records
const recordsLength = 1000000
//  a single record size
const recordSize = 32
//  a single sort block size
const blockSize = Math.floor(RAMSize / recordSize)
//  num of mergeSort ways
const num = Math.ceil(recordsLength / blockSize)

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomString(length: number) {
    const result = []
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
        )
    }
    return result.join("")
}

function generateRecords(file: Deno.File) {
    file.truncateSync()
    for (let i = 0; i < recordsLength; i++) {
        //	4 byte integer
        const A = getRandomInt(-2147483648, 2147483647)
        const B = getRandomString(18 - A.toString().length)
        file.writeSync(
            new TextEncoder().encode(JSON.stringify({ A, B }) + "\n")
        )
    }
}

function blockSort(inputFile: Deno.File, outputFile: Deno.File) {
    inputFile.seekSync(0, Deno.SeekMode.Start)
    outputFile.truncateSync()
    for (let i = 0; i < recordsLength / blockSize; i++) {
        const array = new Uint8Array(blockSize * recordSize)
        inputFile.readSync(array)
        const records = new TextDecoder().decode(array).split("\n")
        records.pop()
        records.sort((a, b) => JSON.parse(a).A - JSON.parse(b).A)
        outputFile.writeSync(
            new TextEncoder().encode(records.join("\n") + "\n")
        )
    }
}

function merge(outputFileRead: Deno.File, outputFileWrite: Deno.File) {
    outputFileWrite.seekSync(0, Deno.SeekMode.End)
    const array = new Array(num).fill(0).map((_, index) => index * blockSize)
    let result: string[] = []
    const records: Array<Array<string>> = new Array(num).fill([])
    const size =
        Math.floor(blockSize / (num + 1)) > 0
            ? Math.floor(blockSize / (num + 1))
            : 1
    //  records init
    for (let i = 0; i < num; i++) {
        const arr = new Uint8Array(recordSize * size)
        outputFileRead.seekSync(i * blockSize * recordSize, Deno.SeekMode.Start)
        outputFileRead.readSync(arr)
        const s = new TextDecoder().decode(arr).split("\n")
        s.pop()
        records.push(s)
    }
    while (true) {
        if (array.length === 0) {
            outputFileWrite.writeSync(new TextEncoder().encode(result.join("")))
            return
        }
        let [minKey, minValue] = [0, getRecord(0)]
        for (let i = 1; i < array.length; i++) {
            const record = getRecord(i)
            if (JSON.parse(record).A < JSON.parse(minValue).A) {
                minKey = i
                minValue = record
            }
        }
        records[minKey].shift()
        array[minKey]++
        result.push(minValue + "\n")
        if (result.length === blockSize) {
            outputFileWrite.writeSync(new TextEncoder().encode(result.join("")))
            result = []
        }
        if (
            array[minKey] % blockSize === 0 ||
            array[minKey] === recordsLength
        ) {
            array.splice(minKey, 1)
            records.splice(minKey, 1)
        }
    }
    function getRecord(index: number) {
        if (records[index].length > 0) {
            return records[index][0]
        }
        const arr = new Uint8Array(recordSize * size)
        outputFileRead.seekSync(array[index] * recordSize, Deno.SeekMode.Start)
        outputFileRead.readSync(arr)
        const s = new TextDecoder().decode(arr).split("\n")
        s.pop()
        records[index] = s
        return records[index][0]
    }
}

const inputFile = Deno.openSync("input.txt", { read: true, write: true })
const outputFileRead = Deno.openSync("output.txt", { read: true })
const outputFileWrite = Deno.openSync("output.txt", { write: true })

console.time("generateRecords")
generateRecords(inputFile)
console.timeEnd("generateRecords")
console.time("blockSort")
blockSort(inputFile, outputFileWrite)
console.timeEnd("blockSort")
console.time("merge")
merge(outputFileRead, outputFileWrite)
console.timeEnd("merge")
// command to run the program               deno run --allow-read --allow-write main.ts

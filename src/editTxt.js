import { promises as fs } from 'fs';

let filePath = `src/contatos.txt`

export async function save(newData) {
    const data = await fs.readFile(filePath, 'utf8');
    const dataUpdate = data + newData + '\n';
    await fs.writeFile(filePath, dataUpdate, 'utf8');
}

export async function list() {
    const data = await fs.readFile(filePath, 'utf8');
    const dataArray = data.split('\n').filter(Boolean)
    return dataArray
}
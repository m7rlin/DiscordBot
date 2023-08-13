import { readFile } from 'node:fs/promises'

export default async function getPackageJson() {
    const fileUrl = new URL('../../package.json', import.meta.url)
    const parsedPackageJSON = JSON.parse(await readFile(fileUrl, 'utf8'))

    return parsedPackageJSON
}

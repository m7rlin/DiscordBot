export default function displayResourcesUsage() {
    // Resources info usage
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    console.log(`RAM usage ${Math.round(used * 100) / 100} MB`)
}

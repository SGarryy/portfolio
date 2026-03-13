export function createLineChart(containerId, points) {
    const container = document.getElementById(containerId)
    const width = 500
    const height = 300
    const max = Math.max(...points)
    const stepX = (width - 100) / (points.length - 1)
    let polyPoints = ""
    points.forEach((p, i) => {
        const x = 50 + i * stepX
        const y = 250 - (p / max) * 180
        polyPoints += `${x},${y} `
    })
    const svg = `
    <svg viewBox="0 0 ${width} ${height}" class="sketch-chart">
        <line x1="50" y1="250" x2="450" y2="250" stroke="black" stroke-width="2"/>
        <line x1="50" y1="250" x2="50" y2="50" stroke="black" stroke-width="2"/>
        <polyline
        class="chart-line"
        points="${polyPoints}"
        fill="none"
        stroke="#2b6cb0"
        stroke-width="3"
        stroke-linecap="round"/>
    </svg>
    `
    container.innerHTML = svg
}
export function createBarChart(containerId, values) {
    const container = document.getElementById(containerId)
    const width = 500
    const height = 300
    const max = Math.max(...values)
    const barWidth = 60
    let bars = ""
    values.forEach((v, i) => {
        const x = 80 + i * 100
        const h = (v / max) * 180
        const y = 250 - h
        bars += `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}"
        class="sketch-bar"/>
        `
    })
    const svg = `
    <svg viewBox="0 0 ${width} ${height}" class="sketch-chart">
        <line x1="40" y1="250" x2="460" y2="250" stroke="black"/>
        <line x1="40" y1="250" x2="40" y2="40" stroke="black"/>
        ${bars}
    </svg>
    `
    container.innerHTML = svg
}
export function createConfusionMatrix(containerId, matrix) {
    const container = document.getElementById(containerId)
    const svg = `
    <svg viewBox="0 0 300 300" class="sketch-chart">
        <rect x="50" y="50" width="80" height="80" fill="#c6f6d5"/>
        <rect x="130" y="50" width="80" height="80" fill="#fed7d7"/>
        <rect x="50" y="130" width="80" height="80" fill="#fed7d7"/>
        <rect x="130" y="130" width="80" height="80" fill="#c6f6d5"/>
        <text x="90" y="100">${matrix[0][0]}</text>
        <text x="170" y="100">${matrix[0][1]}</text>
        <text x="90" y="180">${matrix[1][0]}</text>
        <text x="170" y="180">${matrix[1][1]}</text>
    </svg>
    `
    container.innerHTML = svg
}
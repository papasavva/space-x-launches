function rightPad(phrase: string, length = 15): string {
    return `${phrase}${' '.repeat(length - phrase.length)}`
}

export { rightPad }

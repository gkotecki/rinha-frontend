console.clear()

export function parseJson(inputStr: any) {
  // console.log(">> parseJson()", inputStr)
  let cursor = 0

  function skipSpaces() {
    while (
      inputStr[cursor] === " " ||
      inputStr[cursor] === "\n" ||
      inputStr[cursor] === "\r" ||
      inputStr[cursor] === "\t"
    ) {
      cursor++
    }
  }

  function parseValue() {
    skipSpaces()
    const char = inputStr[cursor]

    if (char === "{") {
      return parseObject()
    } else if (char === "[") {
      return parseArray()
    } else if (char === '"') {
      return parseString()
    } else if (char === "t" && inputStr.slice(cursor, cursor + 4) === "true") {
      cursor += 4
      return true
    } else if (char === "f" && inputStr.slice(cursor, cursor + 5) === "false") {
      cursor += 5
      return false
    } else if (char === "n" && inputStr.slice(cursor, cursor + 4) === "null") {
      cursor += 4
      return null
    } else if (
      !isNaN(char) ||
      (char === "-" && !isNaN(inputStr[cursor + 1])) ||
      (char === "-" && inputStr[cursor + 1] === "." && !isNaN(inputStr[cursor + 2]))
    ) {
      return parseNumber()
    }

    return undefined
  }

  function parseString(): string {
    let result = ""
    cursor++ // skip the opening double-quote

    while (inputStr[cursor] !== '"') {
      result += inputStr[cursor]
      cursor++
    }

    cursor++ // skip the closing double-quote
    // console.log("parseString()", result)
    return result
  }

  function parseNumber(): number {
    let start = cursor
    while (
      !isNaN(inputStr[cursor]) ||
      inputStr[cursor] === "-" ||
      inputStr[cursor] === "." ||
      inputStr[cursor] === "e" ||
      inputStr[cursor] === "E"
    ) {
      cursor++
    }

    const num = parseFloat(inputStr.slice(start, cursor))
    // console.log("parseNumber()", num)
    if (isNaN(num)) {
      throw new Error(`Invalid number: ${inputStr.slice(start, cursor)}`)
    }
    return num
  }

  function parseArray(): any[] {
    cursor++ // skip the opening bracket
    const arr = []

    while (inputStr[cursor] !== "]") {
      const value = parseValue()
      arr.push(value)
      skipSpaces()
      if (inputStr[cursor] === ",") {
        cursor++
        skipSpaces()
      }
    }

    cursor++ // skip the closing bracket
    // console.log("parseArray()", arr)
    return arr
  }

  function parseObject(): Record<string, any> {
    cursor++ // skip the opening curly brace
    const obj = {}
    skipSpaces()

    while (inputStr[cursor] !== "}") {
      const key = parseString()
      skipSpaces()
      cursor++ // skip the colon
      skipSpaces()
      const value = parseValue()
      obj[key] = value
      skipSpaces()

      if (inputStr[cursor] === ",") {
        cursor++
        skipSpaces()
      }
    }

    cursor++ // skip the closing curly brace
    // console.log("parseObject()", obj)
    return obj
  }

  return parseValue()
}

// const jsonString =
//   '{ "name": "John", "age": 30, "neg": -123, "isStudent": false, "grades": [-95, 88, -76], "address": {"street": "123 Main St", "city": "Example", "empty": {} }, "empArr": []}'
// const jsonString = `
// {
//   "Actors": [
//     {
//       "name": "Tom Cruise",
//       "age": 56,
//       "Born At": "Syracuse, NY",
//       "Birthdate": "July 3, 1962",
//       "photo": "https://jsonformatter.org/img/tom-cruise.jpg",
//       "wife": null,
//       "weight": 67.5,
//       "hasChildren": true,
//       "hasGreyHair": false,
//       "children": [
//         "Suri",
//         "Isabella Jane",
//         "Connor"
//       ]
//     },
//     {
//       "name": "Robert Downey Jr.",
//       "age": 53,
//       "Born At": "New York City, NY",
//       "Birthdate": "April 4, 1965",
//       "photo": "https://jsonformatter.org/img/Robert-Downey-Jr.jpg",
//       "wife": "Susan Downey",
//       "weight": 77.1,
//       "hasChildren": true,
//       "hasGreyHair": false,
//       "children": [
//         "Indio Falconer",
//         "Avri Roel",
//         "Exton Elias"
//       ]
//     }
//   ]
// }
// `
// const parsedData = parseJson(jsonString)
// console.log(`\n\n${JSON.stringify(JSON.parse(jsonString))}`)
// console.log(JSON.stringify(parsedData))
// console.log(parsedData)

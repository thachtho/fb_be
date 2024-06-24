import { danang } from "../data/danang"

const getAddress = (content: string) => {
    for (const district of danang.district) {
      const data = getStreet(district.street, content)
  
      if (data) {
        const fullData = `${data}, ${district.name}, ${danang.name}, Việt Nam`
        return fullData
      }
    }
  
    return null
}
  
const getStreet = (streets: string[], content: string) => {
    for (const street of streets) {
      const lowerCaseStr = content.toLowerCase()
      const lowerCaseSubStr = street.toLowerCase()
      const data = lowerCaseStr.includes(lowerCaseSubStr)
  
      if (data) {
        return street
      }
    }
  
    return null
}

export {
    getAddress
}
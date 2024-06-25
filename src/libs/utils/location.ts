import { danang } from "../data/danang"

const getFullAddress = (content: string) => {
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

const getAddressReceiveAndDeliver = (message: string) => {
  let receive = null;
  let deliver = null
  const addressA = getAddressV1(message)

  if (addressA) {
    const addressB = getAddressV1(message, addressA, true)
    
    if (addressA && addressB) {
      receive = addressA;
      deliver = addressB;

      const streets = [{
          address: addressA,
          position: 0
        }, 
        {
          address: addressB,
          position: 0
        }
      ]

      const newStreests = streets.map(city => {
        const index = message.toLowerCase().indexOf(city.address.toLowerCase());
          console.log('city', index)
        return {
          ...city,
          position: index
        }
      });
      
      if (newStreests[0].position > newStreests[1].position) {
        receive = addressB;
        deliver = addressA
      }

    } else {
      receive = addressA
    }
  }

  return {
    receive: receive ? getFullAddress(receive) : null,
    deliver: deliver ? getFullAddress(deliver) : null,
  }
}

const getAddressV1 = (message: string, condition = '', isCheck =  false) => {
  for (const district of danang.district) {
    const data = getStreet(district.street, message)

    if (data) {
      if (isCheck && data === condition) {
        continue;
      }

      return data;
    }
  }
}

export {
  getFullAddress, getAddressReceiveAndDeliver
}
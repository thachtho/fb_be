import { IDistance } from "src/shared/interface"
import { danang } from "../data/danang"
import { getDistance } from "geolib"

const getFullAddress = (street: string, message: string) => {
    for (const district of danang.district) {
      const data = getStreet(district.street, street)
  
      if (data) {
        const numberHome = getNumberHome(message, street)
        // const fullData = `${numberHome ? numberHome : ''} ${data}, ${district.name}, ${danang.name}, Việt Nam`;
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
    receive: receive ? getFullAddress(receive, message) : null,
    deliver: deliver ? getFullAddress(deliver, message) : null,
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

const getNumberHome = (street: string, message: string) => {
  let numberHome = null
  street = street.toLowerCase();
  message = message.toLowerCase();
  
  // Sử dụng regex để tìm địa chỉ trước chuỗi con "Hà huy tập"
  const regex = new RegExp(`(\\S+)\\s+${message}`);
  const match = street.match(regex);
  
  if (match && match[1]) {
    numberHome = match[1];
  }

  return numberHome
}

function calculateTravelTime(distance: number, speed: number) {
  const timeInHours = distance / speed;
  const timeInMinutes = timeInHours * 60;
  
  return {
      hours: timeInHours.toFixed(1),
      minutes: timeInMinutes.toFixed(1)
  };
}

function calculateDistance(locationA: IDistance, locationB: IDistance) {
  const distance = getDistance(
    locationA,
    locationB
  );

  return distance ? parseFloat((distance / 1000).toFixed(1)) : null;
}

export {
  getFullAddress, getAddressReceiveAndDeliver, calculateDistance, calculateTravelTime
}
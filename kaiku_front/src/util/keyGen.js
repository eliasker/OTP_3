// Function for generating key:s for html elements, parameter str is name from the element
const generateKey = (str) => {
  return str + Math.floor(Math.random() * (99999))
}

export default { generateKey }
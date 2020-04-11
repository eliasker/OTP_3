import axios from 'axios'
const baseUrl = 'http://localhost:3003/lang'

//get lang pack from server  && store & return
const setLangPack = (reference) => {
  const ref = reference
  //axios.get(`${baseUrl}/?lang=${ref}`)
  return axios.get(baseUrl)
    .then(response => {
      response = response.data
      updateStorage(response)
      console.log(response)
      return response
    })
}

//Get currently stored lang pack
const getCurrentLangPack = () => {
  const data = readStorage()
  return data
}

export default { setLangPack, getCurrentLangPack }


//**********************************************************************/
// UTILITY //
function updateStorage(langPack){
  const data = JSON.stringify(langPack)
  localStorage.setItem('lang', data)
}

function readStorage(){
  const data = JSON.parse(localStorage.getItem('lang'))
  console.log('Lang-pack loaded', data)
  return data
}
//**********************************************************************/

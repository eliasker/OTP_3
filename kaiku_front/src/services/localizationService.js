import axios from 'axios'
import config from '../util/config'

const jsonBaseUrl = 'http://localhost:3001/lang';
const BASEURI = config.BASEURI

//get lang pack from server  && store & return
const setLangPack = async (reference) => {
  try{
    const response = await axios.get(
      `${BASEURI}api/locale/?identicator=${reference}`
      )
      updateStorage(response.data)
      return response.data
  } catch(e){
  }
}

//Get currently stored lang pack
const getCurrentLangPack = () => {
  const data = readStorage();
  return data;
}

export default { setLangPack, getCurrentLangPack }


//**********************************************************************/
// UTILITY //
function updateStorage(langPack){
  const data = JSON.stringify(langPack);
  localStorage.setItem('lang', data);
}

function readStorage(){
  const data = JSON.parse(localStorage.getItem('lang'));
  console.log('Lang-pack loaded', data);
  return data;
}
//**********************************************************************/

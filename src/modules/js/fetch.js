import axios from 'axios'

function fetch(url, params) {
  return new Promise( (resolve, reject) => {
    axios.post(url, params).then(res => {
      let status = res.data.status
      if (status == 200) {
        resolve(res)
      }
      reject(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetch
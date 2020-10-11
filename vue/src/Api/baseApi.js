import 'whatwg-fetch'
import _ from 'lodash'

export let customHeaders = []

export const setCustomHeaders = function ({ headers }) {
  customHeaders = headers
}

let generateHeaders = function ({ headers, overwrite }) {
  const result = {}
  // Set default request headers
  _.forEach(headers, (value, key) => {
    result[`${key}`] = value
  })

  // Set or overwrite headers with custom header values
  _.forEach(customHeaders, header => {
    // Only overwrite if it's unset, set to true, or the value is unset
    if ((overwrite === undefined || overwrite) || _.size(result[header.name]) <= 0) {
      result[`${header.name}`] = header.value
    }
  })

  return result
}

let createApiError = response => {
  return {
    url: response.url,
    message: response.statusText,
    statusCode: response.status
  }
}

export const getJson = function ({ url }) {
  return new Promise((resolve, reject) => {
    window.fetch(url, {
      method: 'get',
      headers: generateHeaders({ headers: { } })
    }).then(response => {
      // Check if the response was ok
      if (response.ok) {
        // Parse as json
        return response.json()
      } else {
        // Request failed
        throw createApiError(response)
      }
    }).then(data => {
      // Done
      resolve(data)
    }).catch(exception => {
      reject(exception)
    })
  })
}

export const getFile = function ({ url }) {
  return new Promise((resolve, reject) => {
    window.fetch(url, {
      method: 'get',
      headers: generateHeaders({ headers: { } })
    }).then(response => {
      // Check if the response was ok
      if (response.ok) {
        // Return raw data
        return response.blob()
      } else {
        // Request failed
        throw createApiError(response)
      }
    }).then(data => {
      // Done
      resolve(data)
    }).catch(exception => {
      reject(exception)
    })
  })
}

export const postFile = function ({ url, fileName, fileStream, updateProgress }) {
  return new Promise((resolve, reject) => {
    // Create a request.
    let request = getXMLHttpRequest('POST', url)
    let data = new window.FormData()
    // Prepare the data.
    data.append('file', fileStream, fileName)

    if (updateProgress) {
      // Hook progress handler
      request.upload.addEventListener('progress', function (e) {
        // avoid /0
        if (e.total === 0) {
          updateProgress(100)
        } else {
          updateProgress(100 * (e.loaded / e.total))
        }
      })
    }

    request.onreadystatechange = function (oEvent) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          // Parse result
          let result = String

          if (request.response && request.response !== '') {
            result = JSON.parse(request.response)
          }

          // Get response data
          if (result) {
            resolve(result)
          } else {
            reject(oEvent)
          }
        } else {
          reject(oEvent)
        }
      }
    }

    // Create and send the form
    request.send(data)
  })
}

export const postJson = function ({ url, data, silentFail }) {
  return new Promise((resolve, reject) => {
    window.fetch(url, {
      method: 'post',
      headers: generateHeaders({
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      body: JSON.stringify(data)
    }).then(response => {
      // Check if the response was ok
      if (response.ok) {
        // Parse as json if there is content
        return response.text().then(function (text) {
          return text ? JSON.parse(text) : {}
        })
      } else if (silentFail === 'false' || !silentFail) {
        // Request failed
        throw createApiError(response)
      }
    }).then(data => {
      // Done
      resolve(data)
    }).catch(exception => {
      reject(exception)
    })
  })
}

export const putJson = function ({ url, data }) {
  return new Promise((resolve, reject) => {
    window.fetch(url, {
      method: 'put',
      headers: generateHeaders({
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      body: JSON.stringify(data)
    }).then(response => {
      // Check if the response was ok
      if (!response.ok) {
        throw createApiError(response)
      }
    }).then(() => {
      // Done
      resolve()
    }).catch(exception => {
      reject(exception)
    })
  })
}

export const deleteJson = function ({ url, data }) {
  return new Promise((resolve, reject) => {
    window.fetch(url, {
      method: 'delete',
      headers: generateHeaders({
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw createApiError(response)
      }
    }).then(data => {
      resolve(data)
    }).catch(exception => {
      reject(exception)
    })
  })
}

export const getXMLHttpRequest = function (method, uri) {
  // Create a request
  let request = new window.XMLHttpRequest()
  // Set custom headers
  _.forEach(customHeaders, header => {
    request.setRequestHeader(header.name, header.value)
  })
  // Open the request
  request.open(method, uri, true)
  // Return the request
  return request
}

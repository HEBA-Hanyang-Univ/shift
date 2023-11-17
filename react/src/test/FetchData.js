
export const FetchData = async (url, body) => {
  try {
    const ret = await fetch(url, { mode:'cors', method:"POST", body:JSON.stringify(body), headers: { "Content-Type": "application/json", }, })
    .then((response) => response.json()
    return ret
  } catch (error) {
    window.alert(error)
    return null
  }
}

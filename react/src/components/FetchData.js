
export const FetchData = async (url, method, body) => {
  try {
    const ret = await fetch(url, {
      mode:'cors',
      method:method,
      body:JSON.stringify(body),
      headers: { "Content-Type": "application/json", 'Accept': 'application/json',
      credentials: 'include',
    }, })
    .then((response) => response.json())
    return ret
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function post(endpoint: string, body: any) {
  const url = `http://localhost:3333/${endpoint}`

  const options: RequestInit = {
    method: "POST",
    credentials: "include",
  }

  console.log(body)

  if (body.file) {
    const formData = new FormData()

    const payload = { ...body }
    delete payload.file

    formData.append("data", JSON.stringify(payload))

    formData.append("image", body.file)
    options.body = formData

    return fetch(url, options)
  }

  options.headers = { "Content-Type": "application/json" }
  options.body = JSON.stringify(body)

  return fetch(url, options)
}


export async function list(endPoint: string, params: any){
  const url = `http://localhost:3333/${endPoint}`
  
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(params)
  })
}

export async function get(endPoint: string){
  const url = `http://localhost:3333/${endPoint}`
  console.log(url)
  
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
}



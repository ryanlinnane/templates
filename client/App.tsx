import { useEffect, useState } from 'react'
import './App.css'

console.log('RYAN' + import.meta.env.VITE_REACT_APP_IDX_ENV)

const WORKSPACE_URL = import.meta.env.VITE_REACT_APP_IDX_ENV ? 
 "https://3000-idx-chart-1732650981523.cluster-f4iwdviaqvc2ct6pgytzw4xqy4.cloudworkstations.dev" :
 '';

async function get(url) {
  const response = await fetch(url, {
    credentials: 'include',
  });
  const result = (await response.text());
  console.log(result)
  return result;
}


function App() {
  const [data, setData] = useState('')


  useEffect(() => {
    get(WORKSPACE_URL + '/api').then((res) => {
      setData(res)
    })
  }, [])
  return (
    <ul>
      <li>hello</li>
      <li>this is a test</li>
      {data !== '' && <li>{data}</li>}
      {/* <StockChart /> */}
    </ul>
  )
}

export default App

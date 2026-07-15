'use client'
import { useState } from 'react'
export default function App() {
const [query, setQuery] = useState('');
const [result, setResult] = useState(null)
const [searched, setSearched] = useState(false)
async function handleLookup(){
  const response = await fetch("/api/ai-search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question: query }),
});
  setSearched(true)
  if(response.ok){
    const data = await response.json()
    setResult(data)
  }
  else{
    setResult(null)
  }
}
  return(
    <>
      <input
      type="text" 
      name="mySearch"
      placeholder="Ask anything"
      value = {query}
      onChange={e=>setQuery(e.target.value)} />
      <button onClick={handleLookup}>Search</button>

      {searched && (
        result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <p>No results found.</p>
        )
      )}
    </>
  )
}
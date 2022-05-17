import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [data, setData] = useState(null)
  function fetchData() {
    return fetch('https://spotify-np-api.vercel.app/api').then(
      (response) => {
        return response.json();
      }
    ).then(
      (data) => {
        return data;
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    )
  }
  const getToast = () => {
    toast.promise(fetchData(), {
      loading: 'getting song data...',
      success: (data) => {
        setData(data)
        return 'fetched top song data'
      },
      error: "couldn't fetch data!",
    })
  }

  return (
    <div className="relative App flex justify-center items-center bg-red-200 w-screen h-screen flex-col gap-3 p-3">
      <button onClick={getToast} className='hover:rotate-3 duration-300 bg-red-400 -rotate-3 shadow-xl rounded-md px-6 py-2 text-rose-100 font-bolder' >🎵ㅤGet Song Data</button>
      {data && 
        <div className='hover:-rotate-1 duration-300 cursor-pointer bg-red-400 flex flex-col rotate-1 justify-center items-center h-1/4 w-full lg:w-1/3 md:w-1/2 shadow-2xl rounded-md p-4'>
          <h1 className='text-center text-2xl mb-3 text-red-100 font-bold'>ashish's top song for this week 🎵</h1>
          <h1 className='text-center text-xl font-bolder text-rose-100'>{data.top.song.toLowerCase()}</h1>
          <h1 className='text-center text-md font-bolder text-rose-200'>~ {data.top.artist}</h1>
        </div>
      }
      <h2 className='text-red-600 text-sm absolute bottom-0 text-center p-4'>made by ashish using react-hot-toast</h2>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            background: '#f87171',
            color: '#ffe4e6',
          }
        }}
      />
    </div>
  )
}

export default App
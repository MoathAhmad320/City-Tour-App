import Main from './Components/Main/Main'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {ConfigureStore} from './Redux/configureStore'
import { useEffect, useState } from 'react'
import img from './assets/random-map.jpg'


const store = ConfigureStore();

function App() {
  const [imageLink, setImageLink] = useState(img)

  useEffect(() => {
  
    const fetchData = async () => {
      const data = await fetch('https://api.unsplash.com/photos/random?query=places&client_id=UooSfsQji_v6dFkHQY7XPewYVc9lfQe0WwaWq32ygC4&orientation=landscape');
      const json = await data.json();
      setImageLink(json.urls.full)
    }
  
    fetchData()
      .catch(console.error);
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
      
      <style>{ `
        body {
          background-image: url(${imageLink});
        }
      `}
      </style>
    </Provider>
  );
}

export default App;

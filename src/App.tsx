import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import Login from './pages/Login'

function App() {

  return (
    <>
      <Provider store={store}>
        <div>Hello World</div>
        <Login />
      </Provider>
    </>
  )
}

export default App

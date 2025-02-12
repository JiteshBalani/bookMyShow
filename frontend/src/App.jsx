import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Admin from './pages/Admin'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile'
import Register from './pages/Register/Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SingleMovie from './pages/SingleMovie'
import AddShow from './pages/Admin/AddShow'
import BookShow from './pages/BookShow/BookShow'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
        <Route path='/movie/:id' element={
          <ProtectedRoute>
            <SingleMovie/>
          </ProtectedRoute>
        }/>
        <Route path='/admin' element={
          <ProtectedRoute adminOnly={true}>
            <Admin/>
          </ProtectedRoute>
        }/>
        <Route path='/add-show-by-movie/:movieId/:movieName' element={
          <ProtectedRoute adminOnly={true}>
            <AddShow/>
          </ProtectedRoute>
        }/>
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>
        <Route path="/book-show/:id" element={
          <ProtectedRoute>
            <BookShow />
          </ProtectedRoute>
          } />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

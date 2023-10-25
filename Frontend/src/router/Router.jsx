import {
    createBrowserRouter,
    Route,
    createRoutesFromElements
  } from 'react-router-dom'
  import Home from '../pages/Home'
  import NotFound from '../utils/NotFound'
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </>
    )
  )
  export default router
  
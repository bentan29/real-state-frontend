
import { Route, Routes } from 'react-router-dom'
import SidebarLayout from './components/sidebar-layout/SidebarLayout'
import { HomePage } from './pages/propertys-view/HomePage'
import { FilteredPage } from './pages/propertys-view/FilteredPage'
import { useDispatch, useSelector } from 'react-redux'
import { PropertyDetailsPage } from './pages/propertys-view/PropertyDetailsPage'
import { resetPropertysSlice } from './store/propertys-slice'
import { useEffect, useMemo } from 'react'
import { SellerPage } from './pages/auth/SellerPage'
import PrivateRoute from './Routes/PrivateRoute'
import { checkAuth } from './store/auth/auth-slice/thunk'
import { CommonLayout } from './components/layout/CommonLayout'
import { AccountPage } from './pages/auth/AccountPage'
import { FavouritesPages } from './pages/auth/FavouritesPages'
import { RelatorPage } from './pages/propertys-view/RelatorPage'

function App() {
  const dispatch = useDispatch()
  const filterState = useSelector((state) => state.filters); //- todos los filtros seleccionados
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

  //--- Evaluamos si los filtros estan vacios
  const isFilterEmpty = useMemo(() => Object.entries(filterState).every(([key, value]) => {
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object" && value !== null) return Object.values(value).every(v => v === "" || v === null);
    return value === "" || value === null;
  }), [filterState]);

  //--- Resetear el state de propertys solo cuando isFilterEmpty cambia a true
  useEffect(() => {
    if (isFilterEmpty) {dispatch(resetPropertysSlice())};
  }, [isFilterEmpty, dispatch]);


  //--- Verificar si tenemos session iniciada
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch, isAuthenticated])


  return (

    <Routes>

      {/* Rutas publicas */}
      <Route path="/" element={<SidebarLayout />}>
        <Route path="" element={ isFilterEmpty ? <HomePage /> : <FilteredPage />} />
      </Route>

      {/* <Route path="/propertyDetails/:id" element={<SidebarLayout />}>
        <Route path="" element={<PropertyDetailsPage/>}/>
      </Route> */}

      <Route path="/" element={<SidebarLayout />}>
        <Route path="propertyDetails/:id" element={<PropertyDetailsPage/>}/>
        <Route path="relator/:id" element={<RelatorPage/>}/>
      </Route>

      {/* Rutas privadas dentro del Sidebar */}
      <Route path="/account" element={
        <PrivateRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
          <SidebarLayout />
        </PrivateRoute>
      }>

        <Route path="seller" element={<SellerPage/>} />
        <Route path="userAccount" element={<AccountPage/>} />
        <Route path="favourites" element={<FavouritesPages/>} />
      </Route>

      {/* <Route path="/account" element={<SidebarLayout />}>
        <Route path="seller" element={
          <PrivateRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
            <SellerPage/>
          </PrivateRoute>
        } />
      </Route> */}

      <Route path='/prueba' element={<CommonLayout/>}>

      </Route>
       

    </Routes>
  )
}

export default App

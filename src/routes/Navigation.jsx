import { Route, Routes } from 'react-router'
import { HomePage } from '../pages/home/HomePage'
import { DetalleProductoPage } from '../pages/DetalleProducto/DetalleProductoPage'
import { MantenedorProductoListPage } from '../pages/MantenedorProducto/MantenedorProductoList/MantenedorProductoListPage'
import { MantenedorProductoFormPage } from '../pages/MantenedorProducto/MantenedorProductoForm/MantenedorProductoFormPage'
import { RegisterPage } from '../pages/Register/RegisterPage'
import { Page403 } from '../pages/Page403/Page403'
import { Page404 } from '../pages/Page404/Page404'
import { LoginPage } from '../pages/Login/LoginPage'
import { ProtectedRoutes } from './ProtectedRoutes'

const Navigation = () => {
  return (
        <Routes>
            {/* Rutas de la página principal */}
            <Route path="/" element={<HomePage/>}/>
            <Route path="/detalle-producto/:id" element={<DetalleProductoPage/>}/>

            {/* Rutas del Mantenedor de productos */}
            <Route path='/admin-producto' element={<ProtectedRoutes requiredRole="admin"> <MantenedorProductoListPage/> </ProtectedRoutes>}/>
            <Route path='/admin-producto/editar/:id' element={<ProtectedRoutes requiredRole="admin"><MantenedorProductoFormPage/></ProtectedRoutes>}/>
            <Route path='/admin-producto/nuevo' element={<ProtectedRoutes requiredRole="admin"><MantenedorProductoFormPage/></ProtectedRoutes>}/>

            {/* Rutas de autenticación */}
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/unauthorized" element={<Page403/>} />
            <Route path="*" element={<Page404/>} />
        </Routes>
    )
}

export default Navigation
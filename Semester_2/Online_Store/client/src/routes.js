import Admin from "./pages/Admin";
import {ADMIN_ROUTE, BASKET_ROUTE, ORDER_UPDATE_ROUTE, ADMIN_DEVICE_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, GETROLE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts";
import Basket from "./pages/Basket";
import OrderUpdate from "./pages/OrderUpdate";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import AdminDevicePage from "./pages/AdminDevicePage";

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ADMIN_DEVICE_ROUTE + '/:id',
        Component: AdminDevicePage
    },
    {
        path: ORDER_UPDATE_ROUTE + '/:id',
        Component: OrderUpdate
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: GETROLE_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
]

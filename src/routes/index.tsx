import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import UsersPage from "../pages/users";
import AdminLayout from "../layouts/admin";
import OpenBarPage from "../pages/open-bar";
import ViptablePages from "../pages/vip-tables";
import RateExchange from "../pages/rate-exchange";
import ConsumablePage from "../pages/consumable";
import GroupsEvents from "../pages/groups-events";
import Login from "../pages/login";
import PosLayout from "../layouts/pos";
import Products from "../pages/pos/products";
import OpenBar from "../pages/pos/open-bar";
import RequireAuth from "../components/require-auth";
import NoAuthorized from "../pages/no-authorize";
import PersistLogin from "../components/persist-login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/no-autorizado" element={<NoAuthorized />} />
     
      {/* <Route element={<PersistLogin />}>
        <Route element={<RequireAuth roles={["camarero"]} />}> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="usuarios" element={<UsersPage />} />
            <Route path="open-bar" element={<OpenBarPage />} />
            <Route path="mesas-vip" element={<ViptablePages />} />
            <Route path="tasas-de-cambio" element={<RateExchange />} />
            <Route path="productos" element={<ConsumablePage />} />
            <Route path="grupos-eventos" element={<GroupsEvents />} />
          </Route>
          <Route path="/punto-de-venta" element={<PosLayout />}>
            <Route path="productos" element={<Products />}></Route>
            <Route path="open-bar" element={<OpenBar />}></Route>
          </Route>
        {/* </Route>
      </Route>
     */}
    </Route>
  )
);

export default router;

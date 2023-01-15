import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="usuarios" element={<UsersPage />} />
        <Route path="open-bar" element={<OpenBarPage />} />
        <Route path="mesas-vip" element={<ViptablePages />} />
        <Route path="tasas-de-cambio" element={<RateExchange />} />
        <Route path="productos" element={<ConsumablePage />} />
        <Route path="grupos-eventos" element={<GroupsEvents />} />
      </Route>
      <Route path="/punto-de-venta" element={<PosLayout />}></Route>
    </Route>
  )
);

export default router;

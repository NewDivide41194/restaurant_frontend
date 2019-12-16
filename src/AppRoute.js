import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import * as RoutePath from "../src/config/routeConfig.js";
import Dashboard from "./features/Dashboard/container/dashContainer.js";
import AdminPanel from "./features/AdminPanel/container/panelContainer.js";
import Report from "./features/Report/container/reportContainer.js";
import Setting from "./features/Setting/container/settingContainer.js";
import SetUp from "./features/SetUp/container/setupContainer";
import Transactions from "./features/Transactions/container/transactionContainer.js";
import ViewTransactions from "./features/ViewTransactions/container/viewTranContainer.js";
import UserRole from "./features/pages/container/userRoleContainer";
import SignIn from "./features/Signin/container/signinContainer";
import Department from "./features/pages/container/departmentContainer";
import Designation from "./features/pages/container/designationContainer";
import EmployeeContainer from "./features/pages/container/employeeContainer.js";

const AppRoute = () => {
  return (
    <div>
      <div>
        <Router>
          <Switch>
            <Route path={`/`} exact component={SignIn} />
            <Route path={`/${RoutePath.Dashboard}`} component={Dashboard} />
            <Route path={`/${RoutePath.AdminPanel}`} component={AdminPanel} />
            <Route path={`/${RoutePath.Report}`} component={Report} />
            <Route path={`/${RoutePath.Setting}`} component={Setting} />
            <Route path={`/${RoutePath.SetUp}`} component={SetUp} />
            <Route
              path={`/${RoutePath.Transactions}`}
              component={Transactions}
            />
            <Route
              path={`/${RoutePath.ViewTransactions}`}
              component={ViewTransactions}
            />
            <Route path={`/${RoutePath.UserRole}`} component={UserRole} />
            <Route path={`/${RoutePath.Department}`} component={Department} />
            <Route path={`/${RoutePath.Designation}`} component={Designation} />
            <Route path={`/${RoutePath.Employee}`} component={EmployeeContainer} />

            <Redirect to={`/`} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};
export default AppRoute;

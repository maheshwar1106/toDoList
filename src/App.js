import LogIn from "./component/LogIn";
import SignUp from "./component/SignUp";
import GlobalState from "./context/GlobalState";
import Page from "./component/Page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import FormikSignUp from "./component/FormikSignUp";
import UpdatedFormik from "./FormikForm/UpdatedFormik";
import FormikValid from "./FormikForm/FormikValid";
import FormikAllFunctions from "./FormikForm/FormikAllFucntions";
import FormValidTwoForms from "./FormikForm/FormValidTwoForms";

function App() {
  return (
    // <FormikAllFunctions />
    // <FormValidTwoForms />
    <GlobalState>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="TodoList" element={<Page />}></Route>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="SignUp" element={<FormikSignUp />}></Route>
          <Route path="LogIn" element={<LogIn />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;

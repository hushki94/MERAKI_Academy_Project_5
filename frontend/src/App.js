import "./App.css";

import Stripe from "./components/services/payment/Stripe";
import { Login } from "./components/Auth/login/Login";
import Chat from "./components/services/Chat/chat";
import Process from "./components/services/Chat/process";
import Home from "./components/services/Chat/home";
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Auth/signup/signup";
import CreateFundRaiser from "./components/Header/Dropdown/Fundraiser/CreatefundRaiser";
import { useEffect } from "react";
import Section from "./components/section/section";
import Topfundraiser from "./components/TopFundraiser/Topfundraiser";
import Stories from "./components/stories/Stories";
import Leader from "./components/Leader/Leader";
import Random from "./components/Randomfundraisers/Random";
import FundRaiserView from "./components/FundRaiserView/FundRaiserView"
import CategoryByType from "./components/CategoryByType/CategoryByType";
import AccountSettings from "./components/Header/Dropdown/AccountSettings/AccountSettings";
import YourFundraisers from "./components/Header/Dropdown/YourFundraisers/yourFundraisers";
import DonateForSpecific from './components/Header/Dropdown/DonateForSpecific/DonateForSpecific';
import Footer from "./components/Footer/Footer";
import ReadyToStart from "./components/ReadyStart/ReadyToStart";
import AllCategory from "./components/AllCategory/AllCategory";

    // mshan allah
    // mshan allah
const socket = io.connect("http://localhost:5000");
function Appmain(props) {
  return (
    <> 
      <div>
        <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </div>
      <div>
        <Process />
      </div>
    </>
  );
}

function App() {
  return (
    <>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              {/* <Home socket={socket} /> */}
              <Section/>
              <Topfundraiser/>
              <Stories/>
              <Leader/>
              <Random/>
            <ReadyToStart/>
            </Route>
            <AccountSettings exact path ="/AccountSettings"/>
            <YourFundraisers exact path ="/YourFundraisers"/>
            <DonateForSpecific exact path ="/DonateForSpecific"/>
            <Route exact path="/category/:id"  component={CategoryByType}/> 
            <Route exact path="/allCategory" component={AllCategory}/>
            <Route path="/chat/:roomname/:username" component={Appmain} />
            <Route path="/fundraiser"  component={CreateFundRaiser} />
            <Route path="/fundraiserView/:id"  component={FundRaiserView} />
            {/* <Stripe /> */}
          </Switch>
          
        </div>
        {/* <Footer/> */}
    </>
  );
}

export default App;

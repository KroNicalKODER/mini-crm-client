import React, { useState, useEffect } from "react";
import { auth,signOut } from "./Utils/Firebase.jsx";
import Login from "./pages/login.jsx";
import Navbar from "./Utils/Navbar.jsx";
import MakeAudience from "./pages/makeAudience.jsx";
import Campaign from "./pages/campaign.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [audPage, setAudPage] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {
        user ? 
        <div className="d-flex justify-content-between my-3 px-4">
          <div className='d-flex'>
            <Navbar username = {user.displayName}/>
            <button
                onClick={signOutUser}
                className="btn btn-outline-danger btn-sm mx-3"
              > Signout</button>
          </div>
          <div>
            <button className="btn-sm btn mx-1 btn-outline-warning" onClick={()=>setAudPage(true)}>Make Audience</button>
            <button className="btn-sm btn mx-1 btn-outline-warning" onClick={()=>setAudPage(false)}>Campaigns</button>
          </div>
        </div>
        :
        <Navbar username = "Noname"/>
      }
      <div
        className="App d-flex justify-content-center flex-column align-items-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        {user ? ( 
          audPage?<MakeAudience email={user.email} />:<Campaign email={user.email}/>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default App;

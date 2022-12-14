import React, { useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useState } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import axios from "../components/Axios";
import ProfileContainer from "../components/ProfileContainer";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;
  const getUser = async () => {
    try {
      const response = await axios.get("/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("/gendered-users", {
        params: { gender: user?.gender_interest },
      });

      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // anytime a user is modified, this will run
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  // if user object exists, get matches array of objects, and turn it into an array of user ids.
  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    // also add own user id, so it doesnt show up
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    // if gendered user is not included in matched user ids, return it.
    (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  );

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {filteredGenderedUsers?.map((genderedUser) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.user_id}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                    className="card"
                  >
                    <h3>{genderedUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}! </p> : <p />}
              </div>
            </div>
          </div>
          <div className="profile-container">
            <ProfileContainer />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

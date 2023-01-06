import { useState, useContext } from "react";
import { Context } from "../../context";
import UserRoute from '../../components/routes/UserRoute';

const UserIndex = () => {

  const {
    state: { user },
  } = useContext(Context);


  return (
    <UserRoute>
        <h1 className="jumbotron top_pages text-center">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
    </UserRoute>
  );
};

export default UserIndex;

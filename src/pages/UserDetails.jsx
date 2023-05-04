import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDetails = ({ shortId }) => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const loadData = () => {
     const FETCH_USER_URL = `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/list/v1`;
        const PAYLOAD = {
          order: "ASC",
          sortBy: "points",
          page: 1,
          size: 10,
          shortId:shortId
        };

        const response = axios.post(FETCH_USER_URL,PAYLOAD);
        response.then((res) => setUserName(res.data))
    
        .catch((err) => console.log(`Question Tag Error: ${err}`));
    };
    if (shortId !== undefined) {
      loadData();
    }
  }, [shortId]);


  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
  <>
     {userName &&userName.map(name =>(
         <span> <Link>{ capitalizeWords(name.firstname) + ' '+capitalizeWords(name.lastname)}</Link> </span>
     ))}

</>
  );
};
export default UserDetails;

import { useSelector } from "react-redux";

export default function userAuth() {
  const { auth } = useSelector((state) => state);
  const { user } = auth || {}; // Safely access the `user` property

  if (user) {
    return true;
  } else {
    return false;
  }
}
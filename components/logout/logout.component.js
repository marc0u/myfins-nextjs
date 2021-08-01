import React from "react";
import { GoogleLogout } from "react-google-login";
import { MenuItem } from "@material-ui/core";

export default function ({ onClick }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const onFailure = () => console.log("Logout failed!");

  return (
    <GoogleLogout
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <MenuItem
          onClick={() => {
            renderProps.onClick();
            onClick();
          }}
        >
          Log out
        </MenuItem>
      )}
      onLogoutSuccess={handleLogout}
      onFailure={onFailure}
    />
  );
}

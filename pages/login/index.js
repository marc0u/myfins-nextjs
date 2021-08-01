import React from "react";
import { GoogleLogin, useGoogleLogout } from "react-google-login";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import myfinsAPI from "../../requests/myfinsapi";
import MainLayout from "../../layouts/main";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(10),
    justifyContent: "center",
  },
}));

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onLogoutSuccess = (res) => {
    myfinsAPI.logout();
  };

  const onFailure = (error) =>
    enqueueSnackbar(error.message, {
      variant: "error",
      persist: true,
    });

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const handleLogin = async (googleData) => {
    myfinsAPI
      .login(googleData.tokenId)
      .then((res) => {
        localStorage.setItem("sessionID", res.data.token);
        localStorage.setItem("userPicture", googleData.profileObj.imageUrl);
        window.location.reload();
      })
      .catch((error) => {
        myfinsAPI.notify(
          googleData.profileObj.name,
          googleData.profileObj.email
        );
        enqueueSnackbar(error.message, {
          variant: "error",
          persist: true,
        });
        return signOut();
      });
  };

  return (
    <MainLayout>
      <h2>Sign in</h2>
      <GoogleLogin
        clientId={clientId}
        buttonText="Continue with Google"
        onSuccess={handleLogin}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </MainLayout>
  );
}

export default Login;

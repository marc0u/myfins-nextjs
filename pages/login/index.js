import { NoSsr } from "@material-ui/core";
import MainLayout from "../../layouts/main";
import dynamic from "next/dynamic";

const LoginGoogle = dynamic(
  () => import("../../containers/logingoogle/logingoogle"),
  { ssr: false }
);

export default function Login() {
  return (
    <MainLayout>
      <NoSsr>
        <LoginGoogle />
      </NoSsr>
    </MainLayout>
  );
}

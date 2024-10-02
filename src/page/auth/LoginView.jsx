import FormAuth from "../../components/FormAuth";
import costumApi from "../../api";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { loginUser } from "../../features/userSlice";
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      // kirim data ke server untuk proses login
      const response = await costumApi.post("/auth/login", data);
      // jika berhasil, simpan data user di store redux
      store.dispatch(loginUser(response.data));
      toast.success("Login Berhasil");
      return redirect("/");
    } catch (error) {
      const errorMassage = error?.response?.data?.message;
      toast.error(errorMassage);
      return null;
    }
  };

const LoginView = () => {
  return (
    <main>
      <FormAuth />
    </main>
  );
};

export default LoginView;

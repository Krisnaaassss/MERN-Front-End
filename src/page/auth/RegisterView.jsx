import costumApi from "../../api";
import FormAuth from "../../components/FormAuth";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../features/userSlice";
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      // kirim data ke server untuk proses login
      const response = await costumApi.post("/auth/register", data);
      // jika berhasil, simpan data user di store redux
      store.dispatch(registerUser(response.data));
      toast.success("Login Berhasil");
      return redirect("/");
    } catch (error) {
      const errorMassage = error.response.data.message;
      toast.error(errorMassage);
      return null;
    }
  };
const RegisterView = () => {
  return (
    <main>
      <FormAuth isRegister={true} />
    </main>
  );
};

export default RegisterView;

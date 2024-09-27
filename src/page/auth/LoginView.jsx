/* eslint-disable react-refresh/only-export-components */
import FormAuth from "../../components/FormAuth";
import costumApi from "../../api";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await costumApi.post("/auth/login", data);
    console.log(response);
    return null;
  } catch (error) {
    const errorMassage = error.response.data.message;
    console.log(errorMassage);
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

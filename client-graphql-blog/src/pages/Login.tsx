import React from 'react';
import { useMutation } from '@apollo/client';
import jwt_decode from "jwt-decode";
import { LOGIN_USER, User,  } from "../Graphql";
import { GlobalData, MyState } from "../core";
import { FormLayout } from '../layouts';



export const Login: React.FC = () => {
  const { LoginUser } = React.useContext<MyState>(GlobalData);
  const [login, { error }] = useMutation(LOGIN_USER);

  const [formData, setFormData] = React.useState<User>({
    email: "",
    password: "",
  });

  const [terms, setTerms] = React.useState<boolean>(false);
  const [isFormDataValid, setIsFormDataValid] = React.useState<boolean>(false);

  const handleChange =
    (field: keyof User | string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = event.target;
      let fieldValue = field === "terms" ? checked : value;
      if (field === "terms") {
        setTerms(checked);
      } else {
        // setFormData({ ...formData, [field]: fieldValue  });
        setFormData({
          ...formData,
          [field]:
            field === "email" ? String(fieldValue).toLowerCase() : fieldValue,
        });
      }
    };

  React.useEffect(() => {
    const formDataValues = Object.values(formData);
    let formDataValues2 = formDataValues.every((value) => Boolean(value));
    setIsFormDataValid(true);
    if (formDataValues2 && terms) {
      setIsFormDataValid(false);
    }
  }, [formData, terms]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log({ formData });
    login({ variables: { email: formData.email, password: formData.password } })
      .then((res) => {
        const decoded: any = jwt_decode(res.data.login);

            const token = res.data.login;
            // 
            sessionStorage.setItem("user", JSON.stringify(decoded.user));
            LoginUser(token);
            //
            // sessionStorage.setItem("auth", token);
            // Guarda el token en sessionStorage
// sessionStorage.setItem("auth", "Bearer " + res.data.login);

        console.log(decoded);
      })
      .catch((error) => console.log(error));
  };

  if (error) {
     <h1 className="text-center mt-5 text-danger">* {error.message} *</h1>;
  };



  return (
    <FormLayout>
      <form className="mt-3" onSubmit={handleSubmit}>
    {error &&  <h1 className="text-center mt-2 text-danger">* {error.message} *</h1>}
        <h1>Login</h1>
        <label htmlFor="email">Email: </label> <br />
        <input
          type="email"
          id="email"
          onChange={handleChange("email")}
          value={formData?.email?.toLowerCase()}
          required
          placeholder="Password.."
        />
        <br /> <br />
        <label htmlFor="password">Password: </label> <br />
        <input
          type="password"
          onChange={handleChange("password")}
          value={formData.password}
          required
          placeholder="Password.."
        />
        <br /> <br />
        <label htmlFor="terms">Agree to Terms and Conditions</label>
        <input
          type="checkbox"
          onChange={handleChange("terms")}
          id="terms"
          className="m-2"
          required
        />{" "}
        <br />
        <button
          id="miBoton"
          className="btn btn-sm btn-success"
          disabled={isFormDataValid}
          type="submit"
        >
          Submit
        </button>
      </form>
    </FormLayout>
  );
}

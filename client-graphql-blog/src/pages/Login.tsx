import { useMutation } from '@apollo/client';
import React from 'react';
import { LOGIN_USER } from '../Graphql';
import { User } from '../Graphql/interfaces';

export const Login: React.FC = () => {
  const [login,  {error} ] = useMutation(LOGIN_USER);

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
        console.log(formData);
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
        const token = res.data.login;
        // Guarda el token en sessionStorage
        sessionStorage.setItem("token", token);
      })
      .catch((error) => console.log(error));
  };

  if (error?.message?.includes("User not found")) {
    return <h1 className="text-center mt-5 text-danger">* User not found *</h1>;
  }
   if (error?.message?.includes("Invalid credentials")) {
     return (
       <h1 className="text-center mt-5 text-danger">* Invalid credentials *</h1>
     );
   }
  
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
          required
        />{" "}
        <br />
        <button id="miBoton" disabled={isFormDataValid} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

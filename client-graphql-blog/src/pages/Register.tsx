import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../Graphql";
import { User } from "../Graphql/interfaces";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {

    const [register, { error }] = useMutation(CREATE_USER);
 
    const navigate = useNavigate();

    const imgDefault: string = "https://tse4.mm.bing.net/th?id=OIP.F24Hpc1CvAdlBi0W7qJMSAAAAA&pid=Api&P=0";
  
    const [formData, setFormData] = React.useState<User>({
    username: "",
    email: "",
    password: "",
    nickname: "",
    img: imgDefault,
  });

  const [terms, setTerms] = React.useState<boolean>(false);
  const [isFormDataValid, setIsFormDataValid] = React.useState<boolean>(false);

  const handleChange =
    (field: keyof User | string) =>
    (
      event: any
    ) => {
      const { checked, value } = event.target;
      let fieldValue = field === "terms" ? checked : value;
      if (field === "terms") {
        setTerms(checked);
      } else {
        // setFormData({ ...formData, [field]: fieldValue  });
        setFormData({
          ...formData,
          [field]:
            field === "email"
              ? String(fieldValue).toLowerCase()
              : field === "img" && !fieldValue
              ? imgDefault
              : fieldValue,
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

      if (!formData.img) {
        setFormData({
          ...formData,
          img: imgDefault,
        });
      }

    console.log({ formData });

register({
  variables: {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    nickname: formData.nickname,
    img: formData.img || imgDefault,
  },
})
  .then((res) => {
    console.log(res)
  navigate('/')
  })
  .catch((error) => {
    console.log(error);
  });
  

  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label> <br />
        <input
          type="text"
          id="username"
          onChange={handleChange("username")}
          value={formData.username}
          required
          placeholder="Username.."
        />
        <br /> <br />
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
        <label htmlFor="nickname">Nickname: </label> <br />
        <input
          type="text"
          id="nickname"
          onChange={handleChange("nickname")}
          value={formData.nickname}
          required
          placeholder="Nickname.."
        />{" "}
        <br /> <br />
        <label htmlFor="img">Image: </label> <br />
        <textarea
          id="img"
          onChange={handleChange("img")}

          style={{ width: "400px", height: "100px" }}
          placeholder="Your image .."
        ></textarea>
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
};

import React from 'react';
import { FormLayout } from '../layouts';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ONE_USER, UPDATE_USER, User } from '../Graphql';
import { GlobalData, MyState } from '../core';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


export const UpdateUser: React.FC = () => {
  const { currentUser } = React.useContext<MyState>(GlobalData);

  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const { data } = useQuery(GET_ONE_USER, {
    variables: { id: currentUser?._id },
  });

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<User | null>({});

  React.useEffect(() => {
    setFormData(data?.user);
  }, [data?.user, currentUser]);

  //  const [formData, setFormData] = React.useState<User | null>({
  //    username: data?.user?.username,
  //    email: "",
  //    nickname: "",
  //    img: "",
  //  });

  const handleChange = (field: keyof User) => (event: any) => {
    const { value } = event?.target;
    setFormData({ ...formData, [field]: value });
  };

  //! No funciona
  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined =  (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!currentUser?._id) {
      return "CurrentUser doesn't esxist";
    }

    const token = sessionStorage.getItem("auth");
    console.log(">>", token)
    updateUser({
      variables: {
        email: formData?.email || "",
        password: formData?.password || "",
        nickname: formData?.nickname || "",
        username: formData?.username || "",
        img: formData?.img || "",
      },
      context: {
        headers: {
          auth: token ? `Bearer ${token}` : "",
        },
      },
    })
      .then((res) => {
        // const decoded: any = jwt_decode(res.data.login);
        // console.log("decoded", decoded);
        const token = res.data.login;
        console.log("Token", token);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
         alert("Something went wrong..");
      });
    console.log("aqui", formData);
  };
    console.log("aqui fuera", formData);

  return (
    <FormLayout>
      <form onSubmit={handleSubmit} className="mt-3">
        <h1>Update User</h1>
        <label htmlFor="username">Username</label> <br />
        <input
          type="text"
          value={formData?.username || ""}
          onChange={handleChange("username")}
          placeholder="Username"
          required
          id="username"
        />{" "}
        <br /> <br />
        <label htmlFor="email">Email</label> <br />
        <input
          type="email"
          placeholder="Email"
          value={formData?.email || ""}
          onChange={handleChange("email")}
          required
          id="email"
        />{" "}
        <br /> <br />
        <label htmlFor="nickname">Nickname</label> <br />
        <input
          type="text"
          value={formData?.nickname || ""}
          onChange={handleChange("nickname")}
          placeholder="Nickname"
          required
          id="nickname"
        />{" "}
        <br /> <br />
        <label htmlFor="password">Password</label> <br />
        <input
          type="password"
          value={formData?.password || ""}
          onChange={handleChange("password")}
          placeholder="Password"
          required
          id="password"
        />{" "}
        <br /> <br />
        <label htmlFor="img">Image </label> <br />
        <textarea
          id="img"
          value={formData?.img || ""}
          onChange={handleChange("img")}
          placeholder="Image"
        ></textarea>
        <br /> <br />
        <button type="submit">Submit</button>
      </form>
    </FormLayout>
  );
}

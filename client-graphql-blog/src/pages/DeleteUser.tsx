import React from 'react';
import { FormLayout } from '../layouts';
import { useMutation } from '@apollo/client';
import { DELETE_USER,  User } from '../Graphql';
import { GlobalData, MyState } from '../core';

export const DeleteUser: React.FC = () => {

  const {currentUser, LogoutUser} = React.useContext<MyState>(GlobalData);
  const [ deleteUser, { error }] = useMutation(DELETE_USER);


  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (field: keyof User) => (event: any) => {
    const { value } = event.target;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const token = sessionStorage.getItem("auth");
    deleteUser({
      variables: {
        id: currentUser?._id,
        email: formData.email,
        password: formData.password,
      },
      context: {
        headers: {
          auth: token ? `Bearer ${token}` : "",
        },
      },
    })
       .then((res) => {
        sessionStorage.removeItem("user");
        LogoutUser();
       })
      .catch((err) => console.log(err));

  };



  return (
    <FormLayout>
      <form id="formPosting" className='mt-3' onSubmit={handleSubmit}>
        <label>
          <b>Delete Account</b>
        </label>
        <div className="div1">
          <input
            required
            className="inputPosting"
            type="email"
            name="email"
            placeholder="Text a title for the post"
            onChange={handleChange("email")}
          />{" "}
          <br />
          <input
            required
            className="inputPosting"
            type="password"
            name="password"
            placeholder="Text a something "
            onChange={handleChange("password")}
          />
          <br />
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className=" text-center btnPosting btn btn-sm btn-primary"
            >
              <b>Send</b>
            </button>
          </div>
        </div>
      </form>
    </FormLayout>
  );
}

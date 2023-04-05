import React from 'react';
import { FormLayout } from '../../layouts';
import { CREATE_POST, Post } from '../../Graphql';
import './stylePosting.scss'
import { useMutation } from '@apollo/client';

export const FormPosting: React.FC = () => {

  const [createPost, { error }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      window.location.reload();
      },
      onError: (err) => {
        console.log(err);
      }
    });

  const [formData, setFormData] = React.useState({
   title: "",
   body: ""
  });

const handleChange = (field: keyof Post) => (event: any) => {
     const { value } = event.target;
     setFormData({...formData, [field]: value });
     console.log(formData)
};

const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
  event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();
   
   const token = sessionStorage.getItem("auth");
   createPost({
    variables: 
     { title: formData.title,
      body: formData.body},
      context: {
        headers: {
          auth: token ? `Bearer ${token}` : "",
         }
        },
      })
  .then(res => console.log(res))
  .catch(err => console.log(err));   

  };


  return (
    <FormLayout>
      <form id="formPosting" onSubmit={handleSubmit}>
        <label>
          <b>Create a Post</b>
        </label>
        <div className="div1">
          <input
            required
            className="inputPosting"
            type="text"
            name="title"
            placeholder="Text a title for the post"
            onChange={handleChange("title")}
          />{" "}
          <br />
          <input
            required
            className="inputPosting"
            type="text"
            name="body"
            placeholder="Text a something "
            onChange={handleChange("body")}
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

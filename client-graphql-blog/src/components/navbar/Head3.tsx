import React from 'react';

export const Head3: React.FC = () => {

const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
  event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
  };

  return (
    <div className="head3">
      <label htmlFor="searching">Search a user</label>
      <form onSubmit={handleSubmit}>
        <input type="text" id="searching" placeholder=".." required />
        <button className=" btn btn-sm btn-outline-primary" type="submit">
          <b>Send</b>
        </button>
      </form>
    </div>
  );
}

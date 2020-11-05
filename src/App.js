import "./App.css";
import { useEffect, useState } from "react";
import Amplify from "aws-amplify";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

import gql from "graphql-tag";
import client from "./client";
import { listTodos } from "./graphql/queries";

import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    client
      .query({
        query: gql(listTodos),
      })
      .then(({ data: { listTodos } }) => {
        // todos = listTodos.items;
        setTodos(listTodos.items);
      });
  }, [todos]);

  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        {todos.map((item) => {
          return (
            <div key={item.id} style={{display:"flex", justifyContent: "center"}}>
              <h2>{item.name}</h2>&nbsp;&nbsp;
              <h2>{item.complete ? "completed" : "pending"}</h2>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default withAuthenticator(App);

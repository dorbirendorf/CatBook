import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Pane, Button, Text, Heading, Avatar } from "evergreen-ui";

export default class Navbar extends Component {
  render() {
    return (
      <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600} marginRight={20}>
            Cat-Book
          </Heading>
          <Avatar
            src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
            size={60}
          />
        </Pane>
        <Pane>
          {/* Below you can see the marginRight property on a Button. */}
          <Button marginRight={16} is="a" href="/signup">
            Create an acount
          </Button>
          <Button appearance="primary" is="a" href="/signin">
            Login
          </Button>
        </Pane>
      </Pane>
    );
  }
}

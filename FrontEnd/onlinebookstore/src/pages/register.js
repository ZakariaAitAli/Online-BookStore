import React from "react";
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
  Link,
  Navbar,
  Switch,
} from "@nextui-org/react";
import { Mail } from "./components/Mail";
import { Password } from "./components/Password";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SSRProvider } from "@react-aria/ssr";

export default function Register() {
  const router = useRouter();


  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  async function registerUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/onlinebookstore_war_exploded/signup-servlet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${email}&password=${password}&passwordConfirm=${passwordConfirm}`,
      }
    );

    if (response.ok) {
      alert("Registration successful");
      router.push("/login");
    } else {
      alert("Registration failed");
    }
  }

  return (
    <SSRProvider>
    <div>
      <Navbar>
        <Navbar.Brand href="#">Online Bookstore</Navbar.Brand>
        <Navbar.Content align="right">
          <Link href="/login">Login</Link>
          <Spacer x={0.5} />
          <Link href="/register">Register</Link>
          <Switch
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            aria-label="Switch theme"
          />
        </Navbar.Content>
      </Navbar>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: "80vh" }}
      >
        <form onSubmit={registerUser}>
          <Card css={{ mw: "420px", p: "20px" }} variant="shadow">
            <Text
              size={24}
              weight="bold"
              css={{
                as: "center",
                mb: "20px",
              }}
            >
              Register
            </Text>
            <Input
              id="email"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<Mail fill="currentColor" />}
              aria-label="Email"
            />
            <Spacer y={1} />
            <Input
              type="password"
              id="password"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              contentLeft={<Password fill="currentColor" />}
              css={{ mb: "6px" }}
              aria-label="Password"
            />
            <Spacer y={1} />
            <Input
            type="password"
              id="passwordConfirm"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Confirm password"
              contentLeft={<Password fill="currentColor" />}
              css={{ mb: "6px" }}
              aria-label="Confirm password"
            />
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>I agree to the terms and conditions</Text>
              </Checkbox>
            </Row>
            <Spacer y={1} />
            <Button color="primary" onPress={registerUser}>
              Register
            </Button>
          </Card>
        </form>
      </Container>
    </div>
    </SSRProvider>
  );
}

import { useState, useEffect } from "react";
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
import Alert from "@mui/material/Alert";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("user") == null
    ) {
      router.push("/login");
    } else {
      router.push("/catalog");
    }
  }, []);

  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/onlinebookstore_war_exploded/login-servlet?email=" +
          email +
          "&password=" +
          password,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const user = await response.json();
        console.log("User:", user);
        sessionStorage.setItem("user", JSON.stringify(user));
        router.push("/catalog");
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
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
      <form onSubmit={handleLogin}>
        <Container
          display="flex"
          alignItems="center"
          justify="center"
          css={{ minHeight: "80vh" }}
        >
          <Card css={{ mw: "420px", p: "20px" }} variant="shadow">
            <Text
              size={24}
              weight="bold"
              css={{
                as: "center",
                mb: "20px",
              }}
            >
              Login
            </Text>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<Mail fill="currentColor" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
            <Spacer y={1} />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              type="password"
              placeholder="Password"
              contentLeft={<Password fill="currentColor" />}
              css={{ mb: "6px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text size={14}>
                <Link>Forgot password?</Link>
              </Text>
            </Row>
            <Spacer y={1} />
            {error && <Alert severity="error">Invalid email or password</Alert>}
            <Spacer y={0.5} />
            <Button color="primary" onPress={handleLogin}>
              Sign in
            </Button>
          </Card>
        </Container>
      </form>
    </div>
  );
}

import {
  Card,
  Grid,
  Navbar,
  Pagination,
  Row,
  Text,
  Link,
  Spacer,
  Switch,
  Button,
  CssBaseline,
  Loading,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme, Badge, Dropdown } from "@nextui-org/react";
import {
  ShoppingCartIcon,
  BookOpenIcon,
  UserIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { SSRProvider } from "@react-aria/ssr";

function Cart() {
  const router = useRouter();

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("user") == null
    ) {
      router.push("/login");
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("user");
    router.push("/login");
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        const parsedCartItems = JSON.parse(storedCartItems);
        setCartItems(parsedCartItems);
      } catch (error) {
        console.error("Error parsing cart items:", error);
      }
    }
  }, []);

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    toast.error(item.title + " removed from cart!");
  };

  const checkout = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    const data = {
      items: cartItems,
      totalPrice: totalPrice,
    };

    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:8080/onlinebookstore_war_exploded/payment-servlet"
        );

        const json = await response.json();

        if (response.ok) {
          toast.success("Payment successful!");
          setCartItems([]);
          sessionStorage.removeItem("cartItems");
        } else {
          toast.error("Payment failed!");
        }
      } catch (error) {
        console.error("Error during payment:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }

    fetchData();
  };

  return (
    <SSRProvider>
      <div>
        <ToastContainer />
        <Head>
          <title>Online Bookstore - Catalog</title>
        </Head>
        <CssBaseline />
        <Navbar>
          <Navbar.Brand href="#">Online Bookstore</Navbar.Brand>
          <Navbar.Content align="right">
            <Navbar.Link>
              <Button
                as={Link}
                href="/catalog"
                auto
                css={{ padding: "$4" }}
                light
              >
                Books Catalog <Spacer x={0.5} />
                <BookOpenIcon width={24} />
              </Button>
            </Navbar.Link>
            <Spacer x={0.5} />
            <Navbar.Link>
              <Button as={Link} href="/cart" auto css={{ padding: "$4" }} light>
                Cart <Spacer x={0.5} />
                <Badge color="primary" content={cartItems.length}>
                  <ShoppingCartIcon width={24} />
                </Badge>
              </Button>
            </Navbar.Link>
            <Spacer x={0.5} />
            <Navbar.Link>
              <Dropdown>
                <Dropdown.Button color="default" light>
                  User <Spacer x={0.5} />
                  <UserIcon width={24} />
                </Dropdown.Button>
                <Dropdown.Menu
                  color="default"
                  variant="light"
                  aria-label="Actions"
                >
                  <Dropdown.Item key="new">Profile</Dropdown.Item>
                  <Dropdown.Item key="new">Orders</Dropdown.Item>
                  <Dropdown.Item key="new">Settings</Dropdown.Item>
                  <Dropdown.Item key="logout" withDivider>
                    <Navbar.Link>
                      <Button onClick={logout} auto light>
                        Logout
                      </Button>
                    </Navbar.Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Link>
            <Switch
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </Navbar.Content>
        </Navbar>
        <Grid.Container gap={5} justify="flex-start">
          {cartItems.map((item, index) => (
            <Grid xs={6} sm={3} key={index}>
              <Card
                isHoverable={true}
                variant="bordered"
                css={{ w: "250px", h: "350px" }}
                //   as={Link}
                //   href={`catalog/${item.id}`}
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={item.image != null ? item.image : "#"}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    alt={item.title}
                  />
                </Card.Body>
                <Card.Footer isBlurred css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>{item.title}</Text>
                    <Spacer x={0.5} />
                    <Text
                      css={{
                        color: "$accents7",
                        fontWeight: "$semibold",
                        fontSize: "$sm",
                      }}
                    >
                      Price : {item.price} $
                    </Text>
                    <Spacer x={0.5} />
                    <Button
                      auto
                      css={{ padding: "$4" }}
                      light
                      onClick={() => removeFromCart(item)}
                    >
                      <TrashIcon width={24} />
                    </Button>
                  </Row>
                </Card.Footer>
              </Card>

              <Spacer y={1} />
            </Grid>
          ))}

          {cartItems.length === 0 && (
            <Row justify="center">
              <Text b css={{ fontSize: "$2xl", color: "$accents7" }}>
                Cart is empty!
              </Text>
              <Spacer y={4} />
            </Row>
          )}
        </Grid.Container>
        {cartItems.length > 0 && (
          <Row justify="center">
          <Text b>
            total price :{" "}
            {cartItems.reduce((a, c) => a + c.price, 0).toFixed(2)} $
          </Text>
          <Spacer y={1} />
          <Button auto color="primary" onClick={checkout}>
            Checkout
          </Button>
        </Row>
        )}
      </div>
    </SSRProvider>
  );
}

export default Cart;

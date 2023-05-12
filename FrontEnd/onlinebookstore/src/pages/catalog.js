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
} from "@heroicons/react/solid";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function Catalog() {
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

  const logout = () => {
    sessionStorage.removeItem("user");
    router.push("/login");
  };

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const [cartItems, setCartItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("User:", user);
  }, []);

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:8080/onlinebookstore_war_exploded/book-servlet"
      );
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  if (!data.length) {
    return (
      <div>
        <Card css={{ w: "100%", h: "100vh", padding: "$4" }}>
          <Loading />
        </Card>
      </div>
    );
  }

  return (
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
                <Dropdown.Item key="logout" color="error" withDivider>
                  <Navbar.Link>
                    <Button onClick={logout} auto color="error" light>
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
        {data.map((item, index) => (
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
                    onClick={async () => {
                      const user = JSON.parse(sessionStorage.getItem("user"));
                      const updatedCartItems = [...cartItems, item]; // Create a new array with the updated cart items
                      const response = await fetch(
                        "http://localhost:8080/onlinebookstore_war_exploded/cart-servlet",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            user,
                            cartItems: updatedCartItems,
                          }), // Pass the updated cartItems array
                        }
                      );

                      if (response.ok) {
                        toast.success(`${item.title} added to cart`);
                        setCartItems(updatedCartItems); // Update the local state with the updated cart items
                        console.log("Cart:", updatedCartItems);
                      } else {
                        toast.error("Failed to add item to cart");
                      }
                    }}
                  >
                    +<ShoppingCartIcon width={24} />
                  </Button>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
      <center>
        <Pagination
          shadow
          items={data.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </center>
    </div>
  );
}

export default Catalog;

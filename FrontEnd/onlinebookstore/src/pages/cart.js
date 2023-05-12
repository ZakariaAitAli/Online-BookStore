import {
  Card,
  Grid,
  Navbar,
  Text,
  Link,
  Spacer,
  Button,
  CssBaseline,
} from "@nextui-org/react";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import Head from "next/head";

function Cart({ cartItems }) {
  return (
    <div>
      <Head>
        <title>Online Bookstore - Cart</title>
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
              Books Catalog
            </Button>
          </Navbar.Link>
          <Spacer x={0.5} />
          <Navbar.Link>
            <Button as={Link} href="/cart" auto css={{ padding: "$4" }} light>
              Cart <Spacer x={0.5} />
              <ShoppingCartIcon width={24} />
            </Button>
          </Navbar.Link>
        </Navbar.Content>
      </Navbar>
      <Grid.Container gap={5} justify="flex-start">
        {cartItems &&
          cartItems.map((item, index) => (
            <Grid xs={6} sm={3} key={index}>
              <Card
                isPressable
                variant="bordered"
                css={{ w: "250px", h: "350px" }}
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
                    onClick={() => {
                      // Remove item from cart
                    }}
                  >
                    Remove
                  </Button>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
      </Grid.Container>
      {!cartItems || cartItems.length === 0 ? (
        <center>
          <Text>No items in cart</Text>
        </center>
      ) : (
        <center>
          <Button auto css={{ padding: "$4" }} light>
            Checkout
          </Button>
        </center>
      )}
    </div>
  );
}

export default Cart;

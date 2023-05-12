import { GetServerSideProps, NextPage } from 'next'
import fetch from 'isomorphic-unfetch'
import { Card, Grid, Navbar, Pagination, Row, Text, Link, Spacer, Switch } from "@nextui-org/react";
import React from "react";
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'


const MyPage = ({ data }) => {
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();
    return (
        <div>
            <Navbar >
                <Navbar.Brand href="#">Online Bookstore</Navbar.Brand>
                <Navbar.Content align="right">
                    <Link href='/'>Home</Link>
                    <Link href="/login">Login</Link>
                    <Spacer x={0.5} />
                    <Link href="/register">Register</Link>
                    <Switch
                        checked={isDark}
                        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                    />
                </Navbar.Content>
            </Navbar>
            <h1>Data from Java EE Servlet:</h1>
            <Grid.Container gap={5} justify="flex-start">
                {data.map((item, index) => (
                    <Grid xs={6} sm={2} key={index}>
                        <Card isPressable>
                            <Card.Body css={{ p: 0 }}>
                                <Card.Image
                                    src={"#"}
                                    objectFit="cover"
                                    width="100%"
                                    height={140}
                                    alt={item.title}
                                />
                            </Card.Body>
                            <Card.Footer css={{ justifyItems: "flex-start" }}>
                                <Row wrap="wrap" justify="space-between" align="center">
                                    <Text b>{item.title}</Text>
                                    <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                                        {item.price} $
                                    </Text>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Grid>
                ))}
            </Grid.Container>
            <Pagination total={100} />
            <h1>Data from Java EE Servlet:</h1>
            <pre>{JSON.stringify(data, null, 16)}</pre>
        </div>
    )
}

const getServerSideProps = async () => {
    const res = await fetch('http://localhost:8080/onlinebookstore_war_exploded/book-servlet')
    const data = await res.json()
    return { props: { data } }
}

export default MyPage;
export { getServerSideProps };

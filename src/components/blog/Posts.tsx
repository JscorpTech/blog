"use client"
import {Flex, Grid, Spinner} from "@/once-ui/components";
import Post from "./Post";
import React, {useEffect, useState} from "react";
import {PostType} from "@/app/types/blog";
import apiClient from "@/app/utils/api";


export function Posts() {
    const [posts, setPosts] = useState<PostType[] | null>(null);
    useEffect(() => {
        apiClient.get("/api/post/").then(res => {
            setPosts(res.data.data.results);
        }).catch(res => {
            console.log(res);
        })
    }, []);

    return (
        <>
            {
                posts != null ?
                    (
                        posts.length > 0 && (
                            <Grid columns={1} mobileColumns="1" fillWidth marginBottom="40" gap="m">
                                {posts.map((post) => (
                                    <Post key={post.id} post={post}/>
                                ))}
                            </Grid>
                        )
                    ) : <Flex fillWidth paddingY="128" horizontal="center">
                        <Spinner/>
                    </Flex>
            }
        </>
    );
}

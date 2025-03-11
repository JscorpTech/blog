"use client"
import { Flex, Grid, Spinner } from "@/once-ui/components";
import Post from "./Post";
import React, { useEffect, useState } from "react";
import { PostType } from "@/app/types/blog";
import apiClient from "@/app/utils/api";
import Pagination from "../Pagination";


export function Posts() {
    const [posts, setPosts] = useState<PostType[] | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setPages] = useState<number>(0)
    useEffect(() => {
        apiClient.get(`/api/post/?page=${page}`).then(res => {
            setPosts(res.data.data.results);
            setPages(res.data.data.total_pages);
        }).catch(res => {
            console.log(res);
        })
    }, [page]);

    return (
        posts != null ?
            posts.length > 0 && (
                <Grid columns={1} mobileColumns="1" fillWidth marginBottom="40" gap="m">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                    <Pagination totalPages={totalPages} setPage={setPage} page={page}></Pagination>
                </Grid>
            )
            : <Flex fillWidth paddingY="128" horizontal="center">
                <Spinner />
            </Flex>
    );
}

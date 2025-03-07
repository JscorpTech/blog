"use client"
import {CustomMDX} from "@/components/mdx";
import {AvatarGroup, Button, Column, Flex, Heading, Row, SmartImage, Spinner, Text} from "@/once-ui/components";
import {baseURL} from "@/app/resources";
import {person} from "@/app/resources/content";
import {formatDate} from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import {PostType} from "@/app/types/blog";
import React, {useEffect, useState} from "react";
import apiClient from "@/app/utils/api";
import styles from "@/components/blog/Posts.module.scss";

interface BlogParams {
    params: {
        slug: string;
    };
}

export default function Blog({params}: BlogParams) {
    const [post, setPost] = useState<PostType | null>(null);

    useEffect(() => {
        apiClient.get(`/api/post/${params.slug}/`).then(res => {
            setPost(res.data.data);
        }).catch(res => {
            console.error(res);
        })
    }, []);

    return (
        post != null ?
            <Column as="section" maxWidth="xs" gap="l">
                <Button href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
                    Posts
                </Button>
                {post?.image && (
                    <SmartImage
                        priority
                        className={styles.image}
                        sizes="640px"
                        border="neutral-alpha-weak"
                        cursor="interactive"
                        radius="m"
                        src={post.image}
                        alt={"Thumbnail of " + post.title}
                        aspectRatio="16 / 9"
                    />
                )}
                <Heading variant="display-strong-s">{post?.title}</Heading>
                <Row gap="12" vertical="center">
                    <Text variant="body-default-s" onBackground="neutral-weak">
                        {post?.created_at && formatDate(post.created_at)}
                    </Text>
                </Row>
                <Column as="article" fillWidth>
                    <Text>
                        {post?.content}
                    </Text>
                </Column>
                <ScrollToHash/>
            </Column>
            : <Flex fillWidth paddingY="128" horizontal="center">
                <Spinner/>
            </Flex>
    );
}

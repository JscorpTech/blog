"use client";

import {Column, Flex, Heading, SmartImage, SmartLink, Tag, Text} from "@/once-ui/components";
import styles from "./Posts.module.scss";
import {formatDate} from "@/app/utils/formatDate";
import {PostType} from "@/app/types/blog";

interface PostProps {
    post: PostType;
}

export default function Post({post}: PostProps) {
    let tags = post.tags
    return (
        <SmartLink
            fillWidth
            className={styles.hover}
            unstyled
            key={post.id}
            href={`/blog/${post.id}`}
        >
            <Flex
                position="relative"
                mobileDirection="column"
                fillWidth
                paddingY="12"
                paddingX="16"
                gap="32"
            >
                {post.image && (
                    <SmartImage
                        priority
                        maxWidth={20}
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
                <Column position="relative" fillWidth gap="8" vertical="center">
                    <Heading as="h2" variant="heading-strong-l" wrap="balance">
                        {post.title}
                    </Heading>
                    <Text>
                        {post.desc}
                    </Text>
                    <Text variant="label-default-s" onBackground="neutral-weak">
                        {post.created_at && formatDate(post.created_at, false)}
                    </Text>
                    {tags.length > 0 && (
                        <Flex gap="8">
                            {tags.map(tag =>
                                tag.id < 3 ? <Tag key={tag.id} label={tag.name} variant="neutral"/> : null
                            )}
                        </Flex>
                    )}
                </Column>
            </Flex>
        </SmartLink>
    );
}

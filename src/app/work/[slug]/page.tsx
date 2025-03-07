"use client"
import {CustomMDX} from "@/components/mdx";
import {AvatarGroup, Button, Carousel, Column, Flex, Heading, SmartImage, SmartLink, Text} from "@/once-ui/components";
import {baseURL} from "@/app/resources";
import {person} from "@/app/resources/content";
import {formatDate} from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import {useEffect, useState} from "react";
import {ProjectType} from "@/app/types/product";
import apiClient from "@/app/utils/api";

interface WorkParams {
    params: {
        slug: string;
    };
}

export default function Project({params}: WorkParams) {
    const [project, setProject] = useState<ProjectType | null>(null)
    useEffect(() => {
        apiClient.get(`/api/project/${params.slug}`).then(res => {
            setProject(res.data.data);
        }).catch(res => {
            console.log(res);
        })
    }, []);
    return (
        <Column as="section" maxWidth="m" horizontal="center" gap="l">
            <Column maxWidth="xs" gap="16">
                <Button href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
                    Projects
                </Button>
                <Heading variant="display-strong-s">{project?.name}</Heading>
            </Column>
            {
                project != null &&
                <Carousel
                    sizes="(max-width: 960px) 100vw, 960px"
                    images={project?.images.map((image) => ({
                        src: image.file,
                        alt: project.name,
                    }))}
                />
            }
            <Column style={{margin: "auto"}} as="article" maxWidth="xs">
                <Flex gap="12" marginBottom="24" vertical="center">
                    <Text variant="body-default-s" onBackground="neutral-weak">
                        {project?.created_at && formatDate(project.created_at)}
                    </Text>
                    {project?.demo && (
                        <SmartLink
                            suffixIcon="arrowUpRightFromSquare"
                            style={{margin: "0", width: "fit-content"}}
                            href={project.demo}
                        >
                            <Text variant="body-default-s">View project</Text>
                        </SmartLink>
                    )}
                </Flex>

                <Text>
                    {project?.desc}
                </Text>
            </Column>
            <ScrollToHash/>
        </Column>
    );
}

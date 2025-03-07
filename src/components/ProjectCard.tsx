"use client";

import {
    AvatarGroup,
    Carousel,
    Column,
    Flex,
    Heading,
    SmartLink,
    Text,
} from "@/once-ui/components";
import {Image} from "@/app/types/product";

interface ProjectCardProps {
    href: string;
    priority?: boolean;
    images: Image[];
    title: string;
    description: string;
    demo: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
                                                            href,
                                                            images = [],
                                                            title,
                                                            description,
                                                            demo,
                                                        }) => {
    return (
        <Column fillWidth gap="m">
            <Carousel
                sizes="(max-width: 960px) 100vw, 960px"
                images={images.map((image) => ({
                    src: image.file,
                    alt: title,
                }))}
            />
            <Flex
                mobileDirection="column"
                fillWidth
                paddingX="s"
                paddingTop="12"
                paddingBottom="24"
                gap="l"
            >
                {title && (
                    <Flex flex={5}>
                        <Heading as="h2" wrap="balance" variant="heading-strong-xl">
                            {title}
                        </Heading>
                    </Flex>
                )}
                {(description?.trim()) && (
                    <Column flex={7} gap="16">
                        {description?.trim() && (
                            <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                                {description}
                            </Text>
                        )}
                        <Flex gap="24" wrap>
                            {description?.trim() && (
                                <SmartLink
                                    suffixIcon="arrowRight"
                                    style={{margin: "0", width: "fit-content"}}
                                    href={href}
                                >
                                    <Text variant="body-default-s">Read case study</Text>
                                </SmartLink>
                            )}
                            {demo && (
                                <SmartLink
                                    suffixIcon="arrowUpRightFromSquare"
                                    style={{margin: "0", width: "fit-content"}}
                                    href={demo}
                                >
                                    <Text variant="body-default-s">View project</Text>
                                </SmartLink>
                            )}
                        </Flex>
                    </Column>
                )}
            </Flex>
        </Column>
    );
};

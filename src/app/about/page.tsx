"use client"
import {
    Avatar,
    Button,
    Column,
    Flex,
    Heading,
    Icon,
    IconButton, Skeleton,
    SmartImage, Spinner,
    Tag,
    Text,
} from "@/once-ui/components";
import {baseURL} from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import {person, about, social} from "@/app/resources/content";
import React, {useEffect, useState} from "react";
import apiClient from "@/app/utils/api";
import {ExperienceType, StacksType} from "@/app/types/portfolio";
import Image from "next/image";

export default function About() {
    const [experiences, setExperiences] = useState<ExperienceType[] | null>(null);
    const [stacks, setStacks] = useState<StacksType[] | null>(null);

    useEffect(() => {
        apiClient.get("/api/experience/").then(res => {
            setExperiences(res.data.data.results);
        }).catch(res => {
            console.log(res);
        })

        apiClient.get("/api/stack/").then(res => {
            setStacks(res.data.data.results);
        }).catch(res => {
            console.log(res);
        })
    }, []);

    const structure = [
        {
            title: about.intro.title,
            display: about.intro.display,
            items: [],
        },
        {
            title: about.work.title,
            display: about.work.display,
            items: about.work.experiences.map((experience) => experience.company),
        },
        {
            title: about.technical.title,
            display: about.technical.display,
            items: about.technical.skills.map((skill) => skill.title),
        },
    ];
    return (
        experiences == null ?
            <Flex fillWidth paddingY="128" horizontal="center">
                <Spinner/>
            </Flex>
            :
            <Column maxWidth="m">
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: person.name,
                            jobTitle: person.role,
                            description: about.intro.description,
                            url: `https://${baseURL}/about`,
                            image: `${baseURL}/images/${person.avatar}`,
                            sameAs: social
                                .filter((item) => item.link && !item.link.startsWith("mailto:")) // Filter out empty links and email links
                                .map((item) => item.link),
                            worksFor: {
                                "@type": "Organization",
                                name: about.work.experiences[0].company || "",
                            },
                        }),
                    }}
                />
                {about.tableOfContent.display && (
                    <Column
                        left="0"
                        style={{top: "50%", transform: "translateY(-50%)"}}
                        position="fixed"
                        paddingLeft="24"
                        gap="32"
                        hide="s"
                    >
                        <TableOfContents structure={structure} about={about}/>
                    </Column>
                )}
                <Flex fillWidth mobileDirection="column" horizontal="center">
                    {about.avatar.display && (
                        <Column
                            className={styles.avatar}
                            minWidth="160"
                            paddingX="l"
                            paddingBottom="xl"
                            gap="m"
                            flex={3}
                            horizontal="center"
                        >
                            <Avatar src={person.avatar} size="xl"/>
                            <Flex gap="8" vertical="center">
                                <Icon onBackground="accent-weak" name="globe"/>
                                {person.location}
                            </Flex>
                            {person.languages.length > 0 && (
                                <Flex wrap gap="8">
                                    {person.languages.map((language, index) => (
                                        <Tag key={index} size="l">
                                            {language}
                                        </Tag>
                                    ))}
                                </Flex>
                            )}
                        </Column>
                    )}
                    <Column className={styles.blockAlign} flex={9} maxWidth={40}>
                        <Column
                            id={about.intro.title}
                            fillWidth
                            minHeight="160"
                            vertical="center"
                            marginBottom="32"
                        >
                            {about.calendar.display && (
                                <Flex
                                    fitWidth
                                    border="brand-alpha-medium"
                                    className={styles.blockAlign}
                                    style={{
                                        backdropFilter: "blur(var(--static-space-1))",
                                    }}
                                    background="brand-alpha-weak"
                                    radius="full"
                                    padding="4"
                                    gap="8"
                                    marginBottom="m"
                                    vertical="center"
                                >
                                    <Icon paddingLeft="12" name="calendar" onBackground="brand-weak"/>
                                    <Flex paddingX="8">{"Contact -> Telegram"}</Flex>
                                    <IconButton
                                        href={"https://t.me/Azamov_Samandar"}
                                        data-border="rounded"
                                        variant="secondary"
                                        icon="chevronRight"
                                    />
                                </Flex>
                            )}
                            <Heading className={styles.textAlign} variant="display-strong-xl">
                                {person.name}
                            </Heading>
                            <Text
                                className={styles.textAlign}
                                variant="display-default-xs"
                                onBackground="neutral-weak"
                            >
                                {person.role}
                            </Text>
                            {social.length > 0 && (
                                <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap
                                      horizontal="center" fitWidth>
                                    {social.map(
                                        (item) =>
                                            item.link && (
                                                <>
                                                    <Button
                                                        className="s-flex-hide"
                                                        key={item.name}
                                                        href={item.link}
                                                        prefixIcon={item.icon}
                                                        label={item.name}
                                                        size="s"
                                                        variant="secondary"
                                                    />
                                                    <IconButton
                                                        className="s-flex-show"
                                                        size="l"
                                                        key={`${item.name}-icon`}
                                                        href={item.link}
                                                        icon={item.icon}
                                                        variant="secondary"
                                                    />
                                                </>
                                            ),
                                    )}
                                </Flex>
                            )}
                        </Column>

                        {about.intro.display && (
                            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                                {about.intro.description}
                            </Column>
                        )}

                        {about.work.display && (
                            <>
                                <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                                    {about.work.title}
                                </Heading>
                                <Column fillWidth gap="l" marginBottom="40">
                                    {experiences?.map((experience, index) => (
                                        <Column key={`${experience.name}-${experience.role}-${index}`} fillWidth>
                                            <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                                                <Text id={experience.name} variant="heading-strong-l">
                                                    {experience.name}
                                                </Text>
                                                <Text variant="heading-default-xs" onBackground="neutral-weak">
                                                    {experience.start_date} - {experience.end_date == null ? "Preset" : experience.end_date}
                                                </Text>
                                            </Flex>
                                            <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                                                {experience.role}
                                            </Text>
                                            <Column as="ul" gap="16">
                                                {experience.comments.map(comment => (
                                                    <Text
                                                        as="li"
                                                        variant="body-default-m"
                                                        key={`${experience.id}-${index}`}
                                                    >
                                                        {comment}
                                                    </Text>
                                                ))}
                                            </Column>
                                            {experience.images.length > 0 && (
                                                <Flex fillWidth paddingTop="m" gap={"12"} paddingLeft="40" wrap>
                                                    {experience.images.map((image, index) => (
                                                        <Flex
                                                            key={index}
                                                            border="neutral-medium"
                                                            radius="m"
                                                            //@ts-ignore
                                                            minWidth={16}
                                                            //@ts-ignore
                                                            height={9}
                                                        >
                                                            <SmartImage
                                                                enlarge
                                                                radius="m"
                                                                //@ts-ignore
                                                                sizes={"19"}
                                                                //@ts-ignore
                                                                alt={image.file}
                                                                //@ts-ignore
                                                                src={image.file}
                                                            />
                                                        </Flex>
                                                    ))}
                                                </Flex>
                                            )}
                                        </Column>
                                    ))}
                                </Column>
                            </>
                        )}

                        {about.technical.display && (
                            <>
                                <Heading
                                    as="h2"
                                    id={about.technical.title}
                                    variant="display-strong-s"
                                    marginBottom="40"
                                >
                                    {about.technical.title}
                                </Heading>
                                <Column fillWidth gap="l">
                                    {stacks?.map((skill, index) => (
                                        <Column key={`${skill}-${index}`} fillWidth gap="4">
                                            <Text variant="heading-strong-l">{skill.name}</Text>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                    marginTop: "10px",
                                                    flexWrap: "wrap"
                                                }}>
                                                {
                                                    skill.stacks.map((s, index) => (
                                                        <SmartImage
                                                            enlarge
                                                            radius="m"
                                                            //@ts-ignore
                                                            sizes={"19"}
                                                            //@ts-ignore
                                                            width={4}
                                                            height={4}
                                                            alt={s.image}
                                                            //@ts-ignore
                                                            src={s.image}
                                                        />
                                                    ))
                                                }
                                            </div>

                                        </Column>
                                    ))}
                                </Column>
                            </>
                        )}
                    </Column>
                </Flex>
            </Column>

    );
}

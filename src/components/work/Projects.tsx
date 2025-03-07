"use client"
import {Column} from "@/once-ui/components";
import {ProjectCard} from "@/components";
import apiClient from "@/app/utils/api";
import {useEffect, useState} from "react";
import {ProjectType} from "@/app/types/product";


export function Projects() {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    useEffect(() => {
        apiClient.get("/api/project/").then((res) => {
            setProjects(res.data.data.results);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
            {projects.map((post, index) => (
                <ProjectCard
                    priority={index < 2}
                    key={post.id}
                    href={`work/${post.id}`}
                    images={post.images}
                    title={post.name}
                    description={post.desc}
                    demo={post.demo || ""}
                />
            ))}
        </Column>
    );
}

"use client"
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";
import apiClient from "@/app/utils/api";
import { useEffect, useState } from "react";
import { ProjectType } from "@/app/types/product";
import Pagination from "../Pagination";


export function Projects() {
    const [page, setPage] = useState<number>(1)
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [totalPages, setPages] = useState<number>(0)
    useEffect(() => {
        apiClient.get(`/api/project/?page=${page}`).then((res) => {
            setProjects(res.data.data.results);
            setPages(res.data.data.total_pages);
        }).catch((err) => {
            console.log(err);
        });
    }, [page]);

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
            <Pagination totalPages={totalPages} page={page} setPage={setPage}></Pagination>
        </Column>
    );
}

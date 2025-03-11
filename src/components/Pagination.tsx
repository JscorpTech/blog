"use client";
import React, { useCallback } from "react";
import { Button, IconButton } from "@/once-ui/components";
import style from "@/components/Pagination.module.scss";

interface PaginationProps {
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, page, setPage }) => {
    const changePage = useCallback(
        (newPage: number) => {
            if (newPage >= 1 && newPage <= totalPages) {
                setPage(newPage);
            }
        },
        [setPage, totalPages]
    );

    return (
        <div className={style.pagination}>
            <IconButton
                onClick={() => changePage(page - 1)}
                variant="tertiary"
                size="l"
                icon="chevronLeft"
                disabled={page === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(index => Math.abs(page - index) <= 2)
                .map(index => (
                    <Button
                        key={index}
                        onClick={() => changePage(index)}
                        variant={page === index ? "primary" : "tertiary"}
                    >
                        {index}
                    </Button>
                ))
            }

            <IconButton
                onClick={() => changePage(page + 1)}
                variant="tertiary"
                size="l"
                icon="chevronRight"
                disabled={page === totalPages}
            />
        </div>
    );
};

export default Pagination;

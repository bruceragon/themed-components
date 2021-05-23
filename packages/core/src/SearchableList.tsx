import React from "react"
import { ListItem } from "@themed-components/primitives"
import { MultiSelect, MultiSelectProps, Select, SelectProps } from "./internals/Select"

type SearchableListProps = SelectProps & {
    isOpen?: undefined,
    searchable?: undefined
}

export function SearchableList({
    emptyList = <ListItem textAlign="center" fontStyle="italic" py={2}>no results</ListItem>,
    listProps,
    ...props
}: SearchableListProps) {
    return (
        <Select
            icon={null}
            listProps={{
                ...listProps,
                position: "static"
            }}
            isOpen={true}
            searchable={true}
            emptyList={emptyList}
            {...props}
        />
    )
}

type MultiSearchableListProps = MultiSelectProps & {
    isOpen?: undefined,
    searchable?: undefined
}

export function MultiSearchableList({ listProps, ...props }: MultiSearchableListProps) {
    return (
        <MultiSelect
            icon={null}
            listProps={{
                ...listProps,
                position: "static"
            }}
            isOpen={true}
            searchable={true}
            emptyList={<ListItem textAlign="center" fontStyle="italic" py={2}>no results</ListItem>}
            {...props}
        />
    )
}

export type {
    SearchableListProps,
    MultiSearchableListProps,
}
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store";
import { getPersonagesListAsync } from "../../store/features/personagesListSlice";
import styles from "./Search.module.scss";

const Search = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        const personageSearchTimeOut = setTimeout(() => {
            dispatch(getPersonagesListAsync({ search: searchValue }));
        }, 300);
        return () => {
            clearTimeout(personageSearchTimeOut);
        };
    }, [searchValue]);

    return <Input className={styles.search_input} placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />;
};

export default Search;

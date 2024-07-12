import { Card, Pagination, Typography } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getPersonagesListAsync } from "../../store/features/personagesListSlice";
import { useNavigate } from "react-router-dom";
import styles from "./PersonageList.module.scss";
import Search from "../../helperComponents/Search/Search";

const { Text } = Typography;

const PersonageList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { personagesList, personagesListLoading, count } = useAppSelector((state) => state.personagesList);

    const handleClick = (index: number) => {
        navigate(`${index + 1}`);
    };

    const handleChange = (page: number) => {
        dispatch(getPersonagesListAsync({ page }));
    };

    useEffect(() => {
        dispatch(getPersonagesListAsync({}));
    }, []);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Personages List</h3>
            <Search />
            <div className={styles.list_wrapper}>
                {personagesList.map(({ name, gender, height, eye_color }, index) => (
                    <Card loading={personagesListLoading} className={styles.card} key={index} onClick={() => handleClick(index)}>
                        <Text className={styles.name}>{name}</Text>
                        <Text className={styles.about}>Gender - {gender}</Text>
                        <Text className={styles.about}>Eye color - {eye_color}</Text>
                        <Text className={styles.about}>Height - {height}</Text>
                    </Card>
                ))}
            </div>
            <Pagination showSizeChanger={false} defaultCurrent={1} total={count} onChange={(e) => handleChange(e)} />
        </div>
    );
};

export default PersonageList;

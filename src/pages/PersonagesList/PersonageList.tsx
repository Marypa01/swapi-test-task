import { Card, Pagination, Typography } from "antd";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getPersonagesListAsync } from "../../store/features/personagesListSlice";
import { useNavigate } from "react-router-dom";
import styles from "./PersonageList.module.scss";
import Search from "../../helperComponents/Search/Search";
import { APP_PATHS } from "../../router/paths";

const { Text } = Typography;

const PersonageList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { personagesList, personagesListLoading, count } = useAppSelector((state) => state.personagesList);

    useEffect(() => {
        dispatch(getPersonagesListAsync({}));
    }, []);

    const handleClick = (url: string) => {
        const id = url.split('/').filter(Boolean).pop();
        if (id) {
            navigate(APP_PATHS.personage.replace(":id", id));
        } else {
            console.error("Invalid URL: unable to extract ID");
        }
    };

    const handleChange = (page: number) => {
        dispatch(getPersonagesListAsync({ page }));
    };


    const getPersonalData = useCallback((personageNumber: number, key: string) => {
        const storageKey = `${personageNumber}-${key}`;
        const storageData = localStorage.getItem(storageKey);
        return storageData;
    }, [])

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Personages List</h3>
            <Search />
            <div className={styles.list_wrapper}>
            {personagesList.map((personage, index) => {
                    const { name, gender, height, eye_color, url } = personage;
                    const personageNumber = index + 1;
                    
                    const displayedName = getPersonalData(personageNumber, "name") ?? name;
                    const displayedGender = getPersonalData(personageNumber, "gender") ?? gender;
                    const displayedHeight = getPersonalData(personageNumber, "height") ?? height;
                    const displayedEyeColor = getPersonalData(personageNumber, "eye_color") ?? eye_color;

                    return (
                        <Card loading={personagesListLoading} className={styles.card} key={name+index} onClick={() => handleClick(url)}>
                            <Text className={styles.name}>{displayedName}</Text>
                            <Text className={styles.about}>Gender - {displayedGender}</Text>
                            <Text className={styles.about}>Eye color - {displayedEyeColor}</Text>
                            <Text className={styles.about}>Height - {displayedHeight}</Text>
                        </Card>
                    );
                })}
            </div>
            <Pagination showSizeChanger={false} defaultCurrent={1} total={count} onChange={(e) => handleChange(e)} />
        </div>
    );
};

export default PersonageList;

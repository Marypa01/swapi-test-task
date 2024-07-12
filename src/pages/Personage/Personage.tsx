import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Card, Input, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { getPersonageAsync, setPersonageDataRedux } from "../../store/features/personagesListSlice";
import styles from "./Personage.module.scss";
import { PersonageDataTypes } from "./Personage.types";
import { PersonagesListTypes } from "../../store/types";

const { Text } = Typography;

const Personage = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const personageNumber = pathname[1];

    const { personage, personagesListLoading } = useAppSelector((state) => state.personagesList);

    const { birth_year, created, edited, eye_color, gender, hair_color, height, mass, name, skin_color } = personage;

    const personageData = useMemo<PersonageDataTypes[]>(
        () => [
            { id: 1, key: "birth_year", text: `Birth Year: ${birth_year}`, value: birth_year },
            { id: 4, key: "eye_color", text: `Eye Color: ${eye_color}`, value: eye_color },
            { id: 5, key: "gender", text: `Gender: ${gender}`, value: gender },
            { id: 6, key: "hair_color", text: `|Hair Color: ${hair_color}`, value: hair_color },
            { id: 7, key: "height", text: `Height: ${height}`, value: height },
            { id: 8, key: "mass", text: `Mass: ${mass}`, value: mass },
            { id: 9, key: "skin_color", text: `Skin Color: ${skin_color}`, value: skin_color },
        ],
        [personage]
    );

    const [editLine, setEditLine] = useState<keyof PersonagesListTypes | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const handleEditValue = (key: keyof PersonagesListTypes | null, text: string) => {
        setEditLine(key);
        setEditValue(text);
    };

    const handleSaveEditedValue = (type: keyof Omit<PersonagesListTypes, "species" | "films" | "vehicles" | "starships">) => {
        dispatch(setPersonageDataRedux({ type, value: editValue }));
        setEditLine(null);
    };

    useEffect(() => {
        dispatch(getPersonageAsync(personageNumber));
    }, []);

    return (
        <div className={styles.container}>
            <Card loading={personagesListLoading} className={styles.card}>
                <Text className={styles.name}>{name}</Text>
                {personageData.map(({ id, key, text, value }) => {
                    return (
                        <Text className={styles.about} key={id}>
                            <span>{key}</span>{" "}
                            {editLine === key ? (
                                <>
                                    <Input className={styles.edit_input} value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                                    <SaveOutlined onClick={() => handleSaveEditedValue(key)} />
                                </>
                            ) : (
                                <>
                                    {text} <EditOutlined className={styles.edit} onClick={() => handleEditValue(key, value)} />
                                </>
                            )}{" "}
                        </Text>
                    );
                })}
                <div className={styles.footer}>
                    <Text className={styles.about}>
                        <span>created:</span> {created.split("T")[0]}
                    </Text>
                    <Text className={styles.about}>
                        <span>edited:</span> {edited.split("T")[0]}
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default Personage;

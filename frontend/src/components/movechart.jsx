import React, { useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getMovement } from "../slices/slice/movementSlice.jsx";
import "../css/movechart.css";
import '../change-language/i18n.jsx'
const Movechart = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const moveitems = useSelector((store) => store.movements.movements) || [];

    useEffect(() => {
        dispatch(getMovement());
    }, [dispatch]);

    const monthNames = [
        t("january"),
        t("february"),
        t("march"),
        t("april"),
        t("may"),
        t("june"),
        t("july"),
        t("august"),
        t("september"),
        t("october"),
        t("november"),
        t("december"),
    ];

    const getMonthIndex = (createdAt) => {
        if (!createdAt) return null;

        if (createdAt.includes(".")) {
            const parts = createdAt.split(".");
            return Number(parts[1]) - 1;
        }

        return new Date(createdAt).getMonth();
    };

    const monthlyData = monthNames.map((month) => ({
        month,
        inQuantity: 0,
        outQuantity: 0,
    }));

    moveitems.forEach((item) => {
        const monthIndex = getMonthIndex(item.created_at);

        if (monthIndex !== null && monthIndex >= 0 && monthIndex <= 11) {
            if (item.type === "in") {
                monthlyData[monthIndex].inQuantity += Number(item.quantity);
            }

            if (item.type === "out") {
                monthlyData[monthIndex].outQuantity += Number(item.quantity);
            }
        }
    });

    return (
        <div className="chart-container">
            <h3>{t("monthlyMovementChart")}</h3>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="inQuantity"
                        name={t("in")}
                        fill="#22c55e"
                        radius={[6, 6, 0, 0]}
                    />
                    <Bar
                        dataKey="outQuantity"
                        name={t("out")}
                        fill="#ef4444"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Movechart;
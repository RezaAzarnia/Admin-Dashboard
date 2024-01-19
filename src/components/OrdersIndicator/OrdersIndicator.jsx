import React, { memo } from 'react';
import PieGraph from '../Charts/PieGraph/PieGraph';
import AreaGraph from '../Charts/AreaGraph/AreaGraph';
import BoxTopbar from '../BoxTopbar/BoxTopbar';
import { Area } from 'recharts';
import { IoRefreshSharp } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import useFetchItem from '../../hooks/useFetchItem';
import { categoryService } from '../../services/Axios/Requests/category';
import './OrdersIndicator.scss';


function OrdersIndicator() {
    const { data: categories } = useFetchItem('Categories', () => categoryService.getAllCategory())

    const generateRandomPieData = () => {
        const mainValue = categories?.slice(0, 3)?.map(categoryName => {
            return {
                ...categoryName,
                sale: Math.floor(Math.random() * 100) + 1
            }
        })
        return mainValue;
    }
    const pieChartData = generateRandomPieData();

    return (
        <div className="orders-indicator-box">
            <BoxTopbar title="Orders by Category">
                <IoRefreshSharp className="icon" />
                <BsThreeDotsVertical className="icon" />
            </BoxTopbar>

            <div className="circle-chart">
                <PieGraph data={pieChartData} dataKey="sale" />
            </div>
            <div className="visit-reports">
                <ul className="visit-reports-list">
                    {
                        categories?.slice(0, 3)?.map(item => {
                            return <li className="visit-reports-list-item" key={item.id}>
                                <div className="report-info">
                                    <h5 className="report-info-title">{item.categoryName}</h5>
                                    <span className="report-info-counts"></span>
                                </div>
                                <div className="report-info-chart">
                                    <AreaGraph data={pieChartData}>
                                        <Area dataKey="sale" fill="var(--green)" stroke="var(--green)" />
                                    </AreaGraph>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
};
export default memo(OrdersIndicator)
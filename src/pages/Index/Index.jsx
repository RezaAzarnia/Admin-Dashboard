import React, { useCallback, useState } from 'react'
import { useQueries } from 'react-query';
import { getProducts } from '../../services/Axios/Requests/products';
import { getOrders } from '../../services/Axios/Requests/orders';
import { getUsers } from '../../services/Axios/Requests/users';
import { getArticles } from '../../services/Axios/Requests/articles';
import { getSociaCampaignsInfo } from '../../services/Axios/Requests/analyticsService';
import { SlUserFollowing, SlLayers, SlBasket } from "react-icons/sl";
import { IoPlayBackOutline, IoRefreshSharp } from "react-icons/io5";
import { RiFullscreenFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

import SkeletonIndex from '../../Components/SkeletonLoader/SkeletonIndex/SkeletonIndex';
import DetailBox from '../../Components/DetailBox/DetailBox';
import AnalyticsOverviewBox from '../../Components/AnalyticsOverviewBox/AnalyticsOverviewBox';
import SatisficationIndicator from '../../Components/SatisficationIndicator/SatisficationIndicator';
import BrowserUsageStats from '../../Components/BrowserUsageStats/BrowserUsageStats';
import OrdersIndicator from '../../Components/OrdersIndicator/OrdersIndicator';
import AdvertisingIndicator from '../../Components/AdvertisingIndicator/AdvertisingIndicator';
import Table from '../../Components/Table/Table';
import BoxTopbar from '../../Components/BoxTopbar/BoxTopbar';
import Alert from '../../Components/Alert/Alert';
import './Index.scss'

export default function Index() {
    const [fullPageTable, setFullPageTable] = useState(false)

    const [products, users, articles, orders, sociaCampaignsInfo] = useQueries([
        { queryKey: 'ProductsLength', queryFn: () => getProducts() },
        { queryKey: 'UsersLength', queryFn: () => getUsers() },
        { queryKey: 'Articles', queryFn: () => getArticles() },
        { queryKey: 'OrdersLength', queryFn: () => getOrders() },
        { queryKey: 'SociaCampaigns', queryFn: () => getSociaCampaignsInfo() },
    ])
    //show full page table function
    const handleFullPageTable = useCallback(() => {
        setFullPageTable(prev => !prev)
    }, [])

    if (products.isLoading || users.isLoading || articles.isLoading || orders.isLoading || sociaCampaignsInfo.isLoading) {
        return (<SkeletonIndex />)
    }
    if (products.isError || users.isError || articles.isError || orders.isError || sociaCampaignsInfo.isError) {
        return <Alert message='Looks like something went wrong! 🚨 Please try again later.' />
    }

    return (
        <>
            <div className="detail-box-row">
                <DetailBox title='users' symbol={<SlUserFollowing />} count={!users.isLoading && users.data?.length} />
                <DetailBox title='orders' symbol={<SlBasket />} count={!orders.isLoading && orders.data?.length} />
                <DetailBox title='products' symbol={<IoPlayBackOutline />} count={!products.isLoading && products.data?.length} />
                <DetailBox title='articles' symbol={<SlLayers />} count={!articles.isLoading && articles?.data.length} />
            </div>
            <div className="Analytics-part">
                <AnalyticsOverviewBox />
                <SatisficationIndicator />
                <BrowserUsageStats />
                <OrdersIndicator />
            </div>
            <div className="social-campaign-container ">
                <div className={`table ${fullPageTable ? 'full-width' : ''}`}>
                    <BoxTopbar title='Social Campaigns'>
                        <IoRefreshSharp className='icon' />
                        <RiFullscreenFill className='icon' onClick={handleFullPageTable} />
                        <BsThreeDotsVertical className='icon' />
                    </BoxTopbar>
                    <Table>
                        <thead>
                            <tr>
                                <th>campaign</th>
                                <th>channel</th>
                                <th>clicks</th>
                                <th>impressions</th>
                                <th>conversions</th>
                                <th>cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sociaCampaignsInfo.data?.length > 0 &&
                                sociaCampaignsInfo.data?.map((item, index) => {
                                    return <tr key={index + 1}>
                                        <td className='campaign-name'>{item.campaign}</td>
                                        <td className='campaign-client'>{item.channel}</td>
                                        <td className='campaign-click'>{item.clicks}</td>
                                        <td className='campaign-impressions'>{item.impressions}</td>
                                        <td className='campaign-conversions'>{item.conversions}</td>
                                        <td className='campaign-cost'>${item.cost}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <AdvertisingIndicator />
            </div>
        </>
    )
}

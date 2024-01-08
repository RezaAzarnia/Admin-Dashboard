import React, { useState } from 'react'
import { useQueries } from 'react-query';
import { productService} from '../../services/Axios/Requests/products';
import { ordersService} from '../../services/Axios/Requests/orders';
import { usersService } from '../../services/Axios/Requests/users';
import { articleService } from '../../services/Axios/Requests/articles';
import { SlUserFollowing, SlLayers , SlBasket } from "react-icons/sl";
import { IoPlayBackOutline, IoRefreshSharp } from "react-icons/io5";
import { RiFullscreenFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

import DetailBox from '../../Components/DetailBox/DetailBox';
import UserStaticBox from '../../components/UserStaticBox/UserStaticBox';
import SatisficationIndicator from '../../components/SatisficationIndicator/SatisficationIndicator';
import BrowserUsageStats from '../../components/BrowserUsageStats/BrowserUsageStats';
import TrafficIndicator from '../../components/TrafficIndicator/TrafficIndicator';
import AdvertisingIndicator from '../../components/AdvertisingIndicator/AdvertisingIndicator';
import Table from '../../Components/Table/Table';
import BoxTopbar from '../../components/BoxTopbar/BoxTopbar';
import './Index.scss'

export default function Index() {
    const [fullPageTable, setFullPageTable] = useState(false)

    const [products, users, articles, orders] = useQueries([
        { queryKey: 'Products', queryFn: () => productService.getAllProducts() },
        { queryKey: 'Users', queryFn: () => usersService.getAllUsers() },
        { queryKey: 'Articles', queryFn: () => articleService.getAllArticles() },
        { queryKey: 'Orders', queryFn: () => ordersService.getAllOrders() }
    ])
    const handleFullPageTable = () => setFullPageTable(prev => !prev)
    return (
        <>
            <div className="detail-box-row">
                <DetailBox title='users' symbol={<SlUserFollowing />} count={!users.isLoading && users.data?.length} />
                <DetailBox title='orders' symbol={<SlBasket />} count={!orders.isLoading && orders.data?.length} />
                <DetailBox title='products' symbol={<IoPlayBackOutline />} count={!products.isLoading && products.data?.length} />
                <DetailBox title='articles' symbol={<SlLayers />} count={!articles.isLoading && articles?.data.length} />
            </div>

            <div className="Analytics-part">
                <UserStaticBox />
                <SatisficationIndicator />
                <BrowserUsageStats />
                <TrafficIndicator />
            </div>
            <div className="down-part-container">
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
                                <th>client</th>
                                <th>changes</th>
                                <th>budget</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='campaign-name'>facebook</td>
                                <td className='campaign-client'>Beavis</td>
                                <td className='campaign-changes'>+2.34</td>
                                <td>$1434</td>
                                <td className='campaign-status'><div className="badge bg-danger">fail</div></td>
                            </tr>
                            <tr>
                                <td className='campaign-name'>facebook</td>
                                <td className='campaign-client'>Beavis</td>
                                <td className='campaign-changes'>+2.34</td>
                                <td>$1434</td>
                                <td className='campaign-status'><div className="badge bg-danger">fail</div></td>
                            </tr>
                            <tr>
                                <td className='campaign-name'>facebook</td>
                                <td className='campaign-client'>Beavis</td>
                                <td className='campaign-changes'>+2.34</td>
                                <td>$1434</td>
                                <td className='campaign-status'><div className="badge bg-danger">fail</div></td>
                            </tr>
                            <tr>
                                <td className='campaign-name'>facebook</td>
                                <td className='campaign-client'>Beavis</td>
                                <td className='campaign-changes'>+2.34</td>
                                <td>$1434</td>
                                <td className='campaign-status'><div className="badge bg-danger">fail</div></td>
                            </tr>
                            <tr>
                                <td className='campaign-name'>facebook</td>
                                <td className='campaign-client'>Beavis</td>
                                <td className='campaign-changes'>+2.34</td>
                                <td>$1434</td>
                                <td className='campaign-status'><div className="badge bg-danger">fail</div></td>
                            </tr>


                        </tbody>
                    </Table>
                </div>
                <AdvertisingIndicator />
            </div>
        </>
    )
}

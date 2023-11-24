import React, { useState } from 'react'
import DetailBox from '../../components/DetailBox/DetailBox'
import { SlUserFollowing , SlLayers } from "react-icons/sl";
import { IoPlayBackOutline } from "react-icons/io5";
import UserStaticBox from '../../components/UserStaticBox/UserStaticBox';
import SatisficationIndicator from '../../components/SatisficationIndicator/SatisficationIndicator';
import BrowserUsageStats from '../../components/BrowserUsageStats/BrowserUsageStats';
import TrafficIndicator from '../../components/TrafficIndicator/TrafficIndicator';
import AdvertisingIndicator from '../../components/AdvertisingIndicator/AdvertisingIndicator';
import Table from '../../components/Table/Table'
import './Index.scss'

export default function Index() {

    return (
        <>
            <div className="detail-box-row">
                <DetailBox symbol={<SlUserFollowing />} />
                <DetailBox symbol={<IoPlayBackOutline />} />
                <DetailBox symbol={<SlLayers />} />
                <DetailBox symbol={<SlUserFollowing />} />
            </div>
            <div className="Analytics-part">
                <UserStaticBox />
                <SatisficationIndicator />
                <BrowserUsageStats />
                <TrafficIndicator />
            </div>
            <div className="down-part-container">
                <Table>
                    <thead>
                        <tr>
                            <th>count</th>
                            <th>name</th>
                            <th>email</th>
                            <th>regitserDate</th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>reza azarnia</td>
                            <td>rezaazarnia158@gmail.com</td>
                            <td>2023/5/19</td>
                            <td><button className="edit-btn">edit</button></td>
                            <td><button className="delete-btn">delete</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>reza azarnia</td>
                            <td>rezaazarnia158@gmail.com</td>
                            <td>2023/5/19</td>
                            <td><button className="edit-btn">edit</button></td>
                            <td><button className="delete-btn">delete</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>reza azarnia</td>
                            <td>rezaazarnia158@gmail.com</td>
                            <td>2023/5/19</td>
                            <td><button className="edit-btn">edit</button></td>
                            <td><button className="delete-btn">delete</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>reza azarnia</td>
                            <td>rezaazarnia158@gmail.com</td>
                            <td>2023/5/19</td>
                            <td><button className="edit-btn">edit</button></td>
                            <td><button className="delete-btn">delete</button></td>
                        </tr>

                    </tbody>
                </Table>
                <AdvertisingIndicator />
            </div>
        </>
    )
}

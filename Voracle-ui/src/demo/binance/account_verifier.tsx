import React, { useState } from 'react';
import { Button, Col, Row, Spin } from 'antd';
import { createHmac } from 'crypto';
import axios from 'axios';

export function BinanceAccount() {
    const [aggregatedRs, setAggregatedRs] = useState([]);
    let [showSpin, setShowSpin] = useState(false);
    let callAggreggator = () => {
        setAggregatedRs([]);
        setShowSpin(true);
        let recvWindow0 = 5000;
        let timestamp0 = Date.now();
        let queryString = `recvWindow%3D${recvWindow0}%26timestamp%3D${timestamp0}`;
        let apiKey = (document.getElementById('apiKey') as HTMLInputElement).value;
        let secretKey = (document.getElementById('secretKey') as HTMLInputElement).value;
        if (!(apiKey && secretKey)) {
            return;
        }
        let hmac0 = createHmac('sha256', secretKey as string)
            .update(queryString)
            .digest('hex');
        console.log(`hmac -> ${hmac0}`);
        let queryParamSegment = queryString.concat('%26signature=').concat(hmac0);

        // all
        axios.get('http://localhost:8080/api/binance/account/BTC', {
            params: {
                apiKey, queryParamSegment
            }
        }).then((rs) => {
            setShowSpin(false);

            console.log(rs);
            console.log('=====');
            console.log(rs.data.data.data);
            setAggregatedRs(rs.data.data.data);
            // invoke smartcontract to check.
            //
            //
            // 
        }).catch((e) => {
            window.alert('server error!');
        });

    }

    let borderCss = {
        fontSize: '60px',
        border: '1px #666 solid',
    };

    return <>
        <div style={{ marginTop: '30px' }}>
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <div style={borderCss}>
                        <Row>
                            <Col span={6}></Col>
                            <Col span={12}><div style={{ textAlign: 'center', fontSize: '20px' }}><span style={{ color: 'rgb(255, 201, 15)', fontWeight: 'bolder' }}>Binance Cex</span></div></Col>
                            <Col span={6}></Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={20}>
                                        <div style={{ marginTop: '10px', fontWeight: 'bolder' }}>Check if Your Btc Balance in Binance Cex is Greater Than 1 BTC.</div>
                                        <div style={{ marginTop: '5px' }}>Your apiKey: <input type='text' id='apiKey' /><span style={{ color: 'red' }}>*</span></div>
                                        <div style={{ marginTop: '5px' }}>Your secretKey: <input type='text' id='secretKey' /><span style={{ color: 'red' }}>*</span></div>
                                        <div style={{ marginTop: '5px' }}>
                                            <Button type="primary" onClick={callAggreggator}>
                                                check!
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col span={2}></Col>
                                </Row>
                            </Col>
                            <Col span={11}>
                                <div style={{ marginTop: '6px', fontSize: '13px', border: '1px rgb(40, 255, 40) solid' }}>
                                    <div style={{ marginTop: '4px', fontWeight: 'bolder' }}>All registered Voracle Fetcher Nodes could help to fetch data & sign it:</div>
                                    <ul>
                                        <li>
                                            <div style={{ margin: '4px' }}><span style={{ color: 'green', fontWeight: 'bolder' }}>*</span>
                                                <input type='radio' checked style={{ color: 'green'}}/>Fetcher0: B62qikWxvd7g3smTA6vDEPqeXDnP6LnxU46gKFmB9rdC8ohdnPu1AoL
                                            </div>
                                        </li>
                                        <li>
                                            <div style={{ margin: '4px' }}><span style={{ color: 'green', fontWeight: 'bolder' }}>*</span>
                                                <input type='radio' checked style={{ color: 'green'}} />Fetcher1: B62qk522nBpiyG8sowkEbao2csaGm6PBtTUwSSLxkg6QTRfVDjG5xdg
                                            </div>
                                        </li>
                                        <li>
                                            <div style={{ margin: '4px' }}><span style={{ color: 'green', fontWeight: 'bolder' }}>*</span>
                                                <input type='radio' checked style={{ color: 'green'}} />Fetcher2: B62qooLE6R54n9vBkqf5N2w4kzB3ZSvGRXcXATXnX86kpiFp7jCDd7r
                                            </div>
                                        </li>

                                    </ul>

                                </div>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                        <Row>
                            <div style={{display: showSpin?'block':'none'}}>
                                <Spin />
                            </div>
                            <p id='callResult' style={{margin:'5px', display: aggregatedRs == null || aggregatedRs == undefined || aggregatedRs.length === 0?'none':'block'}}>
                                <span  style={{color: 'green', fontSize: '16px', display: Number.parseInt(aggregatedRs[0]?.data?.account.free)+Number.parseInt(aggregatedRs[0]?.data?.account.locked)>=1?'block':'none'}}>Verified Result: Your BTC is Greater than Equal 1BTC.<br/></span>
                                <span  style={{color: 'green', fontSize: '16px', display: Number.parseInt(aggregatedRs[0]?.data?.account.free)+Number.parseInt(aggregatedRs[0]?.data?.account.locked) < 1?'block':'none'}}>Verified Result: Your BTC is Less Than 1BTC.<br/></span>
                                Fetchers Responses:<br></br>
                                <span style={{ fontWeight: 'bolder'}}>Fetcher0: </span><span style={{margin:'10px', fontSize: '10px' }}>{aggregatedRs == null || aggregatedRs == undefined || aggregatedRs.length === 0?'':JSON.stringify(aggregatedRs[0].data)}</span><br/>
                                <span style={{ fontWeight: 'bolder'}}>Fetcher1: </span><span style={{margin:'10px', fontSize: '10px' }}>{aggregatedRs == null || aggregatedRs == undefined || aggregatedRs.length === 0?'':JSON.stringify(aggregatedRs[1].data)}</span><br/>
                                <span style={{ fontWeight: 'bolder'}}>Fetcher2: </span><span style={{margin:'10px', fontSize: '10px' }}>{aggregatedRs == null || aggregatedRs == undefined || aggregatedRs.length === 0?'':JSON.stringify(aggregatedRs[2].data)}</span><br/>
                                </p>
                        </Row>
                    </div>

                </Col>
                <Col span={2}></Col>
            </Row >
        </div >
    </>
}
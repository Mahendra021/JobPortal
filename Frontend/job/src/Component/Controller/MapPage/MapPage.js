import React, { Component } from 'react';
import MapPageView from '../../View/MapPage/MapPageView';


export class MapPage extends Component {
    constructor(props) {
        super(props)
        this.mapRef = React.createRef();
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <ul style={{ borderBottom :'1px solid',height:'49px' }}>
                    <li className="listCompany">Name</li>
                    <li key="2" id="logout" onClick={this.props.logout}>
                        <div>Logout</div>
                    </li>
                </ul>
                <MapPageView ref={this.mapRef} {...this.props} />
            </div>
        )
    }
}

export default MapPage

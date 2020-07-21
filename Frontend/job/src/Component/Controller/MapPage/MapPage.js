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
                <MapPageView ref={this.mapRef} />
            </div>
        )
    }
}

export default MapPage

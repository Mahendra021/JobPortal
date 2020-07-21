import React, { Component } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import './Assets/mappage.css'
import { createBrowserHistory } from 'history';
import { JobData, k, FiterData } from '../../Model/JobData';
import queryString from 'query-string'
import AddLayer from './AddLayer';
import AddMapSource from './AddSource';
import { hendelZoomIn, hendelZoomOut, hendelLacation, changeLayer } from './MapAction';
import { hendelSuggestionlist,hendelSearch,hendelexperience,hendelsalary } from './Filter';
import CreateJsonSource from '../../Controller/MapPage/CreateJsonSource';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG1hbmNpbmkiLCJhIjoiY2loNzVmcHJqMGl4cnV1a2lvampzMWpoZSJ9.YXdMfQxLF_hS9Jrvu_9_Rw';
var globalThis = null
var history = createBrowserHistory();

export class MapPageView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            features: [],
            icon: [],
            joblist: [],
            suggestion: [],
            list: [],
            filter: [],
            search: [],
            salaryfilter: '',
            experiencefilter: '',
        }
        this.map = null;
        globalThis = this
        this.changeLayer = changeLayer.bind(this)
    }
    addSource(source) {

        this.map.getSource('points').setData({
            "type": "FeatureCollection",
            "features": source
        });

    }
    getAdvBoundsData(MaxLongitude, MinLongitude, MaxLatitude, MinLatitude) // This Function Give Company List Filter As Current User Screen Boundry On Map Area
    {
        if (this.state.list.length > 0 || this.state.filter.length > 0) {

            if (this.state.filter.length > 0) {
                var JsonData = this.state.filter
            }
            else {
                JsonData = this.state.list;
            }
        }
        else {
            JsonData = this.state.features;
        }
        var NewJson = [];

        for (var i = 0; i < JsonData.length; i++) {
            if ((JsonData[i].geometry.coordinates[1] > MinLatitude && JsonData[i].geometry.coordinates[1] < MaxLatitude) &&
                (JsonData[i].geometry.coordinates[0] > MinLongitude && JsonData[i].geometry.coordinates[0] < MaxLongitude))  // Checking Current Company is in User Screen boundry box and also checking adventure filter is availble for this adventure or not 
            {
                NewJson.push(JsonData[i])
            }
        }
        return NewJson;
    }

    async componentDidMount() {

        var map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [72.5714, 23.0225], // starting position [lng, lat]
            zoom: 14 // starting zoom
        });

        var url = window.location.search
        var params = queryString.parse(url)

        console.log(url)

        if(url === ''){
            var data = await JobData()
        }
        else{
            var data = await FiterData(this.state.salaryfilter,this.state.experiencefilter,params.search)
        }

        var features = CreateJsonSource(data);
        this.state.features = features

        map.on('load', function () {

            var path = 'http://localhost:3000/images/marker.png'; //path

            map.loadImage(path, function (error, resimage) {
                map.addImage('marker', resimage)
            });

            map = AddMapSource(map);
            globalThis.addSource(features);
            AddLayer(map);

            var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

            var geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false,
                placeholder: 'Loaction',

            });

            geocoder.on('result', function (en) {
                console.log(en.result);
                var search = en.result.center
                globalThis.state.search = search
                map.flyTo(false)

            })
            document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

            map.on('click', 'clusters', function (e) // Cluster Click Event
            {
                var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
                var clusterId = features[0].properties.cluster_id;
                map.getSource('points').getClusterExpansionZoom(clusterId, function (err, zoom) {
                    if (err)
                        return;
                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                });
                map.fire('moveend');
            });

            map.on('click', 'points', function (e) {
                var features = map.queryRenderedFeatures(e.point);
                console.log(features[0])
                if (features[0].properties.id !== undefined) {
                    history.push("/JobDetail?id=" + features[0].properties.id)
                    window.location.reload()
                }
            });

            map.on('moveend', function (e) {

                var boundaries = map.getBounds();

                var newJobList = globalThis.getAdvBoundsData(boundaries._ne.lng, boundaries._sw.lng, boundaries._ne.lat, boundaries._sw.lat);

                globalThis.addSource(newJobList)

                globalThis.setState({
                    joblist: newJobList
                })

                if (features) {
                    // Populate features for the listing overlay.
                    globalThis.renderListings(newJobList);
                }
            });
            map.on('style.load', function () {

                var loadedStyle = map.getStyle();

                if (true) {
                    map.loadImage(path, function (error, resimage) {
                        map.addImage('marker', resimage)
                    });
                    map = AddMapSource(map)
                    //globalThis.addSource(this.state.features);
                    map = AddLayer(map)
                    map.fire('moveend')
                }
            });

            var popup;

            map.on('mouseenter', 'points', function (e) {

                var features = map.queryRenderedFeatures(e.point);
                // console.log(features[0])
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                var latitude = e.lngLat.lat;
                var longitude = e.lngLat.lng;
                // Populate the popup and set its coordinates
                // based on the feature found.
                // console.log('images/'+features[0].properties.img)
                popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
                    .setLngLat([longitude, latitude])
                    .setHTML('<div class="container">\
                    <img src="images/'+ features[0].properties.img + '.jpg" class="popupimg"/>\
                    <div id="text-block">'+ features[0].properties.name + '\
                    <p class ="title">Post : '+ features[0].properties.title + '<br/></p>\
                    <p class ="address">Address : '+ features[0].properties.add + ',' + features[0].properties.city + ',' + features[0].properties.state + ',</p>\
                    <p class ="date">Publish Date : ' + features[0].properties.publish_date + '</p>\
                    </div></div>\
                    ')
                    .addTo(map);
            });

            map.on('mouseleave', 'points', function () {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });

            map.on('mouseenter', 'clusters', function () {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });

            map.on('mouseenter', 'cluster-count', function () {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });

        });

        this.map = map;

    }

    renderListings(feature) {
        // Clear any existing listings
        var listingEl = document.getElementById('feature-listing');

        listingEl.innerHTML = '';
        var popup;

        if (feature.length) {

            feature.forEach(function (feature) {

                var item = document.createElement('a');
                item.target = '_blank';
                item.onclick = () => {
                    history.push("/JobDetail?id=" + feature.properties.id)
                    window.location.reload()
                }
                item.innerHTML = '<div class="mainHolder12" style="background-image: linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(0, 0, 0, 0.7)), url(' + "'" + 'images/' + feature.properties.img + '.jpg' + "'" + ');">\
                <div id="list-block">'+ feature.properties.name + '\
                <p class="title">Post : '+ feature.properties.title + '<br/></p>\
                <p class ="address">Address : '+ feature.properties.add + ',' + feature.properties.city + ',' + feature.properties.state + ',</p>\
                <p class="date">Publish Date : ' + feature.properties.publish_date + '\</p>\
                </div></div>';

                item.addEventListener('mouseenter', function () {

                    var latitude = feature.geometry.coordinates[1];
                    var longitude = feature.geometry.coordinates[0];

                    // Highlight corresponding feature on the map

                    popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
                        .setLngLat([longitude, latitude])
                        .setHTML('<div class="container">\
                        <img src="images/'+ feature.properties.img + '.jpg" class="popupimg"/>\
                        <div id="text-block">'+ feature.properties.name + '\
                        <p class ="title">Post : '+ feature.properties.title + '<br/></p>\
                        <p class ="address">Address : '+ feature.properties.add + ',' + feature.properties.city + ',' + feature.properties.state + ',</p>\
                        <p class ="date">Publish Date : ' + feature.properties.publish_date + '</p>\
                        </div></div>\
                        ')
                        .addTo(globalThis.map);

                });
                item.addEventListener('mouseleave', function () {

                    popup.remove();

                })
                listingEl.appendChild(item);
            });

        }
        else {
            var empty = document.createElement('p');
            empty.textContent = 'Drag the map to populate results';
            listingEl.appendChild(empty);
        }
    }

    render() {
        return (
            <div>
                <ul>
                    <li className="listCompany">Company Found({this.state.joblist.length})</li>
                    <li className="fieldSearch"><input type="text" id="suggestion" onChange={() => hendelSuggestionlist.call(this)} placeholder="Skill,Company,Post,etc.." name="search" />
                        <div className="suggestionhendel">
                            <ul className="suggestionbox"></ul>
                        </div>
                    </li>
                    <li className="locationSearch">Location</li>
                    <li className="searchbotton" onClick={() => hendelSearch.call(this,this.map)}>Search</li>
                </ul>
                <div className="map-overlay">

                    <div id="feature-listing" className="listing"></div>
                </div>
                <div id='map'>
                    {/*Map Zoom Element Code Start*/}
                    <div className='Zoommaindiv'>
                        <div onClick={() => hendelZoomIn.call(this,this.map)}>
                            <img className="Zoomin" src="images/add.png" />
                        </div>
                        <div className="Location" onClick={() => hendelLacation.call(this,this.map)}>
                            <img src="images/location.png" />
                        </div>
                        <div onClick={() => hendelZoomOut.call(this,this.map)}>
                            <img className="Zoomout" src="images/reduce.png" />
                        </div>
                    </div>
                    {/*Map Zoom Element Code End*/}

                    <div>
                        <div className="Filtermain">
                            <img className="filter" src="images/filter.png" />
                        </div>
                        <div className="Filterdiv">
                            <div className="filterlist">Experience
                                <div className="experiencelist" style={{ marginTop: "4px", borderTop: " 1px solid black" }} onClick={() => hendelexperience.call(this, '1')}>1</div>
                                <div className="experiencelist" onClick={() => hendelexperience.call(this, '2')}>2</div>
                                <div className="experiencelist" onClick={() => hendelexperience.call(this, '3')}>3</div>
                                <div className="experiencelist" onClick={() => hendelexperience.call(this, '4')}>4</div>
                                <div className="experiencelist" style={{ borderBottom: 'none' }} onClick={() => hendelexperience.call(this, '5')}>5</div>
                            </div>
                            <div className="filterlist">Salary
                                <div className="salarylist" style={{ marginTop: "4px", borderTop: " 1px solid black" }} onClick={() => hendelsalary.call(this, '10000')}>10000</div>
                                <div className="salarylist" onClick={() => hendelsalary.call(this, '15000')}>15000</div>
                                <div className="salarylist" onClick={() => hendelsalary.call(this, '20000')}>20000</div>
                                <div className="salarylist" onClick={() => hendelsalary.call(this, '25000')}>25000</div>
                                <div className="salarylist" onClick={() => hendelsalary.call(this, '30000')}>30000</div>
                                <div className="salarylist" onClick={() => hendelsalary.call(this, '35000')}>35000</div>
                                <div className="salarylist" onClick={() => hendelsalary.call(this, '40000')}>40000</div>
                                <div className="salarylist" style={{ borderBottom: 'none' }} onClick={() => hendelsalary.call(this, '50000')}>50000</div>
                            </div>
                            <div className="filterlist">Job Type
                            </div>
                            <div className="filterlist">Fresher</div>
                            <div className="filterlist">Industy</div>
                            <div className="filterlist">Qualifications</div>
                            <div className="filterlist">Role</div>
                            <div className="filterlist" style={{ borderBottom: '0px' }}>Staff</div>
                        </div>
                    </div>

                    {/* Map Style Change Code Start */}
                    <div className="Stylemaindiv">
                        <img className="map" src="images/map.png" />
                    </div>

                    <div className='Stylediv'>
                        <div className='childitem' onClick={() => this.changeLayer(this.map,'streets-v11')}>
                            <img className="Styleimg" src="images/Streets.png" />
                            <div style={{ textAlign: 'center' }}>Streets</div>
                        </div>
                        <div className='childitem' onClick={() => this.changeLayer(this.map,'light-v10')}>
                            <img className="Styleimg" src="images/Light.png" />
                            <div style={{ textAlign: 'center' }}>Light</div>
                        </div>
                        <div className='childitem' onClick={() => this.changeLayer(this.map,'dark-v10')}>
                            <img className="Styleimg" src="images/Dark.png" />
                            <div style={{ textAlign: 'center' }}>Dark</div>
                        </div>
                        <div className='childitem' onClick={() => this.changeLayer(this.map,'outdoors-v11')}>
                            <img className="Styleimg" src="images/Outdoors.png" />
                            <div style={{ textAlign: 'center' }}>Outdoors</div>
                        </div>
                        <div className='childitem' onClick={() => this.changeLayer(this.map,'satellite-v9')}>
                            <img className="Styleimg" src="images/Satellite.png" />
                            <div style={{ textAlign: 'center' }}>Satellite</div>
                        </div>
                    </div>
                    {/* Map Style Change Code End */}

                </div>
                <div id="geocoder" className="geocoder"></div>
            </div >
        )
    }
}

export default MapPageView

import React from 'react'
import {Text} from 'galio-framework';
import {PermissionsAndroid} from 'react-native'
import Geolocation from 'react-native-geolocation-service';

class Location extends React.Component{
    state: {
        location: {
            latitude: 0,
            longitude: 0
        }
    }

    async componentDidMount(){
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    'title': 'Location Access Required',
                    'message': 'This App needs to Access your location'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(position => {
                    this.setState({
                        location: position.coords,
                    })
                }, error => alert(error.message), {enableHighAccuracy: true, timeout: 1000000000, maximumAge: 1000})
            } else {
                alert("Permission Denied");
            }
        } catch (err) {
            alert(JSON.stringify(err));
            console.warn(err)
        }
    }

    render() {
        return (
            <Text>getting your location </Text>
        );
    }

}

export default Location

import * as React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import useCurrentLocation from '../hooks/useCurrentLocation';
import { Text, View } from '../components/Themed';

function GreenMarker() {
  return <>
    <View style={styles.markerContainer} pointerEvents="none">
      <View style={{
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: 'green',
        borderWidth: 4,
        borderColor: "white"
      }} />
    </View>
    <View style={styles.markerContainer} pointerEvents="none">
      <View style={{
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: 'green',
        opacity: 0.2,
      }} />
    </View>
  </>
}


export default function LocationPicker({initialLocation, onLocation, onCancel}) {

  let [currentLocation, locationError] = useCurrentLocation();
  let [location, setLocation] = React.useState(initialLocation ? initialLocation : null);

  React.useEffect(() => {
    if (!location && currentLocation && currentLocation.coords) {
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
    }
  }, [currentLocation]);

  return (
    <View style={styles.container}>
      {
        location ? <View style={styles.mapContainer}>
            <MapView style={styles.map} showsUserLocation onRegionChange={event => setLocation({latitude: event.latitude, longitude: event.longitude})} initialCamera={{center: location,
              pitch: 0,
              heading: 0,
              altitude: 1500,
              zoom: 10}}
            />
           <GreenMarker />
          <TouchableOpacity onPress={() => onLocation(location)} style={{
            position: 'absolute',
            bottom: 80,
            alignSelf: 'center',
            minWidth: 300,
            maxWidth: '90%',
          }} >
            <View style={{
              borderRadius: 15,
              backgroundColor: 'green',
              padding: 16
            }}>
              <Text style={{color: 'white', alignSelf: 'center', fontSize: 16, fontWeight: '700'}}>Set Location</Text>
            </View>
          </TouchableOpacity>      
          <TouchableOpacity onPress={() => onCancel()} style={{
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
          }} >
            <View style={{
              padding: 12,
              backgroundColor: 'transparent',
            }}>
              <Text style={{color: 'black', alignSelf: 'center', fontSize: 16, fontWeight: '700'}}>Cancel</Text>
            </View>
          </TouchableOpacity>          
        </View> : <View style={styles.errorContainer}>
          <Text style={{color: 'black'}}>Loading map...</Text>
          <Text style={{color: 'red'}}>{locationError}</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  markerContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  mapContainer: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  errorContainer: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

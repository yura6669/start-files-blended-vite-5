const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
};

function success(position) {
    const crd = position.coords;
    return {
        latitude: crd.latitude,
        longitude: crd.longitude,
    }
}

function error(error) {
    console.error('Error getting location:', error);
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(success(position)),
            (err) => {
                error(err);
                reject(err);
            },
            options
        );
    });
}

export { getCurrentPosition };
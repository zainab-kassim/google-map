let btn = document.getElementById("btn");
const apiKey = "AIzaSyCOmUvYh3QOFTFZSihs75tueN_e7ebcwAg";
let address1=document.querySelector('#current-location');
let address2=document.querySelector('#destination');

crl_btn.addEventListener("click",function(){
function getLocation() {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Request the current position
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      // Geolocation is not supported by this browser
      alert("Geolocation is not supported by your browser.");
    };
  };
  function showPosition(position){
    // Get latitude and longitude
    const { latitude, longitude } = position.coords
    //or const latitude=position.coords.latitude
    // Call the reverse geocoding function
    reverseGeocode(latitude, longitude);
};
  function showError(error){
    alert("Error getting geolocation:", error.message);
  };
  getLocation()
// Reverse geocoding function
async function reverseGeocode(latitude, longitude) {
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
// Make a request to the reverse geocoding API
try {
const response = await fetch(apiUrl);
const data = await response.json();
// Extract the formatted address from the response
const convertedAddress = data.results[0].formatted_address;
address1.value = convertedAddress;
} catch (error) {
alert("Error fetching reverse geocoding data:", error);
};
};
});

btn.addEventListener("click", async function (e) {
    e.preventDefault()
       try{
        //get the value from input
        let origin = address1.value;
        let destination = address2.value;
        console.log(origin);
        console.log(destination);

        //save it in a request object
        const request = {
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING'
        };

        //initialize your map parameters
        let map = new google.maps.Map(
            document.querySelector("#container"), {
            zoom: 2,
        })

        //call the direction service functiond
        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);

        //set the route on the direction and display the line from a to b
        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
       }
     catch (error) {
        console.log(error)
     }
});
    
//     try {
//         // const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`
//         // const response = await fetch(geocodingUrl);
//         // const data = await response.json();
//         // const { lng, lat } = data.results[0].geometry.location

//         // function initMap(){}
//         // const map = new google.maps.Map(
//         //     document.querySelector("#container"), {
//         //     zoom: 20,
//         //     center: { lng: lng, lat: lat }
//         // }
//         // )
//            //get the value from input
          
//            //save it in a request object
//     //        const request = {
//     //            origin: origin,
//     //            destination: destination,
//     //            travelMode: 'DRIVING'
//     //        };
   
//     //        //initialize your map parameters
//     //        let map = new google.maps.Map(
//     //            document.querySelector("#container"), {
//     //            zoom: 20,
//     //        })
   
//     //        //call the direction service functiond
//     //        let directionsService = new google.maps.DirectionsService();
//     //        let directionsDisplay = new google.maps.DirectionsRenderer();
//     //        directionsDisplay.setMap(map);
   
//     //        //set the route on the direction and display the line from a to b
//     //        directionsService.route(request, function (result, status) {
//     //            if (status == 'OK') {
//     //                directionsDisplay.setDirections(result);
//     //            } else {
//     //                window.alert('Directions request failed due to ' + status);
//     //            }
//     //        });
//     //    }
//     }


//     catch (error) {
//         console.log(error)

//     }


// })



// const url = `https://maps.googleapis.com/maps/api/geocode/json?ad
// const response = await fetch(url);
// // const result = await response.json();
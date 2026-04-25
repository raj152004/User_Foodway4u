// "use client";
// import { useState, useEffect, useCallback } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

// // Map styling and container size
// const mapContainerStyle = {
//   width: '100%',
//   height: '100%',
//   borderRadius: '2.5rem'
// };

// // Default Indore Coordinates (Aap inhe apne hisaab se change kar sakte hain)
// const restaurantLocation = { lat: 22.7196, lng: 75.8577 }; // Central Indore
// const homeLocation = { lat: 22.7533, lng: 75.8937 }; // Vijay Nagar (Example Home)

// export default function TrackOrderPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('id') || "FW-123456";

//   const [orderState, setOrderState] = useState("preparing"); 
//   const [directions, setDirections] = useState(null);
//   const [bikePosition, setBikePosition] = useState(restaurantLocation);

//   // ========================================================
//   // 🔴 YAHAN APNI GOOGLE MAPS API KEY DAALEIN
//   // ========================================================
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyAepBinSy2JxyEvbidFz_AnFYFsFlFqQo4", // <--- YE RAHI AAPKI KEY
//   });

//   // Route calculate karne ka function
//   const fetchDirections = useCallback(() => {
//     if (!window.google) return;

//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: restaurantLocation,
//         destination: homeLocation,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error("Error fetching directions", result);
//         }
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (isLoaded && !loadError) {
//       fetchDirections();
//     }
//   }, [isLoaded, loadError, fetchDirections]);

//   // Demo Simulation: Status and Bike Movement
//   useEffect(() => {
//     // 5 second baad khana nikal gaya
//     const timer1 = setTimeout(() => {
//       setOrderState("way");
//     }, 5000);

//     // Bike ko dheere-dheere move karne ka simulation
//     let moveInterval;
//     if (orderState === "way") {
//       let step = 0;
//       moveInterval = setInterval(() => {
//         step += 0.05; // speed of bike
//         if (step >= 1) {
//           setOrderState("arrived");
//           clearInterval(moveInterval);
//         } else {
//           // Interpolate coordinates between Restaurant and Home
//           setBikePosition({
//             lat: restaurantLocation.lat + (homeLocation.lat - restaurantLocation.lat) * step,
//             lng: restaurantLocation.lng + (homeLocation.lng - restaurantLocation.lng) * step,
//           });
//         }
//       }, 1000); // Har 1 second mein map par bike update hogi
//     }

//     return () => {
//       clearTimeout(timer1);
//       if (moveInterval) clearInterval(moveInterval);
//     };
//   }, [orderState]);

//   return (
//     <div className="bg-[#F8F9FB] min-h-screen font-sans text-gray-900 pb-24">
//       {/* HEADER */}
//       <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm px-4 py-4 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={() => router.push('/orders')} 
//             className="p-2.5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
//           </button>
//           <div>
//             <h1 className="text-xl font-black tracking-tight">Track Order</h1>
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {orderId}</p>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-xl mx-auto px-4 pt-6">
        
//         {/* ========================================= */}
//         {/* GOOGLE MAPS LIVE VISUALIZATION BOX */}
//         {/* ========================================= */}
//         <div className="bg-gray-200 h-72 md:h-96 w-full rounded-[2.5rem] shadow-md border-4 border-white overflow-hidden relative mb-8 flex items-center justify-center">
           
//            {/* Agar Google Map fail ho jaye (jaise API error) toh ye dikhega, white screen nahi aayegi */}
//            {loadError && (
//              <div className="p-6 text-center">
//                <div className="text-4xl mb-2">🗺️</div>
//                <h3 className="text-red-500 font-black text-lg">Map Loading Error</h3>
//                <p className="text-xs text-gray-500 font-bold mt-1">Please check if Directions API is enabled in Google Cloud.</p>
//              </div>
//            )}

//            {/* Jab map load ho raha ho */}
//            {!isLoaded && !loadError && (
//              <div className="p-6 text-center text-gray-500 font-bold animate-pulse">
//                 Loading Live Map...
//              </div>
//            )}
           
//            {/* Jab Map successfully load ho jaye */}
//            {isLoaded && !loadError && (
//              <GoogleMap
//                mapContainerStyle={mapContainerStyle}
//                zoom={13}
//                center={restaurantLocation}
//                options={{
//                  disableDefaultUI: true, // Hides map controls for a cleaner look
//                  zoomControl: true,
//                }}
//              >
//                {/* Draws the Blue Route Line */}
//                {directions && (
//                  <DirectionsRenderer 
//                    directions={directions} 
//                    options={{ suppressMarkers: true, polylineOptions: { strokeColor: "#0A64BC", strokeWeight: 5 } }}
//                  />
//                )}
               
//                {/* Home Marker */}
//                <Marker position={homeLocation} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/homegardenbusiness.png" }} />
               
//                {/* Live Moving Bike Marker */}
//                {(orderState === "way" || orderState === "arrived") && (
//                  <Marker 
//                    position={bikePosition} 
//                    icon={{
//                      url: "https://cdn-icons-png.flaticon.com/512/1986/1986966.png", // Delivery bike icon
//                      scaledSize: isLoaded ? new window.google.maps.Size(40, 40) : null
//                    }} 
//                  />
//                )}
//              </GoogleMap>
//            )}

//            {/* Map Overlay Status Badge */}
//            <div className="absolute top-4 left-4 right-4 z-10 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg text-center">
//               <h3 className="font-black text-lg text-gray-800">
//                 {orderState === "preparing" ? "👨‍🍳 Preparing your food" : 
//                  orderState === "way" ? "🛵 Rider is on the way!" : 
//                  "🎉 Food has arrived!"}
//               </h3>
//               <p className="text-xs font-bold text-gray-500 mt-1">
//                 {orderState === "preparing" ? "Expected in 25 mins" : 
//                  orderState === "way" ? "Expected in 10 mins" : 
//                  "Enjoy your meal"}
//               </p>
//            </div>
//         </div>

//         {/* TRACKING TIMELINE */}
//         <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mb-8">
//            <h3 className="font-black text-lg mb-6 tracking-tight">Order Status</h3>
//            <div className="relative space-y-8">
//               <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-100 -z-10"></div>
              
//               {/* Step 1 */}
//               <div className="flex items-start space-x-4 relative">
//                  <div className="w-8 h-8 rounded-full bg-[#0A64BC] text-white flex items-center justify-center text-xs shadow-md border-4 border-white z-10">✓</div>
//                  <div>
//                    <h4 className="font-bold text-gray-800">Order Accepted</h4>
//                    <p className="text-xs text-gray-400 font-medium">Restaurant is processing your order.</p>
//                  </div>
//               </div>

//               {/* Step 2 */}
//               <div className="flex items-start space-x-4 relative">
//                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md border-4 border-white z-10 transition-colors duration-500 ${orderState === "preparing" || orderState === "way" || orderState === "arrived" ? "bg-[#0A64BC] text-white" : "bg-gray-200 text-gray-400"}`}>
//                     {orderState === "preparing" ? "..." : "✓"}
//                  </div>
//                  <div>
//                    <h4 className={`font-bold transition-colors ${orderState === "preparing" ? "text-[#0A64BC]" : "text-gray-800"}`}>Preparing Food</h4>
//                    <p className="text-xs text-gray-400 font-medium">Your food is being cooked.</p>
//                  </div>
//               </div>

//               {/* Step 3 */}
//               <div className="flex items-start space-x-4 relative">
//                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md border-4 border-white z-10 transition-colors duration-500 ${orderState === "way" || orderState === "arrived" ? "bg-[#0A64BC] text-white" : "bg-gray-200 text-gray-400"}`}>
//                     {orderState === "way" ? "..." : orderState === "arrived" ? "✓" : "!"}
//                  </div>
//                  <div>
//                    <h4 className={`font-bold transition-colors ${orderState === "way" ? "text-[#0A64BC]" : orderState === "arrived" ? "text-gray-800" : "text-gray-400"}`}>Out for Delivery</h4>
//                    <p className="text-xs text-gray-400 font-medium">Rider has picked up your food.</p>
//                  </div>
//               </div>
//            </div>
//         </div>

//         {/* RIDER INFO CARD */}
//         {orderState === "way" && (
//           <div className="bg-[#0A64BC] text-white rounded-[2rem] p-6 shadow-xl shadow-blue-100 flex items-center justify-between animate-in slide-in-from-bottom">
//              <div className="flex items-center space-x-4">
//                 <div className="w-14 h-14 bg-white/20 rounded-xl overflow-hidden border-2 border-white/50 backdrop-blur-sm">
//                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rider" alt="Rider" className="w-full h-full object-cover" />
//                 </div>
//                 <div>
//                    <h4 className="font-black text-lg">Ramu Kaka</h4>
//                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Delivery Partner</p>
//                 </div>
//              </div>
//              <button className="bg-white text-[#0A64BC] p-3 rounded-xl shadow-md active:scale-95 transition-transform">
//                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.2-.6-2.4-.6-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2a9 9 0 00-9-9v2c3.9 0 7.1 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z"/></svg>
//              </button>
//           </div>
//         )}

//       </main>
//     </div>
//   );
// }

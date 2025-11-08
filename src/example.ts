      
    //   <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
    //     <div className="absolute inset-0">
    //       <img
    //         src={heroImage}
    //         alt="Our Premium Services"
    //         className="w-full h-full object-cover"
    //       />
    //       {/* MODIFIED: Gradient is more transparent for a clearer image */}
    //       <div className="absolute inset-0 bg-gradient-to-r from-brown/60 via-brown/50 to-brown/40" />
    //     </div>
        
    //     <div className="relative z-10 container mx-auto px-4 py-24">
    //       <div className="max-w-3xl mx-auto text-center animate-fade-in">
    //         <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
    //           Our Premium Services
    //         </h1>
    //         <p className="font-body text-xl text-white/90 leading-relaxed">
    //           Comprehensive care solutions for your precious carpets and shawls, combining traditional craftsmanship with modern techniques.
    //         </p>
    //       </div>
    //     </div>
    //   </section>



    // import { useState } from 'react';

// // Mock components
// const Header = () => (
//   <header className="bg-white border-b border-black/5 py-4">
//     <div className="container mx-auto px-4">
//       <h1 className="text-2xl font-serif font-medium text-purple-700">Carpet & Shawl Services</h1>
//     </div>
//   </header>
// );

// const Footer = () => (
//   <footer className="bg-gray-800 text-white py-8">
//     <div className="container mx-auto px-4 text-center">
//       <p>&copy; 2024 Premium Carpet Services. All rights reserved.</p>
//     </div>
//   </footer>
// );

// // Carpet Services
// const carpetServices = [
//   {
//     title: "Professional Washing",
//     description: [
//       "Proper rug cleaning is vital for preserving the appearance and longevity of your precious rugs. The frequency of deep cleaning depends on factors like rug type, foot traffic, and the presence of pets or allergens. Generally, it's best to schedule a deep clean every 12 to 18 months.",
//       "When dealing with hand-knotted or hand-woven rugs, which are delicately crafted, a specialized approach is required.",
//     ],
//     bulletPoints: [
//       "Rug Inspection",
//       "Dust and Grit Removal",
//       "Pre-Treatment",
//       "Full Immersion Cleaning",
//       "Rug Drying",
//       "Inspection and Delivery",
//     ],
//     videoSrc: "https://www.youtube.com/embed/rslXOypyNx0",
//     layout: "video-left",
//   },
//   {
//     title: "Expert Repairing",
//     description: [
//       "Expertise and skill are crucial when it comes to repairing damaged rugs, guaranteeing a successful restoration. Restoring a rug with minor damage is relatively easier compared to one with extensive damage. Our team of professional rug repair specialists possesses the necessary knowledge and experience to address various types of rug damage.",
//     ],
//     bulletPoints: [
//       "Fringe repair/replacement",
//       "Rug overcasting/Binding",
//       "Reweaving/Rafu",
//       "Color Restoration",
//       "Delamination on Tufted Rugs",
//     ],
//     videoSrc: "https://www.youtube.com/embed/xpsrgBVnC4I",
//     layout: "video-right",
//   },
//   {
//     title: "Complete Restoration",
//     description: [
//       "It's always better to restore than replace. Our finest technicians will ensure your old rug matches your new interior. We bring vintage and antique carpets back to their former glory with our comprehensive service.",
//     ],
//     bulletPoints: [
//       "Fresh new look to old rugs",
//       "Match with your interior",
//       "Restoration is better than replacement.",
//     ],
//     videoSrc: "https://www.youtube.com/embed/zThfR7ecetw",
//     layout: "video-left",
//   },
// ];

// // Shawl Services
// const shawlServices = [
//   {
//     title: "Delicate Shawl Washing",
//     description: [
//       "Specialized hand-washing for precious Pashmina and Kashmiri shawls, using gentle techniques that preserve the delicate fibers and intricate embroidery of your treasured items.",
//     ],
//     bulletPoints: [
//       "Color-fastness testing",
//       "Gentle, PH-neutral hand-wash",
//       "Natural air drying",
//       "Soft steam finishing",
//     ],
//     videoSrc: "https://www.youtube.com/embed/NP_jXK0Kk9k",
//     layout: "video-left",
//   },
//   {
//     title: "Shawl Restoration",
//     description: [
//       "Expert restoration of vintage and heirloom shawls. Our artisans meticulously repair tears, re-weave holes, and revive faded colors using authentic materials and time-honored methods.",
//     ],
//     bulletPoints: [
//       "Thread-by-thread reweaving",
//       "Natural dye color matching",
//       "Tear and hole repair",
//       "Fringe and border restoration",
//     ],
//     videoSrc: "https://www.youtube.com/embed/NnhLLxUr9zE",
//     layout: "video-right",
//   },
// ];

// // Other Services
// const otherServices = [
//   {
//     title: "Sell & Exchange Program",
//     description: [
//       "Upgrade your collection with our exclusive sell and exchange program. We offer fair valuations for your quality pieces, allowing you to trade them for a new treasure from our curated collection.",
//     ],
//     bulletPoints: [
//       "Expert valuation",
//       "Trade-in for new items",
//       "Consignment options",
//       "Direct purchasing",
//     ],
//     videoSrc: "https://www.youtube.com/embed/M3HPNC3CLyk",
//     layout: "video-right",
//   },
// ];

// const ServiceSection = ({ services, sectionTitle }) => {
//   return (
//     <section className="py-16 bg-slate-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl md:text-5xl font-serif font-medium text-purple-700 tracking-wider mb-16 text-center">
//           {sectionTitle}
//         </h2>

//         <div className="space-y-20">
//           {services.map((service, index) => (
//             <div key={index} className="flex flex-col gap-8 items-start">
//               {/* Grid with equal columns */}
//               <div
//                 className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start
//                   ${service.layout === "video-right" ? "" : ""}`}
//               >
//                 {/* --- Video Column Wrapper --- */}
//                 <div className={`${service.layout === "video-right" ? "lg:order-last" : ""}`}>
//                   <div className="rounded-lg w-[80%] overflow-hidden shadow-lg border border-black/5">
//                     <iframe
//                       src={`${service.videoSrc}?autoplay=1&mute=1&loop=1&playlist=${service.videoSrc.split("/").pop()}&controls=0&showinfo=0`}
//                       title={service.title}
//                       frameBorder="0"
//                       allow="autoplay; encrypted-media"
//                       allowFullScreen
//                       className="w-full h-80 object-cover"
//                     ></iframe>
//                   </div>
//                 </div>

//                 {/* --- Text Column (Takes 2 columns) --- */}
//                 <div className="font-serif flex flex-col justify-start">
//                   <h3 className="text-3xl md:text-4xl font-medium text-gray-800 tracking-wider mb-6">
//                     {service.title}
//                   </h3>

//                   {service.description.map((text, i) => (
//                     <p key={i} className="text-base text-gray-600 mb-4 leading-relaxed">
//                       {text}
//                     </p>
//                   ))}

//                   <ul className="list-disc list-inside space-y-2 mt-6 text-base text-gray-600">
//                     {service.bulletPoints.map((point, i) => (
//                       <li key={i}>{point}</li>
//                     ))}
//                                       </ul>
//                   </div>
//                 </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const Services = () => {
//   return (
//     <div className="bg-slate-50">
//       <Header />

//       {/* Carpet Services Section */}
//       <ServiceSection services={carpetServices} sectionTitle="Carpet Services" />

//       {/* Shawl Services Section */}
//       <ServiceSection services={shawlServices} sectionTitle="Shawl Services" />

//       {/* Other Services Section */}
//       <ServiceSection services={otherServices} sectionTitle="Other Services" />

//       {/* Our Advantages Section */}
//       <section className="py-16 bg-white border-t border-black/5">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//             <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 tracking-wider whitespace-nowrap">
//               OUR ADVANTAGES
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
//               {/* Advantage 1 */}
//               <div className="flex flex-col items-center text-center">
//                 <div className="mb-4">
//                   <svg
//                     className="w-12 h-12 text-gray-800 mx-auto"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-base font-medium text-gray-800 mb-2">
//                   Hassle-Free Process
//                 </h3>
//               </div>

//               {/* Advantage 2 */}
//               <div className="flex flex-col items-center text-center">
//                 <div className="mb-4">
//                   <svg
//                     className="w-12 h-12 text-gray-800 mx-auto"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-base font-medium text-gray-800 mb-2">
//                   Pick-up and Drop
//                 </h3>
//               </div>

//               {/* Advantage 3 */}
//               <div className="flex flex-col items-center text-center">
//                 <div className="mb-4">
//                   <svg
//                     className="w-12 h-12 text-gray-800 mx-auto"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M12 4.354a4 4 0 110 5.292m0 0H8.646a4 4 0 010-5.292m3.354 0H12m0 0h3.354a4 4 0 000 5.292M9 12H5.646m6.354 0h3.354"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-base font-medium text-gray-800 mb-2">
//                   Experienced Team
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Services;
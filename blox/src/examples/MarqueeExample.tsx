// MarqueeExample.tsx
import React from "react";
import { Marquee } from "../components/Marquee";

export const MarqueeExample: React.FC = () => {
  return (
    <div className="marquee-examples">
      <h2 className="text-2xl font-bold mb-6">Marquee Examples</h2>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Basic Marquee (Left to Right)</h3>
        <Marquee
          className="h-16 border border-gray-200 rounded-md bg-gray-50"
          speed="normal">
          <div className="flex items-center space-x-6">
            {["React", "TypeScript", "JavaScript", "HTML", "CSS", "Node.js", "Next.js", "GraphQL"].map((item) => (
              <div
                key={item}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Vertical Marquee (Bottom to Top)</h3>
        <Marquee
          direction="up"
          className="h-40 border border-gray-200 rounded-md bg-gray-50"
          speed="slow">
          <div className="flex flex-col space-y-4 py-2">
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
              <div
                key={month}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-md text-center w-40">
                <span>{month}</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Alternating Marquee</h3>
        <Marquee
          behavior="alternate"
          className="h-16 border border-gray-200 rounded-md bg-gray-50"
          speed="fast"
          pauseOnHover>
          <div className="flex items-center space-x-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <div
                key={num}
                className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-800 rounded-full font-bold">
                {num}
              </div>
            ))}
          </div>
        </Marquee>
        <p className="text-sm text-gray-600 mt-2">Hover over the marquee to pause it</p>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Custom Logo Marquee</h3>
        <Marquee
          className="h-20 border border-gray-200 rounded-md bg-white"
          speed="slow"
          gap={60}>
          <div className="flex items-center space-x-12">
            {["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"].map((brand) => (
              <div
                key={brand}
                className="h-10 flex items-center px-6 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-24 h-10 flex items-center justify-center bg-gray-200 rounded-md">
                  <span className="font-bold text-gray-700">{brand}</span>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">News Ticker</h3>
        <div className="bg-red-600 text-white py-1 px-3 rounded-t-md">Breaking News</div>
        <Marquee
          className="h-12 border border-red-200 rounded-b-md bg-white"
          speed="normal"
          direction="left">
          <div className="flex items-center h-full">
            {["Stock market reaches all-time high", "New technological breakthrough announced", "Sports team wins championship", "Weather forecast predicts sunny weekend", "New policy implemented nationwide"].map((news, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center px-4 text-gray-800">
                  <span>{news}</span>
                </div>
                {index < 4 && <div className="h-2 w-2 rounded-full bg-red-500 mx-4"></div>}
              </React.Fragment>
            ))}
          </div>
        </Marquee>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Image Carousel Marquee</h3>
        <Marquee
          className="h-32 border border-gray-200 rounded-md bg-gray-50"
          speed="slow"
          pauseOnHover
          pauseOnFocus>
          <div className="flex items-center space-x-4 h-full py-3">
            {[
              { color: "bg-blue-500", text: "Image 1" },
              { color: "bg-green-500", text: "Image 2" },
              { color: "bg-yellow-500", text: "Image 3" },
              { color: "bg-red-500", text: "Image 4" },
              { color: "bg-purple-500", text: "Image 5" },
              { color: "bg-pink-500", text: "Image 6" },
            ].map((image, index) => (
              <div
                key={index}
                className={`${image.color} w-24 h-24 rounded-md flex items-center justify-center text-white`}>
                <span>{image.text}</span>
              </div>
            ))}
          </div>
        </Marquee>
        <p className="text-sm text-gray-600 mt-2">Hover to pause, click or focus to interact</p>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Custom Speed and Gap</h3>
        <Marquee
          className="h-16 border border-gray-200 rounded-md bg-gray-50"
          duration={40}
          gap={100}>
          <div className="flex items-center space-x-6">
            {["Fast", "Customized", "Speed", "And", "Gap", "Example"].map((item) => (
              <div
                key={item}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md font-bold">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Marquee>
        <p className="text-sm text-gray-600 mt-2">Custom duration of 40 seconds with 100px gaps</p>
      </div>
    </div>
  );
};

export default MarqueeExample;

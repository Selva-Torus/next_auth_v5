
import React, { useContext } from "react";
// import { DarkmodeContext } from "../../context/DarkmodeContext";
 
import { motion } from "framer-motion";
const transition = { duration: 2, yoyo: Infinity, ease: "easeInOut" };
export const MainpageLoader = () => {
  //   const { darkmode } = useContext(DarkmodeContext);
  return (
    <>
      <div
        className={
          "w-[100%] h-[100vh] flex justify-center items-center"
          //  + (darkmode ? " bg-[#1D1D1D]" : " bg-[#E9E8E8]")
        }
      >
        <svg
          width="500"
          height="350"
          viewBox="0 0 3229 2454"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2528 549.606C2753.5 344.106 2914.5 298.106 3223 171.606"
            stroke="#00CE7C"
            strokeWidth="30"
          />
          <path
            d="M2276 347.605C2581.32 253.554 2799.3 232.501 3217 174.605"
            stroke="#00CE7C"
            strokeWidth="30"
          />
          <path
            d="M2269 343.105C2363 392.605 2478.5 466.105 2545 554.105"
            stroke="#00CE7C"
            strokeWidth="25"
          />
          <path
            d="M1058.43 888.433C1441.23 1405.18 1551.26 1814.06 1597.1 2452.61"
            stroke="#00CE7C"
            strokeWidth="30"
          />
          <path
            d="M2112.14 980.236C1766.76 1456.03 1643.19 1864.67 1601.82 2452.61"
            stroke="#00CE7C"
            strokeWidth="30"
          />
          <path
            d="M1686.88 524.754C1884.07 670.434 2045.62 848.678 2112.14 994.359"
            stroke="#00CE7C"
            strokeWidth="30"
          />
          <path
            d="M1058.43 906.087C1242.11 689.568 1360.18 635.835 1710.5 524.754"
            stroke="#00CE7C"
            strokeWidth="30"
          />
          <path
            d="M1053.82 178.321C1632.5 275.106 1935 630.106 2135 948.606"
            stroke="#009BC9"
            strokeWidth="30"
          />
          <path
            d="M1073 178.32L1687.51 178.32"
            stroke="#009BC9"
            strokeWidth="30"
          />
          <path
            d="M2128 935.605C2247.06 752.735 2398.15 631.496 2504 565.605"
            stroke="#009BC9"
            strokeWidth="30"
          />
          <path
            d="M1670 177.105C1997 233.605 2267.37 376.704 2486 564.105"
            stroke="#009BC9"
            stroke-width="30"
          />
          <path
            d="M1025.36 860.186C1205.05 649.7 1346.53 588.604 1689.24 480.618"
            stroke="#3A73CF"
            stroke-width="30"
          />
          <path
            d="M860 175.606C1231.06 226.421 1524.63 357.701 1675 478.606"
            stroke="#3A73CF"
            stroke-width="30"
          />
          <path
            d="M1037.17 861.952C904.865 713.655 607.181 367.631 9.45011 176.964"
            stroke="#3A73CF"
            stroke-width="30"
          />
          <line
            y1="177.853"
            x2="869.427"
            y2="177.853"
            stroke="#3A73CF"
            stroke-width="30"
          />
          <path
            d="M2225 334.105C2472.5 231.105 2663.77 213.815 3014 160.605"
            stroke="#FFD300"
            stroke-width="30"
          />
          <path
            d="M1792.5 169.606L3028.5 161.605"
            stroke="#FFD300"
            stroke-width="25"
          />
          <path
            d="M1833.5 169.105C2003 198.605 2118 234.605 2240 320.105"
            stroke="#FFD300"
            stroke-width="30"
          />
        </svg>
 
        {/* <svg
          width="500"
          height="350"
          viewBox="0 0 3257 2292"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce"
        >
          <path
            d="M1046 740.319C1173 552.321 1436.03 418.899 1647.5 371.819C1660.5 367.319 1678.5 358.319 1694 358.319C1956 500.772 2120 836.819 2120 836.819C2120 836.819 1601 1516.67 1601 2291.82C1510.5 1551.32 1491.5 1421.32 1046 740.319Z"
            fill="#00CE7C"
           
           
          />
 
          <path
            d="M1686.5 335.241C1472 398.242 1142.5 548.82 1043 704.82C1017.49 744.82 1004.08 675.743 907.5 591.32C855 545.428 636 243.818 0 22.8186C532.5 -16.1821 318.38 8.31982 861 8.31982C1475.5 113.82 1620.5 275.32 1686.5 335.241Z"
            fill="#3A73CF"
           
           
          />
 
          <path
            d="M2511 420.318C2311.22 543.318 2270.78 617.819 2125.78 803.819C1944 550.32 1704 170.82 1051.5 7.82003C1327.5 -0.179761 1160.9 9.31767 1679.5 9.31767C1920 43.3178 2276.5 183.816 2511 420.318Z"
            fill="#009BC9"
           
           
          />
 
          <path
            d="M3256.87 20.8184C3256.87 20.8184 2761 176.819 2535 403.319C2505.03 343.319 2388 263.319 2249.5 193.819C2662 38.3188 3256.87 20.8184 3256.87 20.8184Z"
            fill="#00CE7C"
           
           
          />
 
          <path
            d="M3254 12.32C3058 14.8197 2793.5 10.8197 2232.5 187.82C2140.5 95.82 2015 64.3194 1716 9.81935C2132 -1.6806 3074.5 -5.68021 3254 12.32Z"
            fill="#FFD300"
           
           
          />
        </svg> */}
      </div>
    </>
  );
};
 
export const Subloader = () => {
  // useEffect(() => {
  //   const vivus = new Vivus(svgRef.current, {
  //     type: "oneByOne",
  //     duration: 200,
  //     animTimingFunction: Vivus.EASE_OUT, // Ease-out animation
  //     pathTimingFunction: Vivus.EASE_OUT, // Path easing function
  //     start: "manual", // Don't auto-start animation
  //   });
 
  //   const animateSVG = () => {
  //     vivus.play(1); // Play animation forward once
  //   };
 
  //   vivus.el.addEventListener("end", () => {
  //     setTimeout(animateSVG, 1000); // Wait for 1 second before replaying
  //   });
 
  //   animateSVG(); // Start the animation loop
  // }, []);
 
  return (
    <>
      <div
        className={
          "w-[100%] h-[80vh] flex justify-center items-center animate-pulse"
          //  + (darkmode ? " bg-[#1D1D1D]" : " bg-[#E9E8E8]")
        }
      >
        <svg
          width="300"
          height="150"
          viewBox="0 0 3229 2454"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2321.34 528.124C2641.34 381.624 2863.84 315.124 3251.34 297.124"
            stroke="#3A73CF"
            strokeWidth="57"
          />
          <path
            d="M1263.34 1281.12C1263.34 1281.12 1468.97 1011.31 1673.34 906.123"
            stroke="#3A73CF"
            strokeWidth="57"
          />
          <path
            d="M24.3418 286.124C985.927 388.587 1744.39 840.53 2045.34 1281.12"
            stroke="#3A73CF"
            strokeWidth="57"
          />
          <path
            d="M1319.34 292.624C1822.84 308.624 2290.34 473.124 2594.34 656.624"
            stroke="#3A73CF"
            strokeWidth="57"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3247.34 305.11L24.3421 306.154L24.334 281.154L3247.33 280.11L3247.34 305.11Z"
            stroke="#3A73CF"
            strokeWidth="30"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3251.8 309.302C2023.93 777.96 1672.84 1945.8 1672.84 2580.62H1647.84C1647.84 1939.39 2002.09 759.534 3242.88 285.945L3251.8 309.302Z"
            stroke="#3A73CF"
            strokeWidth="30"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.9999 309.345C1286.04 778.304 1647.84 1946.75 1647.84 2581.62H1672.84C1672.84 1939.89 1307.53 759.603 28.6836 285.902L19.9999 309.345Z"
            stroke="#3A73CF"
            strokeWidth="30"
          />
        </svg>
      </div>
    </>
  );
};
 
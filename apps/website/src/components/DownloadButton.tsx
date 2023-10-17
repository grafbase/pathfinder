import * as React from "react";
import { useEffect, useState } from "react";

const DownloadButton = () => {
  const [platform, setPlatform] = useState<"Mac" | "Windows" | "Linux">("Mac");

  useEffect(() => {
    if (navigator.platform.indexOf("Mac") > -1) {
      setPlatform("Mac");
    }

    if (navigator.platform.indexOf("Win") > -1) {
      setPlatform("Windows");
    }

    if (navigator.platform.indexOf("Linux") > -1) {
      setPlatform("Linux");
    }
  }, []);

  return (
    <a
      download
      href="https://github.com/grafbase/pathfinder/releases/download/pathfinder-0.1.5/pathfinder-0.1.5-universal-apple-darwin.dmg"
      className={
        "cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4 rounded-md mt-8 flex items-center gap-2 justify-center transition duration-200" +
        (!platform ? " opacity-0" : " opacity-100") +
        (platform !== "Mac" ? " pointer-events-none" : "")
      }
    >
      {!platform && <div style={{ height: 25, width: 25 }} />}
      {platform === "Mac" && (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8617 12.3181C16.8617 10.796 17.5851 9.68519 18.9894 8.82126C18.1809 7.71048 16.9894 7.13452 15.4149 7.0111C13.883 6.88768 12.2234 7.8339 11.6277 7.8339C10.9894 7.8339 9.54255 7.05224 8.39362 7.05224C6.01064 7.09338 3.5 8.8624 3.5 12.5238C3.5 13.5935 3.67021 14.7043 4.09574 15.8562C4.64894 17.3783 6.60638 21.0809 8.64894 20.9986C9.71277 20.9986 10.4787 20.2581 11.883 20.2581C13.2447 20.2581 13.9255 20.9986 15.117 20.9986C17.2021 20.9986 18.9894 17.6252 19.5 16.103C16.734 14.8277 16.8617 12.4004 16.8617 12.3181Z"
            fill="white"
          />
          <path
            d="M15.4958 1C15.4958 1.41044 15.623 2.52983 14.4783 3.72384C13.6304 4.58204 12.613 5.06711 11.5107 4.99248C11.4259 3.98503 11.8499 3.05221 12.613 2.30595C13.2913 1.63432 14.4783 1.07463 15.4958 1Z"
            fill="white"
          />
        </svg>
      )}
      {platform === "Windows" && (
        <svg
          width="25"
          height="25"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_262_2412)">
            <path
              d="M9.50077 0.40004H0.400024V9.50042H9.50077V0.40004Z"
              fill="white"
            />
            <path
              d="M19.6 0.400047H10.4993V9.50042H19.6V0.400047Z"
              fill="white"
            />
            <path
              d="M9.50077 10.4997H0.400024V19.6H9.50077V10.4997Z"
              fill="white"
            />
            <path d="M19.6 10.4997H10.4993V19.6H19.6V10.4997Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_262_2412">
              <rect
                width="19.2"
                height="19.2"
                fill="black"
                transform="translate(0.400024 0.400002)"
              />
            </clipPath>
          </defs>
        </svg>
      )}
      {platform === "Linux" && (
        <svg
          width="25"
          height="25"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_262_3686)">
            <path
              d="M16.8646 15.6392C16.4246 15.2824 16.5958 14.4944 16.139 14.1056C16.5814 11.4136 15.3414 9.0408 13.863 7.52C12.6222 6.244 13.0222 5.0024 13.0222 3.928C13.0222 2.2112 12.3174 0.400002 10.1822 0.400002C7.8998 0.400002 7.2742 2.304 7.2518 3.3904C7.1974 6 7.77901 6.6784 6.25181 8.5776C4.455 10.812 4.1902 13.0408 4.5958 14.2232C4.4062 14.444 4.1502 14.6888 3.6718 14.8912C2.3502 15.4672 3.319 16.4312 2.9534 17.1152C2.8494 17.3096 2.7998 17.5128 2.7998 17.7072C2.7998 18.3072 3.2766 18.8264 4.143 18.7488C5.3118 18.6448 6.3902 19.4728 7.0878 19.4728C7.7038 19.4728 8.2094 19.1224 8.4446 18.64C9.54621 18.3688 10.9062 18.4032 12.007 18.6872C12.2046 19.24 12.7406 19.6 13.3366 19.6C14.6414 19.6 14.8926 18.1208 16.3894 17.62C16.9286 17.44 17.1998 16.9168 17.1998 16.4296C17.1998 16.1176 17.0886 15.8208 16.8646 15.6392ZM9.54701 7.2672C9.29181 7.2672 9.08061 7.0608 8.74701 6.8128C8.32461 6.4992 7.89501 6.3184 7.89981 5.9888C7.89981 5.7624 8.20301 5.6928 8.59501 5.444C9.01581 5.1776 9.17981 4.9072 9.59421 4.9072C10.0182 4.9072 10.1462 5.1216 10.7222 5.3704C11.2886 5.616 11.683 5.712 11.683 5.9888C11.683 6.2728 11.0902 6.476 10.7566 6.6832C10.2662 6.9856 10.0142 7.2672 9.54701 7.2672ZM10.879 3.0952C11.5846 3.208 11.6638 4.448 11.3262 5.0584L11.0422 4.9424C11.1894 4.508 11.187 3.7928 10.6942 3.7472C10.3814 3.7184 10.1798 4.1312 10.1366 4.4848C10.0142 4.4336 9.88061 4.3968 9.71821 4.3832C9.76781 3.6448 10.2446 2.9936 10.879 3.0952ZM8.15661 3.36C8.69741 3.2256 9.01661 3.8544 9.01901 4.508L8.77101 4.66C8.73741 4.3856 8.61501 3.9424 8.30781 4.0368C7.97901 4.1392 8.03261 4.9032 8.21581 5.06L7.971 5.196C7.635 4.6304 7.63581 3.4896 8.15661 3.36ZM6.4646 18.7544C4.8942 18.04 4.3606 18.2024 4.0606 18.2024C3.439 18.2024 3.2358 17.7392 3.4694 17.3008C3.6678 16.9288 3.6062 16.5392 3.5574 16.2264C3.4822 15.7472 3.4686 15.5912 3.9398 15.3848C4.5918 15.108 4.88141 14.752 5.09741 14.4856C5.70381 13.736 6.31581 14.9152 6.81741 15.9656C7.14301 16.6464 7.78381 16.9912 7.98141 17.7456C8.16301 18.4424 7.4134 19.1864 6.4646 18.7544ZM12.0542 17.2552C10.947 17.7936 9.53661 18.0408 8.48141 17.4944C8.32541 17.044 8.07581 16.7528 7.807 16.46C8.23821 16.3464 8.55821 15.8088 8.17501 15.2688C7.76621 14.692 6.93101 14.2896 6.08701 13.6368C5.29741 13.0264 5.0478 11.5216 6.123 9.84C5.599 11.3296 5.9054 12.7024 6.1686 13.0952C6.223 12.3048 6.2854 10.9848 7.3654 9.4032C7.9102 8.6048 7.91821 7.5504 7.93021 6.8912L8.42621 7.2304C8.79101 7.5 9.09661 7.7968 9.53501 7.7968C10.183 7.7968 10.5414 7.424 11.0406 7.1144C11.2358 6.9944 11.531 6.8728 11.779 6.704C12.195 8.6848 13.9182 11.0672 14.015 12.424C14.4158 11.5984 13.9014 9.6128 13.9014 9.6128C14.575 10.6408 14.6286 11.4976 14.6582 12.5488C15.1294 12.7416 15.635 13.244 15.6814 13.9056L15.4854 13.8832C15.3846 13.148 13.3998 12.068 13.2214 13.452C12.2694 13.5968 12.6158 15.1048 12.4238 16.0824C12.3358 16.5296 12.1726 16.8832 12.0542 17.2552ZM15.931 17.2224C15.143 17.5264 14.611 18.172 14.2454 18.5728C13.5414 19.3456 12.6102 18.9752 12.511 18.252C12.4062 17.4792 12.799 17.0576 12.9686 16.1928C13.123 15.4032 12.9502 14.188 13.3134 14.0584C13.5494 15.4608 14.9662 14.8712 15.2894 14.4888C15.815 14.4888 15.859 14.6664 15.9766 15.1584C16.0502 15.4664 16.1518 15.7256 16.439 16.0304C16.7734 16.388 16.671 16.9368 15.931 17.2224ZM9.531 6.8176C9.0102 6.8176 8.62061 6.4712 8.30381 6.2024C8.14141 6.0656 8.34381 5.8128 8.50621 5.9504C8.81581 6.2128 9.1278 6.4904 9.531 6.4904C10.0166 6.4904 10.4446 6.0752 11.0246 5.8464C11.2222 5.7688 11.335 6.0744 11.139 6.152C10.5758 6.3736 10.1238 6.8176 9.531 6.8176Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_262_3686">
              <rect
                width="19.2"
                height="19.2"
                fill="black"
                transform="translate(0.399902 0.400002)"
              />
            </clipPath>
          </defs>
        </svg>
      )}
      <span className="text-white font-medium text-lg">
        {platform === "Mac" ? `Download Beta for ${platform}` : "Coming Soon"}
      </span>
    </a>
  );
};

export default DownloadButton;

//* Libraries imports
import { SVGProps } from "react";

//* Local imports
import { getRandomCardList } from "./utils";
export default function BackgroundArt(props: SVGProps<SVGSVGElement>) {
  const cardList = getRandomCardList(7);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
      viewBox="0 0 2560 1080"
      {...props}
    >
      <path d="M0 0h2560v1080H0z" />
      <g
        style={{
          filter: "url(#a)",
        }}
      >
        <ellipse
          cx={1280}
          cy={606.689}
          rx={233.097}
          ry={232.907}
          style={{
            fill: "#e04307",
          }}
        />
      </g>
      <g
        style={{
          filter: "url(#b)",
        }}
      >
        <ellipse
          cx={1280}
          cy={473.311}
          rx={235.982}
          ry={232.907}
          style={{
            fill: "#b15804",
          }}
        />
      </g>
      <circle
        cx={1280}
        cy={540}
        r={316.784}
        style={{
          fill: "#0e0e0e",
        }}
      />
      <circle
        cx={1280}
        cy={540}
        r={299.595}
        style={{
          fill: "#0e0e0e",
        }}
      />
      <clipPath id="c">
        <circle cx={1280} cy={540} r={299.595} />
      </clipPath>
      <g clipPath="url(#c)">
        <use
          xlinkHref="#d"
          width={1000}
          height={1000}
          transform="translate(938.634 198.634) scale(.68273)"
        />
      </g>
      <use
        xlinkHref="#e"
        width={421}
        height={614}
        transform="matrix(.31315 -.18048 .2517 .2721 1346.32 773.886)"
      />
      <use
        xlinkHref="#f"
        width={421}
        height={614}
        transform="matrix(-.10336 -.29047 .31984 -.16982 734.651 704.973)"
      />
      <use
        xlinkHref="#g"
        width={421}
        height={614}
        transform="matrix(.23823 .04553 -.0416 .1017 1209.4 577.838)"
      />
      <use
        xlinkHref="#h"
        width={421}
        height={614}
        transform="matrix(.2788 -.04051 -.00133 .28487 1093.73 167.602)"
      />
      <use
        xlinkHref="#i"
        width={421}
        height={614}
        transform="matrix(-.13147 .28049 -.38655 -.09766 1810.15 473.609)"
      />
      <use
        xlinkHref="#j"
        width={421}
        height={614}
        transform="matrix(.32772 .09748 -.325 .25373 805.128 183.66)"
      />
      <use
        xlinkHref="#k"
        width={421}
        height={614}
        transform="matrix(.34725 .17742 -.21648 .3273 958.726 690.298)"
      />
      <defs>
        <image id="d" width={1000} height={1000} href="/card_bg.png" />
        <image id="e" width={421} height={614} href={cardList[0]} />
        <image id="f" width={421} height={614} href={cardList[1]} />
        <image id="g" width={421} height={614} href={cardList[2]} />
        <image id="h" width={421} height={614} href={cardList[3]} />
        <image id="i" width={421} height={614} href={cardList[4]} />
        <image id="j" width={421} height={614} href={cardList[5]} />
        <image id="k" width={421} height={614} href={cardList[6]} />
        <filter
          id="a"
          width={3466.19}
          height={3465.81}
          x={-453.097}
          y={-1126.22}
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={250} />
        </filter>
        <filter
          id="b"
          width={3471.96}
          height={3465.81}
          x={-455.982}
          y={-1259.6}
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={250} />
        </filter>
      </defs>
    </svg>
  )
}
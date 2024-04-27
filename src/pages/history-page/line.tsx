import { useEffect, useRef, useState } from "react";

function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function HistoryLine() {
    const [current, setCurrent] = useState<number>(0);
    const [target, setTarget] = useState<number>(0);
    const refDiv = useRef<SVGSVGElement>(null);

    // Function to set the target value based on mouse scroll position relative to a reference div
    function setTargetValue(event: Event) {
        if (refDiv.current) {
            const divPosition = refDiv.current.getBoundingClientRect().top * -1;
            if (divPosition < 0) {
                setCurrent(0);
                return;
            }
            const height = refDiv.current.getBoundingClientRect().height;
            const target = (divPosition / height) * 1.4;
            setCurrent(target);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", setTargetValue);
        return () => {
            window.removeEventListener("scroll", setTargetValue);
        };
    }, []);
    return (
        <>
            <svg
                ref={refDiv}
                width="1160"
                height="2480"
                viewBox="0 0 1160 2480"
                fill="none"
                className=""
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1.00003 0.5C1.00003 78.8276 1.00003 417.212 1.00003 591.5C1.00003 597.001 1.65021 598.514 6 603C10.4857 607.626 17.5 607.5 17.5 607.5H1137.5C1154.31 606.906 1159.47 610.661 1159.5 626V1514C1159.58 1529.93 1155.28 1534.91 1138.5 1535.5H29C5.59047 1535.88 -0.34821 1542.33 1.00003 1564.5V2479.5"
                    stroke="white"
                    strokeWidth={3}
                    strokeOpacity="0.15"
                />
                <path
                    d="M1.00003 0.5C1.00003 78.8276 1.00003 417.212 1.00003 591.5C1.00003 597.001 1.65021 598.514 6 603C10.4857 607.626 17.5 607.5 17.5 607.5H1137.5C1154.31 606.906 1159.47 610.661 1159.5 626V1514C1159.58 1529.93 1155.28 1534.91 1138.5 1535.5H29C5.59047 1535.88 -0.34821 1542.33 1.00003 1564.5V2479.5"
                    stroke="#3869ff"
                    strokeOpacity={1}
                    strokeLinecap="round"
                    strokeWidth={3}
                    pathLength={1}
                    strokeDashoffset={"0px"}
                    strokeDasharray={`${current}px 1px`}
                />
            </svg>
        </>
    );
}

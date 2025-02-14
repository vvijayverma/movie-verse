import React, { memo, useCallback, useMemo } from "react";

interface SectionProps {
    title: string;
    obj: any;
    selectedKey: string;
    setCategories: (key: string) => void;
}

const Section: React.FC<SectionProps> = ({ title, obj, selectedKey, setCategories }) => {

    const keys = useMemo(() => Object.keys(obj), [obj]);

    const selectKey = useCallback(
        (key: string) => {
            setCategories(key);
        },
        [setCategories]
    );

    return (
        <div className="flex gap-12 items-center pt-6">
            <h1 className="font-bold text-xl">{title}</h1>
            <div className="flex border border-black rounded-full font-bold">
                {keys.map((key) => (
                    <p
                        key={key}
                        onClick={() => selectKey(key)}
                        className={`py-1 px-4 rounded-full cursor-pointer ${selectedKey === key ? "bg-blue-950 text-green-400" : ""}`}
                    >
                        {obj[key]}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default memo(Section);

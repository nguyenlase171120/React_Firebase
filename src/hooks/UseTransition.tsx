import axios from 'axios';
import { useTransition, useState, useDeferredValue, ReactNode } from 'react';
import { IPhotos } from '../types';
const UseTransition = () => {
    const [listTest, setListTest] = useState<IPhotos[]>([]);
    const [text, setText] = useState('');
    const defer = useDeferredValue(listTest);
    const [isPending, startTransition] = useTransition();

    const handleTransition = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setText(e.target.value);

        startTransition(() => {
            axios
                .get('https://jsonplaceholder.typicode.com/posts')
                .then(result => {
                    setListTest(result.data);
                });
        });
    };

    const handleDeferredValue = () => {};

    return (
        <div className="flex_center_column   gap-3 mt-2">
            <input
                type="search"
                placeholder="search"
                className="p-2 border "
                onChange={handleTransition}
            />
            {/* <button
                onClick={handleClick}
                className="bg-black text-white font-semibold text-lg p-2 rounded-md"
            >
                Search
            </button> */}

            <p>text: {text}</p>
            {isPending ? (
                <p>Loading....</p>
            ) : (
                listTest.map((item, index) => {
                    return <div key={index}>{item.title}</div>;
                })
            )}

            {/* <div>
                <p>use deferredValue</p>
                <p>{defer}</p>
            </div> */}
        </div>
    );
};

export default UseTransition;

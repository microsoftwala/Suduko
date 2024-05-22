import React, { useEffect, useState } from "react";

const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Sorting = () => {
  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < 150; i++) {
      array.push(randomNumber(5, 600));
    }
    setArr(array);
  }, []);

  const bubbleSort = async (arr) => {
    let n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArr([...arr]);
          swapped = true;
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }
      if (!swapped) {
        break;
      }
    }

    setIsSorting(false);
  };

  const merge = async (left, right) => {
    let sortedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        sortedArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        sortedArray.push(right[rightIndex]);
        rightIndex++;
      }
      setArr([
        ...sortedArray,
        ...left.slice(leftIndex),
        ...right.slice(rightIndex),
      ]);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    return sortedArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  };

  const mergesort = async (array) => {
    if (array.length <= 1) {
      return array;
    }

    const middleIndex = Math.floor(array.length / 2);
    const leftArray = array.slice(0, middleIndex);
    const rightArray = array.slice(middleIndex);

    return await merge(await mergesort(leftArray), await mergesort(rightArray));
  };

  return (
    <div className="m-4 mb-10">
      <div className="pl-6 pr-6 pt-2 pb-2 bg-blue-400 rounded-xl text-slate-100 md:text-2xl text-xl font-serif mb-2 font-semibold mt-6">
        Sorting Algorithm visualizer
      </div>
      <div className="flex justify-between items-end m-8">
        {arr.map((value, index) => (
          <div
            className="bg-red-200"
            key={index}
            style={{ width: "2.5px", height: `${value}px` }}
          ></div>
        ))}
      </div>
      <div className="flex md:flex-row flex-col justify-evenly">
        <button
          onClick={() => bubbleSort(arr)}
          className="p-2 bg-red-500 hover:bg-red-600 rounded-xl text-slate-100 md:text-2xl font-serif mb-2 font-semibold mt-6"
        >
          BubbleSort
        </button>
        <button
          onClick={() => mergesort(arr)}
          className="p-2 bg-red-500 hover:bg-red-600 rounded-xl text-slate-100 md:text-2xl font-serif mb-2 font-semibold mt-6"
        >
          Merge Sort
        </button>
      </div>
    </div>
  );
};

export default Sorting;

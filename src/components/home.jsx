import React from "react";

const home = () => {
  return (
    <div>
    <div className="md:text-2xl font-bold font-serif">Welcome To DSA Algorithm visualizer</div>
      <div className="flex justify-evenly items-center md:flex-row flex-col bg-slate-300 p-8 h-screen">
        <a
          href="/sudoko"
          className="pl-6 pr-6 pt-2 pb-2 bg-green-500 hover:bg-green-600 rounded-xl text-slate-100 md:text-2xl text-xl font-serif mb-2 font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Sudoku
        </a>
        <a
          href="/sort"
          className="pl-6 pr-6 pt-2 pb-2 bg-green-500 hover:bg-green-600 rounded-xl text-slate-100 md:text-2xl text-xl font-serif mb-2 font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Sorting Algo Visualizer
        </a>
      </div>
    </div>
  );
};

export default home;

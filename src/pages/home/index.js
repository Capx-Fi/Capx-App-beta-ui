import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../store/slices/counterSlice";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Home = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className="text-3xl font-bold underline">{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Button
        </button>

        <button class="btn btn-blue">Button</button>
      </div>
    </div>
  );
};

export default Home;

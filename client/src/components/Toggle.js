import React, { useState } from "react";

export const Toggle = ({ check, onUpdate }) => {
  const [checked, setChecked] = useState(check);

  return (
    <div class="flex flex-col">
      {!checked ? (
        <div>
          <label
            for="unchecked"
            class="mt-3 inline-flex items-center cursor-pointer transition ease-in-out duration-500"
          >
            <span class="relative">
              <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
              <span
                class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
                onClick={() => {
                  setChecked(!checked);
                  onUpdate(checked);
                }}
              >
                <input
                  id="unchecked"
                  type="checkbox"
                  class="absolute opacity-0 w-0 h-0"
                />
              </span>
            </span>
            <span class="ml-3 text-sm text-white">Stockfish 11 eval off</span>
          </label>
        </div>
      ) : (
        <div>
          <label
            for="checked"
            class="mt-3 inline-flex items-center cursor-pointer transition ease-in-out duration-500"
          >
            <span class="relative">
              <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
              <span
                class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-scheme-orange transform translate-x-full"
                onClick={() => {
                  setChecked(!checked);
                  onUpdate(checked);
                }}
              >
                <input
                  id="checked"
                  type="checkbox"
                  class="absolute opacity-0 w-0 h-0"
                />
              </span>
            </span>
            <span class="ml-3 text-sm text-scheme-orange">
              Stockfish 11 eval on
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

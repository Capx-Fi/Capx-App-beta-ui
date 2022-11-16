import React from "react";
import {
  ContainedDollerSvg,
  DummyProfile,
  LevelSvg,
} from "../../../assets/svg";

const headings = [
  { heading: "User" },
  { heading: "Earnings" },
  { heading: "Quests Completed" },
  { heading: "Level" },
];

const ContributersTable = () => {
  return (
    <div class="flex flex-col mb-4">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="bg-white border-b">
                <tr className="">
                  {headings.map((heading) => {
                    return (
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left text-center fs-14 font-semibold"
                      >
                        {heading.heading}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill("")
                  .map((el) => {
                    return (
                      <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td class="px-6 py-4 whitespace-nowrap text-gray-900 text-center fs-18 font-semibold">
                          <tr>
                            <td className="px-2">
                              <img src={DummyProfile} alt="dummy" />
                            </td>
                            <td className="px-2">@sherlockholmes</td>
                          </tr>
                        </td>
                        <td class="text-sm text-gray-900  px-6 py-4 whitespace-nowrap text-center fs-18 font-semibold">
                          <div className="flex justify-center items-center">
                            <img
                              src={ContainedDollerSvg}
                              alt="doller"
                              className="mr-1"
                            />
                            <span>100 xCapx</span>
                          </div>
                        </td>
                        <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap text-center fs-18 font-semibold">
                          10 Quests
                        </td>
                        <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap text-center fs-18 font-semibold">
                          <div className="flex justify-center items-center">
                            <img src={LevelSvg} alt="doller" className="mr-1" />
                            <span>Level 1</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributersTable;

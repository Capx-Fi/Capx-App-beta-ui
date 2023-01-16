import React from "react";

const Skeleton = () => {
  return (
    <div className="quest-table quest-table-skeleton animate-pulse">
      <div className="table-wrapper">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-heading text-start">Date</th>
              <th className="table-heading text-start">Quest Details</th>
              <th className="table-heading">Total Earnings</th>
            </tr>
          </thead>
          <tbody>
            {Array(7)
              .fill("")
              .map((details, ind) => {
                return (
                  <tr>
                    <td className="table-data ">
                      <div className="flex">
                        <div className="date skeleton-bg rounded" />
                      </div>
                    </td>
                    <td className="table-data">
                      <div className="flex">
                        <div className="datail skeleton-bg rounded" />
                      </div>
                    </td>
                    <td className="table-data ">
                      <div className="flex justify-center">
                        <div className="earned skeleton-bg rounded" />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Skeleton;

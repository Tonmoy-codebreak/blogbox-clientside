import React, { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link, useOutletContext } from "react-router";
import useAxios from "../hooks/useAxios";
import { FaChevronDown, FaChevronUp, FaEye } from "react-icons/fa";

const columnHelper = createColumnHelper();

const FeaturedBlogs = () => {
  const axiosSecure = useAxios();
  const { isDark } = useOutletContext(); // ✅ Dark mode flag
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosSecure.get("/featuredblogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching featured blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [axiosSecure]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("image", {
        header: "Image",
        enableSorting: false,
        cell: ({ getValue }) => (
          <img
            src={getValue()}
            alt="Blog"
            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg"
          />
        ),
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: "Author",
        cell: (info) => info.getValue(),
        meta: { className: "hidden sm:table-cell" },
      }),
      columnHelper.accessor("_id", {
        header: "Details",
        enableSorting: false,
        cell: ({ getValue }) => (
          <Link
            to={`/blog/${getValue()}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-lg"
            title="View Blog"
          >
            <FaEye />
          </Link>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: blogs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-main">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700 ">
        Featured Blogs
      </h1>

      {loading ? (
        <div className="text-center py-20">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className={`overflow-x-auto shadow rounded-2xl border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={`${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold select-none ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } ${
                        header.column.columnDef.enableSorting === false
                          ? "cursor-default"
                          : "cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <FaChevronUp className="text-xs" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <FaChevronDown className="text-xs" />
                        ) : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`transition duration-200 ease-in-out ${
                    isDark ? "hover:bg-gray-800" : "hover:bg-blue-50"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-4 sm:px-6 py-3 text-xs sm:text-sm ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      } ${cell.column.id === "_id" ? "text-center" : ""} ${
                        cell.column.columnDef.meta?.className || ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeaturedBlogs;

const Loader = () => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 p-4 bg-white shadow-xl rounded-lg animate-pulse">
      <div className="w-80 h-[450px] bg-gray-200 rounded"></div>
      <div className="flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-2/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>

          <div className="mt-6 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="flex gap-3">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gray-300"
                  ></div>
                ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="flex gap-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-16 h-10 rounded bg-gray-300"></div>
                ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded bg-gray-300"></div>
              <div className="w-14 h-10 rounded bg-gray-300"></div>
              <div className="w-10 h-10 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>

        <div className="mt-6 h-12 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default Loader;

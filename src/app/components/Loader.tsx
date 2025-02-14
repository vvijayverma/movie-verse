const FullScreenLoader = () => {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
      </div>
    );
  };
  
  export default FullScreenLoader;
  
  
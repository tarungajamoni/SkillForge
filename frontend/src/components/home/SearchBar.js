const SearchBar = ({ onSearch }) => {
  return (
    <div className="w-4/5 md:w-2/3 lg:w-1/2">
      <h1 className="text-4xl font-bold text-green-900 mb-4 text-center">
        Find Your Roadmap
      </h1>
      <input
        type="text"
        placeholder="Search Course"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full border border-gray-400 shadow-md rounded-full h-12 px-6 text-lg focus:outline-none focus:ring-4 focus:ring-green-400 bg-white transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;

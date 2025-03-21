const CategoryFilter = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className="w-full max-w-5xl text-center my-6">
      <h2 className="text-3xl font-bold text-green-900 mb-4">Top Categories</h2>

      {/* Category List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category}
            className={`p-4 rounded-lg shadow-md cursor-pointer transition text-green-900 ${
              activeCategory === category
                ? "bg-green-600 text-white"
                : "bg-green-200 hover:bg-green-300"
            }`}
            onClick={() => onCategorySelect(category)}>
            {category}
          </div>
        ))}

        {activeCategory && (
          <div
            className="underline cursor-pointer transition text-green-900 flex items-center justify-center"
            onClick={() => onCategorySelect("")}>
            Clear Filter
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;

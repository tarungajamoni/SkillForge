const RunOperator = ({ title, type, formData, setFormData, onSubmit }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-3">
        {title} {type}
      </h2>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
        className="w-full p-2 border rounded-md mb-2"
      />
      <textarea
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
        className="w-full p-2 border rounded-md mb-2"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md">
        {title} {type}
      </button>
    </div>
  );
};

export default RunOperator;

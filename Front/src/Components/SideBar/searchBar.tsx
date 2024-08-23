const SearchBar = () => {
  return (
      <div className="bg-zinc-700 w-full h-10 flex items-center rounded-full p-4">
          <input type="text"
                 className="w-full bg-transparent border-none outline-none text-sm text-white"
                 placeholder="Search ..."
          />

      </div>
  );
};

export default SearchBar;
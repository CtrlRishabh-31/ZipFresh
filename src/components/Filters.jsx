export default function Filters({
    searchTerm,
    onSearchChange,
    categories,
    selectedCategory,
    onCategoryChange
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 sticky top-20 z-30 bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md">
            <div className="relative w-full md:w-1/3">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${selectedCategory === cat
                                ? 'bg-yellow-400 text-black'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}

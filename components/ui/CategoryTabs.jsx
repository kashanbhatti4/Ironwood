export default function CategoryTabs({ categories, activeCategory, onSelect }) {
    return (
        <div className="flex flex-wrap gap-4">
            <button
                onClick={() => onSelect('All')}
                className={`px-4 py-2 text-sm transition-colors ${activeCategory === 'All'
                    ? 'text-black border-b border-black'
                    : 'text-gray-500 hover:text-black'
                    }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category.handle || category}
                    onClick={() => onSelect(category.handle || category)}
                    className={`px-4 py-2 text-sm transition-colors ${activeCategory === (category.handle || category)
                        ? 'text-black border-b border-black'
                        : 'text-gray-500 hover:text-black'
                        }`}
                >
                    {category.title || category}
                </button>
            ))}
        </div>
    );
}

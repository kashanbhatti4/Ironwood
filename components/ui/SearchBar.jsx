export default function SearchBar({ placeholder = 'Search...', onChange }) {
    return (
        <div className="w-full max-w-sm">
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
            />
        </div>
    );
}

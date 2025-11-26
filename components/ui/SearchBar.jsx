'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({ placeholder = 'Search...', defaultValue }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`/blog?${params.toString()}`);
    }, 300);

    return (
        <div className="w-full max-w-sm mx-auto">
            <input
                type="text"
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
            />
        </div>
    );
}

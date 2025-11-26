export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-100 py-12 mt-auto">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Ironwood Atelier. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

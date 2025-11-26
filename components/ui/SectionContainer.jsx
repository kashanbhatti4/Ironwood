export default function SectionContainer({ children, className = '' }) {
    return (
        <div className={`w-full max-w-[1200px] mx-auto px-6 py-12 ${className}`}>
            {children}
        </div>
    );
}

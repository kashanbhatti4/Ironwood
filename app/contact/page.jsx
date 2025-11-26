import SectionContainer from '@/components/ui/SectionContainer';

export default function ContactPage() {
    return (
        <SectionContainer>
            <div className="max-w-2xl mx-auto text-center space-y-12">
                <div className="space-y-4">
                    <h1 className="text-3xl font-light tracking-tight text-gray-900">Contact Us</h1>
                    <p className="text-gray-600 font-light">
                        We’d love to hear from you. Schedule a time to chat or send us a message.
                    </p>
                </div>

                <div className="w-full aspect-[4/3] bg-gray-50 border border-gray-100 flex items-center justify-center rounded-sm">
                    <p className="text-gray-400 text-sm">Calendly will be embedded here.</p>
                </div>
            </div>
        </SectionContainer>
    );
}

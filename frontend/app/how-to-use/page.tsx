import Link from 'next/link'
import { ArrowLeft, User, MessageCircle, Settings } from 'lucide-react'

export default function HowToUsePage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
                </Link>

                <h1 className="text-4xl md:text-6xl font-light bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
                    How to Use Instagen
                </h1>

                <p className="text-xl text-neutral-400 mb-12 max-w-2xl">
                    Create realistic looking Instagram profiles and comments for your creative projects, mockups, or just for fun.
                </p>

                <div className="space-y-12">
                    {/* Step 1 */}
                    <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0">
                            <span className="text-xl font-bold">1</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-sans mb-3 flex items-center gap-2">
                                Choose a Tool
                            </h3>
                            <p className="text-neutral-400 leading-relaxed mb-4">
                                Select between the <strong>Profile Generator</strong> or <strong>Comment Generator</strong> from the home page.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/create-profile" className="flex items-center gap-2 text-black bg-gradient-to-r from-white to-neutral-400 border border-white/10 px-4 py-2 rounded-lg hover:bg-neutral-800 transition">
                                    <User className="w-4 h-4 text-black" /> Profile Generator
                                </Link>
                                <Link href="/create-comment" className="flex items-center gap-2 bg-neutral-900 border border-white/10 px-4 py-2 rounded-lg hover:bg-neutral-800 transition">
                                    <MessageCircle className="w-4 h-4 text-orange-200" /> Comment Generator
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0">
                            <span className="text-xl font-bold">2</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-sans mb-3 flex items-center gap-2">
                                Customize Details
                            </h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Use the control panel on the left to edit every detail. Change usernames, upload profile pictures, update bio text, and even tweak the status bar (WiFi, Signal, Battery). The preview updates immediately!
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0">
                            <span className="text-xl font-bold">3</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-sans mb-3 flex items-center gap-2">
                                Download Image
                            </h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Once you're happy with your design, click the <strong>Download Image</strong> button. The tool will generate a high-quality PNG of your creation that you can save to your device.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

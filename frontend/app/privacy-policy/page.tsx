import Link from 'next/link'
import { ArrowLeft, Shield, EyeOff } from 'lucide-react'

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
                </Link>

                <h1 className="text-4xl md:text-6xl font-light bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-8">
                    Privacy Policy
                </h1>

                <div className="space-y-8 text-neutral-300 leading-relaxed">
                    <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-white rounded-xl mt-1">
                                <EyeOff className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h2 className="text-xl font-sans text-white mb-2">No Data Collection</h2>
                                <p>
                                    Instagen is a client-side application. We do not collect, store, or process any of the data you enter. All generation happens directly in your browser's memory.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-white rounded-xl mt-1">
                                <Shield className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h2 className="text-xl font-sans text-white mb-2">Image Processing</h2>
                                <p>
                                    When you upload a profile picture or generate a download, everything stays on your device. Your images are never uploaded to our servers.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
                        <h2 className="text-xl font-sans text-white mb-4">Usage Terms</h2>
                        <p className="mb-4">
                            This tool is intended for educational, creative, and mockup purposes only.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                            <li>Do not use this tool to impersonate others with malicious intent.</li>
                            <li>Do not generate content that violates Instagram's terms of service or community guidelines.</li>
                            <li>The generated images are not affiliated with or endorsed by Instagram or Meta.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

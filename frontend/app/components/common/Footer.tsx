import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full py-8 border-t border-white/10 bg-black text-neutral-400 mt-auto">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm">
                    © {new Date().getFullYear()} Instagen. All rights reserved.
                </div>
                <div className="flex gap-0.5"><p>Made with 💛</p> <a href="https://github.com/fit-edoc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-200 transition-colors">  by fit-edoc</a></div>
                <div className="flex gap-6 text-sm font-medium">
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/how-to-use" className="hover:text-white transition-colors">
                        How to Use
                    </Link>
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    )
}

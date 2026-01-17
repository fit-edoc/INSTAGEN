'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, ChevronDown, Grid, Menu, UserPlus, Heart, Wifi, Signal } from 'lucide-react'
import { toPng } from 'html-to-image'

export default function CreateProfilePage() {
    const previewRef = useRef<HTMLDivElement>(null)

    // State for profile data
    const [profileData, setProfileData] = useState({
        username: 'instagram_user',
        name: 'Instagram User',
        bio: 'Digital Creator\nLiving life one pixel at a time 📸\n📍 Earth',
        link: 'linktr.ee/user',
        postsCount: '0',
        followersCount: '10K',
        followingCount: '50',
        isVerified: true,
        profileImage: '', // URL or base64
        viewAs: 'self' as 'self' | 'visitor', // 'self' (Edit Profile) or 'visitor' (Follow/Message)
        showWifi: true,
        showSignal: true,
        batteryLevel: 100
    })


    const currentTime: string = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setProfileData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileData(prev => ({ ...prev, profileImage: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDownload = async () => {
        if (!previewRef.current) return

        try {
            const dataUrl = await toPng(previewRef.current, { cacheBust: true, })

            const link = document.createElement('a')
            link.download = `${profileData.username}_profile.png`
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error('Error downloading profile:', error)
            alert('Failed to download image. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-x-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
                </Link>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Controls Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-400 mb-6">
                                Profile Details
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-1">Username</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="username"
                                            value={profileData.username}
                                            onChange={handleInputChange}
                                            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                                        />
                                        <button
                                            onClick={() => setProfileData(prev => ({ ...prev, isVerified: !prev.isVerified }))}
                                            className={`px-4 py-2 rounded-xl border transition-colors flex items-center gap-2 ${profileData.isVerified ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}`}
                                        >
                                            Verified {profileData.isVerified && <Check className="w-3 h-3" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">View Mode</label>
                                        <select
                                            name="viewAs"
                                            value={profileData.viewAs}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                                        >
                                            <option value="self">Edit Profile (Owner)</option>
                                            <option value="visitor">Follow (Public)</option>
                                              <option value="friend">Following</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Profile Picture</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-1">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white h-24 resize-none"
                                    />
                                </div>

                                <div>
                                    <div className="flex">


                                    </div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-1">Link</label>
                                    <input
                                        type="text"
                                        name="link"
                                        value={profileData.link}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white/90"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Posts</label>
                                        <input
                                            type="text"
                                            name="postsCount"
                                            value={profileData.postsCount}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Followers</label>
                                        <input
                                            type="text"
                                            name="followersCount"
                                            value={profileData.followersCount}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Following</label>
                                        <input
                                            type="text"
                                            name="followingCount"
                                            value={profileData.followingCount}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-6 mt-6">
                                <h3 className="text-lg font-medium text-neutral-300 mb-4">Status Bar</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={profileData.showSignal}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, showSignal: e.target.checked }))}
                                                className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-neutral-800"
                                            />
                                            <span className="text-neutral-400 text-sm">Personal Network</span>
                                        </label>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={profileData.showWifi}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, showWifi: e.target.checked }))}
                                                className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-neutral-800"
                                            />
                                            <span className="text-neutral-400 text-sm">WiFi</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Battery %</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={profileData.batteryLevel}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, batteryLevel: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) }))}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="w-full mt-6 bg-gradient-to-r from-orange-400 to-pink-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                Download Image
                            </button>
                        </div>
                    </div>

                    {/* Preview Section - The Phone UI */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div
                            ref={previewRef}
                            className="w-[375px] h-fit min-h-[667px] bg-black text-white border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative font-sans"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
                        >
                            {/* Status Bar (Simulated) */}
                            <div className="flex justify-between items-center px-6 pt-3 pb-1 text-xs font-semibold">
                                <span>{currentTime}</span>
                                <div className="flex gap-1.5 items-center">
                                    {profileData.showSignal && <Signal className="w-4 h-4 text-white" />}
                                    {profileData.showWifi && <Wifi className="w-4 h-4 text-white" />}
                                    <div className="w-6 h-3 border border-white/30 rounded-sm relative ml-1"> {/* Battery Container */}
                                        <div
                                            className={`absolute top-px left-px bottom-px rounded-[1px] ${profileData.batteryLevel > 90 ? 'bg-green-500' :
                                                profileData.batteryLevel < 20 ? 'bg-red-500' : 'bg-white'
                                                }`}
                                            style={{ width: `${Math.max(5, profileData.batteryLevel - 4)}%` }} // -4 to account for padding
                                        />
                                        <div className="absolute top-1 -right-0.5 w-[2px] h-1 bg-white/50 rounded-r-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Header */}
                            <div className="px-4 py-2 flex items-center justify-between border-b border-neutral-900">
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-lg">{profileData.username}</span>
                                    {profileData.isVerified && (
                                        <div className="relative w-3.5 h-3.5  rounded-full flex items-center justify-center">
                                            <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>
                                        </div>
                                    )}
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </div>
                                <div className="flex gap-5">
                                    <UserPlus className="w-6 h-6" strokeWidth={1.5} />
                                    <Menu className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="px-4 py-4">
                                {/* Profile Head */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                                            <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-neutral-800">
                                                {profileData.profileImage ? (
                                                    <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-neutral-500">
                                                        <span className="text-2xl font-bold">{profileData.name.charAt(0)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                       {profileData.viewAs === "visitor" ? (
                                           null
                                        ) :  <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center text-white text-[10px]">
                                                +
                                            </div>}
                                    </div>


                                     <div className="flex-1 flex flex-col"> 

                                        <div className=""> <div className="font-medium ml-10 py-1.5">{profileData.name}</div></div>
                                        <div className="flex-1">
                                             <div className="flex-1 flex justify-around ml-4">
                                        <div className="flex flex-col items-center">
                                            <span className="font-medium text-lg leading-tight">{profileData.postsCount}</span>
                                            <span className="text-sm">posts</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-medium text-lg leading-tight">{profileData.followersCount}</span>
                                            <span className="text-sm">followers</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-medium text-lg leading-tight">{profileData.followingCount}</span>
                                            <span className="text-sm">following</span>
                                        </div>
                                    </div>
                                        </div>
                                     </div>
                                   
                                </div>

                                {/* Bio Info */}
                                <div className="mb-4">
                                   
                                    <div className="text-sm whitespace-pre-wrap leading-tight">{profileData.bio}</div>
                                    {profileData.link && (
                                        <div className="text-blue-100/90 text-sm mt-1 font-medium flex items-center gap-1">
                                            🔗 {profileData.link}
                                        </div>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 mb-6">
                                    {profileData.viewAs === 'visitor' ? (
                                        <>
                                            <button className="flex-1 bg-blue-500 text-white font-semibold py-1.5 rounded-lg text-sm">
                                                Follow
                                            </button>
                                            <button className="flex-1 bg-neutral-800 text-white font-semibold py-1.5 rounded-lg text-sm">
                                                Message
                                            </button>
                                            <button className="bg-neutral-800 text-white p-1.5 rounded-lg">
                                                <UserPlus className="w-5 h-5" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="flex-1 bg-neutral-800 text-white font-semibold py-1.5 rounded-lg text-sm">
                                                Edit profile
                                            </button>
                                            <button className="flex-1 bg-neutral-800 text-white font-semibold py-1.5 rounded-lg text-sm">
                                                Share profile
                                            </button>
                                            <button className="bg-neutral-800 text-white p-1.5 rounded-lg">
                                                <UserPlus className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Highlights */}
                                <div className="flex gap-4 overflow-x-visible pb-4 mb-2 scrollbar-none">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex flex-col items-center gap-1 min-w-[64px]">
                                            <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                                <Heart className="w-6 h-6 text-neutral-500" />
                                            </div>
                                            <span className="text-xs">Highlight</span>
                                        </div>
                                    ))}
                                    <div className="flex flex-col items-center gap-1 min-w-[64px]">
                                        <div className="w-16 h-16 rounded-full border border-neutral-700 flex items-center justify-center">
                                            <span className="text-2xl font-light">+</span>
                                        </div>
                                        <span className="text-xs">New</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-top border-neutral-800">
                                <div className="flex-1 flex justify-center py-3 border-b border-white">
                                    <Grid className="w-6 h-6" />
                                </div>
                                <div className="flex-1 flex justify-center py-3 text-neutral-500">
                                    <div className="w-6 h-6 border-2 border-current rounded-md flex items-center justify-center">
                                        <div className="w-0 h-0 border-l-[6px] border-l-current border-t-4 border-t-transparent border-b-4 border-b-transparent ml-0.5" />
                                    </div>
                                </div>
                                <div className="flex-1 flex justify-center py-3 text-neutral-500">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" opacity="0.5" />
                                        <path d="M17.5 10c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5S16 12.3 16 11.5 16.7 10 17.5 10zM12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-3 gap-0.5 pb-20">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                    <div key={i} className="aspect-square bg-neutral-900 border border-black relative group cursor-pointer hover:opacity-90">
                                        {/* Simulated content */}
                                        {i === 1 && <div className="absolute top-2 right-2"><div className="w-3 h-3 bg-white/50 rounded-full" /></div>}
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Tabs (Nav) */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-neutral-900 flex justify-around items-center h-[50px] px-2 text-white z-20">
                                <Link href="#" className="p-2"><svg aria-label="Home" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="m21.762 8.786-7-6.68C13.266.68 10.734.68 9.238 2.106l-7 6.681A4.017 4.017 0 0 0 1 11.68V20c0 1.654 1.346 3 3 3h5.005a1 1 0 0 0 1-1L10 15c0-1.103.897-2 2-2 1.09 0 1.98.877 2 1.962L13.999 22a1 1 0 0 0 1 1H20c1.654 0 3-1.346 3-3v-8.32a4.021 4.021 0 0 0-1.238-2.894ZM21 20a1 1 0 0 1-1 1h-4.001L16 15c0-2.206-1.794-4-4-4s-4 1.794-4 4l.005 6H4a1 1 0 0 1-1-1v-8.32c0-.543.226-1.07.62-1.447l7-6.68c.747-.714 2.013-.714 2.76 0l7 6.68c.394.376.62.904.62 1.448V20Z"></path></svg></Link>
                                <Link href="#" className="p-2 opacity-50"><svg aria-label="Reels" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><path d="M22.942 7.464c-.062-1.36-.306-2.143-.511-2.671a5.366 5.366 0 0 0-1.272-1.952 5.364 5.364 0 0 0-1.951-1.27c-.53-.207-1.312-.45-2.673-.513-1.2-.054-1.557-.066-4.535-.066s-3.336.012-4.536.066c-1.36.062-2.143.306-2.672.511-.769.3-1.371.692-1.951 1.272s-.973 1.182-1.27 1.951c-.207.53-.45 1.312-.513 2.673C1.004 8.665.992 9.022.992 12s.012 3.336.066 4.536c.062 1.36.306 2.143.511 2.671.298.77.69 1.373 1.272 1.952.58.581 1.182.974 1.951 1.27.53.207 1.311.45 2.673.513 1.199.054 1.557.066 4.535.066s3.336-.012 4.536-.066c1.36-.062 2.143-.306 2.671-.511a5.368 5.368 0 0 0 1.953-1.273c.58-.58.972-1.181 1.27-1.95.206-.53.45-1.312.512-2.673.054-1.2.066-1.557.066-4.535s-.012-3.336-.066-4.536Zm-7.085 6.055-5.25 3c-1.167.667-2.619-.175-2.619-1.519V9c0-1.344 1.452-2.186 2.619-1.52l5.25 3c1.175.672 1.175 2.368 0 3.04Z"></path></svg></Link>
                                <Link href="#" className="p-2 opacity-50"><svg aria-label="Messages" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messages</title><path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line></svg></Link>
                                <Link href="#" className="p-2 opacity-50"><svg aria-label="Search" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Search</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
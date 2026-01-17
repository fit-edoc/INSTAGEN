'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Send, Trash2, Plus, Wifi, Signal } from 'lucide-react'
import { toPng } from 'html-to-image'

interface Comment {
    id: number
    username: string
    text: string
    time: string
    likes: number
    isLiked: boolean
    isVerified: boolean
    profilePic: string
    hasStories: boolean
}

export default function CreateCommentPage() {
    const previewRef = useRef<HTMLDivElement>(null)

    // Initial dummy data
    const [statusBar, setStatusBar] = useState({
        showWifi: true,
        showSignal: true,
        batteryLevel: 100
    })

    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            username: 'design_daily',
            text: 'This is absolutely stunning! 🔥 the composition is perfect.',
            time: '2h',
            likes: 124,
            isLiked: false,
            isVerified: true,
            profilePic: '',
            hasStories: true
        },
        {
            id: 2,
            username: 'user_123',
            text: 'Where is this location? 😍',
            time: '5h',
            likes: 12,
            isLiked: true,
            isVerified: false,
            profilePic: '',
            hasStories: false
        }
    ])

    const [newComment, setNewComment] = useState<Omit<Comment, 'id'>>({
        username: '',
        text: '',
        time: '1m',
        likes: 0,
        isLiked: false,
        isVerified: false,
        profilePic: '',
        hasStories: false
    })

    const handleAddComment = () => {
        if (!newComment.username || !newComment.text) return
        setComments([...comments, { ...newComment, id: Date.now() }])
        setNewComment({
            username: '',
            text: '',
            time: '1m',
            likes: 0,
            isLiked: false,
            isVerified: false,
            profilePic: '',
            hasStories: false
        })
    }

    const handleDeleteComment = (id: number) => {
        setComments(comments.filter(c => c.id !== id))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewComment(prev => ({ ...prev, profilePic: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDownload = async () => {
        if (!previewRef.current) return

        try {
            const dataUrl = await toPng(previewRef.current, { cacheBust: true })

            const link = document.createElement('a')
            link.download = 'instagram_comments.png'
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error('Error downloading comments:', error)
            alert('Failed to download image.')
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-x-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
                </Link>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Controls Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-100 to-white mb-6">
                                Add Comment
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-1">Username</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newComment.username}
                                            onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                                            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white"
                                            placeholder="username"
                                        />
                                        <button
                                            onClick={() => setNewComment(prev => ({ ...prev, isVerified: !prev.isVerified }))}
                                            className={`px-3 py-2 rounded-xl border transition-colors ${newComment.isVerified ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-neutral-800 border-white/10 text-neutral-400'}`}
                                        >
                                            Verify
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-1">Comment Text</label>
                                    <textarea
                                        value={newComment.text}
                                        onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white h-20 resize-none"
                                        placeholder="Write a comment..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Time</label>
                                        <input
                                            type="text"
                                            value={newComment.time}
                                            onChange={(e) => setNewComment({ ...newComment, time: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white"
                                            placeholder="2h"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Likes Count</label>
                                        <input
                                            type="number"
                                            value={newComment.likes}
                                            onChange={(e) => setNewComment({ ...newComment, likes: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-1">Profile Picture</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            onClick={() => setNewComment(prev => ({ ...prev, hasStories: !prev.hasStories }))}
                                            className={`w-full py-2.5 rounded-xl border transition-colors ${newComment.hasStories ? 'bg-pink-500/20 border-pink-500/50 text-pink-400' : 'bg-neutral-800 border-white/10 text-neutral-400'}`}
                                        >
                                            Story Ring
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-4 mt-4">
                                    <h3 className="text-sm font-medium text-neutral-400 mb-3">Status Bar Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={statusBar.showSignal}
                                                    onChange={(e) => setStatusBar(prev => ({ ...prev, showSignal: e.target.checked }))}
                                                    className="w-4 h-4 rounded border-gray-600 bg-neutral-800"
                                                />
                                                <span className="text-neutral-400 text-xs">Signal</span>
                                            </label>
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={statusBar.showWifi}
                                                    onChange={(e) => setStatusBar(prev => ({ ...prev, showWifi: e.target.checked }))}
                                                    className="w-4 h-4 rounded border-gray-600 bg-neutral-800"
                                                />
                                                <span className="text-neutral-400 text-xs">WiFi</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-neutral-400 mb-1">Battery %</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={statusBar.batteryLevel}
                                                onChange={(e) => setStatusBar(prev => ({ ...prev, batteryLevel: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) }))}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-2 py-1.5 focus:outline-none text-white text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddComment}
                                    className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
                                >
                                    <Plus className="w-5 h-5" /> Add Comment to List
                                </button>
                            </div>

                            <div className="border-t border-white/10 pt-6 mt-6">
                                <h3 className="text-lg font-medium text-neutral-300 mb-3">Manage Comments</h3>
                                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                    {comments.map(comment => (
                                        <div key={comment.id} className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                                            <span className="truncate max-w-[200px] text-sm text-neutral-400">
                                                <span className="font-bold text-white mr-2">{comment.username}</span>
                                                {comment.text}
                                            </span>
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="text-red-400 hover:text-red-300 p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="w-full mt-4 bg-gradient-to-r from-white to-neutral-400 text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                Download Image
                            </button>
                        </div>
                    </div>

                    {/* Preview Section - Phone UI */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div
                            ref={previewRef}
                            className="w-[375px] h-fit min-h-[667px] bg-black text-white border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative font-sans flex flex-col"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
                        >
                            {/* Status Bar */}
                            <div className="flex justify-between items-center px-6 pt-3 pb-1 text-xs font-semibold">
                                <span>9:41</span>
                                <div className="flex gap-1.5 items-center">
                                    {statusBar.showSignal && <Signal className="w-4 h-4 text-white" />}
                                    {statusBar.showWifi && <Wifi className="w-4 h-4 text-white" />}
                                    <div className="w-6 h-3 border border-white/30 rounded-sm relative ml-1"> {/* Battery Container */}
                                        <div
                                            className={`absolute top-px left-px bottom-px rounded-[1px] ${statusBar.batteryLevel > 90 ? 'bg-green-500' :
                                                statusBar.batteryLevel < 20 ? 'bg-red-500' : 'bg-white'
                                                }`}
                                            style={{ width: `${Math.max(5, statusBar.batteryLevel - 4)}%` }}
                                        />
                                        <div className="absolute top-1 -right-0.5 w-[2px] h-1 bg-white/50 rounded-r-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                <ArrowLeft className="w-6 h-6" />
                                <h2 className="font-bold text-base">Comments</h2>
                                <Send className="w-6 h-6 rotate-12" />
                            </div>

                            {/* Comments List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {comments.length === 0 && (
                                    <div className="flex items-center justify-center h-40 text-neutral-500">
                                        No comments yet
                                    </div>
                                )}
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-3 relative">
                                        <div className={`w-9 h-9 shrink-0 rounded-full p-[2px] ${comment.hasStories ? 'bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500' : ''}`}>
                                            <div className="w-full h-full rounded-full border border-black overflow-hidden bg-neutral-800">
                                                {comment.profilePic ? (
                                                    <img src={comment.profilePic} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs font-bold">
                                                        {comment.username.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm leading-tight">
                                                <span className="font-semibold mr-1.5">
                                                    {comment.username}
                                                    {comment.isVerified && (
                                                        <span className="inline-block relative top-[2px] ml-0.5 w-3 h-3 bg-blue-500 rounded-full">
                                                            <CheckIcon />
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="text-white font-normal">{comment.text}</span>
                                            </div>

                                            <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400 font-medium">
                                                <span>{comment.time}</span>
                                                <span className="cursor-pointer">Reply</span>
                                                {comment.likes > 0 && <span>{comment.likes} likes</span>}
                                            </div>
                                        </div>

                                        <div className="shrink-0 pt-2 opacity-60">
                                            <Heart className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Input Area */}
                            <div className="p-3 border-t border-white/10 flex items-center gap-3 bg-black z-10">
                                <div className="w-9 h-9 rounded-full bg-neutral-800 overflow-hidden shrink-0">
                                    <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500">
                                        YOU
                                    </div>
                                </div>
                                <div className="flex-1 bg-neutral-900 rounded-full px-4 py-2.5 text-sm text-neutral-400 flex justify-between items-center border border-white/10">
                                    <span>Add a comment...</span>
                                    <span className="text-xs text-blue-300 font-semibold cursor-pointer">Post</span>
                                </div>
                            </div>

                            {/* Safe Area */}
                            <div className="h-5 w-full bg-black">
                                <div className="w-1/3 h-1 bg-white/20 mx-auto rounded-full mt-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-full h-full text-black p-[2px]">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

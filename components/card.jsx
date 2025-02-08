"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "../src/components/ui/skeleton.jsx";
import { Card } from "../src/components/ui/card.jsx";
import { Badge } from "../src/components/ui/badge.jsx";
import { Phone, Mail, MapPin, Calendar, Star } from "lucide-react"
import { motion } from "framer-motion"
import PropTypes from "prop-types"

export default function UserCard() {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("https://randomuser.me/api/?page=1&results=1&seed=abc")
                const data = await response.json()
                setUserData(data.results[0])
            } catch (err) {
                setError("Failed to fetch user data")
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="w-full max-w-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white/80 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                        {loading ? (
                            <Skeleton className="w-64 h-64 rounded-full" />
                        ) : (
                            <div className="relative group">
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                                    <img
                                        src={userData?.picture.large || "/placeholder.svg"}
                                        alt="User profile"
                                        className="w-64 h-64 object-cover rounded-full border-4 border-purple-300 shadow-lg"
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                                <motion.div
                                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-lg"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Star className="w-6 h-6 text-yellow-400" />
                                </motion.div>
                            </div>
                        )}

                        <div className="flex-1 space-y-6">
                            {loading ? (
                                <div className="space-y-3">
                                    <Skeleton className="h-10 w-[300px]" />
                                    <Skeleton className="h-6 w-[250px]" />
                                    <Skeleton className="h-6 w-[200px]" />
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                                            {userData?.name.first} {userData?.name.last}
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="capitalize text-sm px-3 py-1 bg-purple-100 text-purple-800">
                                                {userData?.gender}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoItem icon={Phone} text={userData?.phone} />
                                        <InfoItem icon={Mail} text={userData?.email} />
                                        <InfoItem icon={MapPin} text={`${userData?.location.city}, ${userData?.location.country}`} />
                                        <InfoItem icon={Calendar} text={new Date(userData?.dob.date).toLocaleDateString()} />
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-sm text-gray-600 italic">"Life is an adventure waiting to be explored."</p>
                                    </div>

                                    <div className="flex justify-end space-x-2">
                                        <SocialButton icon="facebook" />
                                        <SocialButton icon="twitter" />
                                        <SocialButton icon="instagram" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

function InfoItem({ icon: Icon, text }) {
    return (
        <div className="flex items-center gap-2 text-gray-700">
            <Icon className="w-5 h-5 text-purple-500" />
            <span className="text-sm">{text}</span>
        </div>
    )
}

InfoItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
}

function SocialButton({ icon }) {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                icon === "facebook" ? "bg-blue-600" : icon === "twitter" ? "bg-sky-500" : "bg-pink-600"
            }`}
        >
            <span className="sr-only">{icon}</span>
            <i className={`fab fa-${icon}`}></i>
        </motion.button>
    )
}

SocialButton.propTypes = {
    icon: PropTypes.string.isRequired,
}
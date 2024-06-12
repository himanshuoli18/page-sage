"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import Dashboard from "@/components/Dashboard"

const Page = () => {
    const router = useRouter()
    const { isLoaded, user } = useUser()

    useEffect(() => {
        if (isLoaded && (!user || !user.primaryEmailAddress)) {
            router.push('/sign-in')
        }
    }, [isLoaded, user, router])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className="mt-20">
            <Dashboard />
        </div>
    )
}

export default Page

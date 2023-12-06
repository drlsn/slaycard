"use client"

import { useParams, useRouter } from "next/navigation"

export default function InfoOfId() {
  const params = useParams()
  const router = useRouter()

  return (
    <div className="w-full flex flex-col gap-10 items-center py-10">
      <span className="text-center">Info {params.id}</span>
      <button className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push('/')}>
        Home
      </button>
    </div>
  )
}

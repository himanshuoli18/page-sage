'use client'

import UploadButton from './UploadButton'
import {
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
} from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'



const mockFiles = [
  // Add some mock file data
  { id: '1', name: 'File 1', createdAt: new Date().toISOString() },
  { id: '2', name: 'File 2', createdAt: new Date().toISOString() },
  { id: '3', name: 'File 3', createdAt: new Date().toISOString() },
  { id: '4', name: 'File 4', createdAt: new Date().toISOString() },
]

const fetchUserFiles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFiles)
    }, 1000)
  })
}

const deleteUserFile = async (id: string) => {
  // Simulate a network request to delete a user file
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id)
    }, 500)
  })
}

const Dashboard = () => {
  const [files, setFiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null)

  useEffect(() => {
    const loadFiles = async () => {
      const fetchedFiles = await fetchUserFiles()
      setFiles(fetchedFiles as any[])
      setIsLoading(false)
    }
    loadFiles()
  }, [])

  const handleDeleteFile = async (id: string) => {
    setCurrentlyDeletingFile(id)
    await deleteUserFile(id)
    setFiles(files.filter(file => file.id !== id))
    setCurrentlyDeletingFile(null)
  }

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>
          My Files
        </h1>

        <UploadButton />
      </div>

      {/* display all user files */}
      {files && files?.length !== 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
                <Link
                  href={`/dashboard/${file.id}`}
                  className='flex flex-col gap-2'>
                  <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
                    <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='truncate text-lg font-medium text-zinc-900'>
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
                  <div className='flex items-center gap-2'>
                    <Plus className='h-4 w-4' />
                    {format(
                      new Date(file.createdAt),
                      'MMM yyyy'
                    )}
                  </div>

                  <div className='flex items-center gap-2'>
                    <MessageSquare className='h-4 w-4' />
                    mocked
                  </div>

                  <Button
                    onClick={() =>
                      handleDeleteFile(file.id)
                    }
                    size='sm'
                    className='w-full'
                    variant='destructive'>
                    {currentlyDeletingFile === file.id ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Trash className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className='my-2' count={3} />
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>
            Pretty empty around here
          </h3>
          <p>Let&apos;s upload your first PDF.</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard

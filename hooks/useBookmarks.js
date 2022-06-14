import {useEffect, useState} from "react"
import FileSystem from "../../../utils/files/FileSystem"

export default function useBookmarks( ) {
    const [bookmarks, setBookmarks] = useState([])
    useEffect(() => {

        document.fileSystem.readFile(document.fileSystem.path + FileSystem.sep + "bookmarks.meta", "json")
            .then(res => {
                if (res)
                    setBookmarks(res)
            })

    }, [])

    const addBookmark = (id) => {
        setBookmarks(prev => {
            const n = [...prev, {
                name: id.split(FileSystem.sep ).pop(),
                path: id
            }]
            document.fileSystem.writeFile(FileSystem.sep + "bookmarks.meta",JSON.stringify(n)).catch()
            return n
        })
    }
    const removeBookmark = (id) => {
        setBookmarks(prev => {
            const n = prev.filter(i => i.path !== id)
            document.fileSystem.writeFile(FileSystem.sep + "bookmarks.meta", JSON.stringify(n)).catch()
            return n
        })
    }
    const renameBookmark = (id, newPath) => {
        setBookmarks(prev => {
            const p = prev.filter(i => i.path !== id)
            const n =  [...p, {
                name: newPath.split(FileSystem.sep).pop(),
                path: newPath
            }]
            document.fileSystem.writeFile(FileSystem.sep + "bookmarks.meta", JSON.stringify(n)).catch()
            return n
        })
    }
    const removeBlock = (v) => {
        setBookmarks(prev => {
            const n = prev.filter(i => !v.includes(i.path))
            document.fileSystem.writeFile(FileSystem.sep + "bookmarks.meta", JSON.stringify(n)).catch()
            return n
        })
    }
    return {
        bookmarks,

        removeBlock,
        addBookmark,
        removeBookmark,
        renameBookmark
    }
}
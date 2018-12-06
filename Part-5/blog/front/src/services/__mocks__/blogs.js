const blogs = [
    {
        id: "1234567abc",
        title: "first test blog",
        author: "Pamela A",
        likes: 4,
        user: { name: "Pamela A", userName: "pam" }
    },
    {
        id: "7654321cba",
        title: "second test blog",
        author: "jarno",
        likes: 7,
        user: { name: "Jarno V", userName: "jv" }
    }
]
const getAll = () => {
    return Promise.resolve(blogs)
}
const setToken = () => {}

export default { getAll, blogs, setToken }
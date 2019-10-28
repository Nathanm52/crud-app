import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService {
    //Get Users
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res =  await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createAt: new Date(post.createAt)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        })
    }

    //Create user
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    //Delete user
    static deletePost(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default PostService;
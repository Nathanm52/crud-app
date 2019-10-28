<template>
    <div class="container">
        <h1>Users</h1>
        <div class="create-post">
            <input type="text" id="create-post" v-model="text" placeholder="name of the new user">
            <button class="button-post" v-on:click="createPost">Post !</button>
        </div>
        <hr>
        <p class="error" v-if="error">
            {{ error }}
        </p>
        <div class="posts-container">
            <div class="post"
                v-for="(post, index) in posts"
                v-bind:item="post"
                v-bind:index="index"
                v-bind:key="post._id"
                v-on:dblclick="deletePost(post._id)"
            >
                <p class="text">
                    {{ post.text }}
                </p>
            </div>
        </div>
        <p>
            To delete a user, double click on the box you want to delete.
        </p>
    </div>
</template>

<script>
    import PostService from '../PostService';

    export default {
        name: 'PostComponent',
        data() {
            return {
                posts: [],
                error: '',
                text: ''
            }
        },
        async created() {
            try {
                this.posts = await PostService.getPosts();
            } catch(err) {
                this.error = err.message
            }
        },
        methods: {
            async createPost() {
                await PostService.insertPost(this.text);
                this.posts = await PostService.getPosts();
            },
            async deletePost(id) {
                await PostService.deletePost(id);
                this.posts = await PostService.getPosts();
            }
        }
    }
</script>

<style>
    div.container {
        max-width: 800px;
        margin: 0 auto;
    }

    p.error {
        border: 1px solid #ff5b5f;
        background-color: #ffc5c1;
        padding: 10px;
        margin-bottom: 15px;
    }

    div.post {
        position: relative;
        border: 1px solid #5bd658;
        background-color: #bcffb8;
        padding: 10px 10px 30px 10px;
        margin-bottom: 15px;
    }

    div.created-at{
        position: absolute;
        top: 0;
        left: 0;
        padding: 5px 15 px 5px 15px;
        background-color: darkgreen;
        color: white;
        font-size: 13px;
    }

    p.text {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
    }
    input[type=text], select {
        padding: 12px 10px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    button.button-post {
        background-color: #b7f1b7; /* Green */
        border: none;
        padding: 10px 40px;
        margin-left: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
</style>

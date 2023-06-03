<template>
    <div class="wrapper">
        <h2>Сообщения</h2>
        <div class="container">
            <input id="search" type="text" class="chat-input" placeholder="Поиск">
            <hr>
            <ul class="chat-list">
                    <li class="chat-item" v-for="chat in chats" :key="chat.timestamp">
                        <router-link :to="{name: 'UserChat', params: {userNickname: chat.recipient}}" style="text-decoration: none; color: inherit;">
                        <img src="../assets/photo.png" alt="Avatar" class="avatar">
                        </router-link>
                        <router-link :to="{name: 'UserChat', params: {userNickname: chat.recipient}}" style="text-decoration: none; color: inherit;">
                        <div class="chat-content">
                            <div>
                                <span class="nickname">{{ chat.recipient }}</span>
                                <span class="unread-count">{{ chat.formattedTimestamp}}</span>
                            </div>
                            <p class="chat-text">{{chat.body}}</p>
                        </div>
                        </router-link>
                    </li>

            </ul>
        </div>
    </div>
</template>

<script>

import {mapGetters} from "vuex";
import axios from "axios";
import moment from "moment";


export default {
    name: "ChatView",
    data(){
        return{
            chats: [],
        }
    },
    setup() {

    },
    mounted() {
        this.loadMessages();
    },
    methods: {
        loadMessages() {
            const username = this.userData.nickname;
            axios.get(`http://localhost:8000/api/messages/${username}/`)
                .then(response => {
                    const messages = response.data.messages;

                    const uniqueChats = [];

                    messages.forEach(msg => {
                        const sender = (msg.recipient === username) ? msg.recipient : msg.sender;
                        const recipient = (msg.recipient === username) ? msg.sender : msg.recipient;
                        const chatKey = [sender, recipient].sort().join('-');

                        if (!uniqueChats.some(chat => chatKey === chat.key)) {
                            uniqueChats.push({
                                key: chatKey,
                                sender,
                                recipient,
                                body: msg.body,
                                timestamp: msg.timestamp,
                            });
                        }
                    });

                    const sortedChats = uniqueChats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                    sortedChats.forEach(chat => {
                        const timestampMoment = moment(chat.timestamp);

                        if (timestampMoment.isSame(moment(), 'day')) {
                            chat.formattedTimestamp = timestampMoment.format('HH:mm'); // Форматирование времени для текущего дня
                        } else {
                            chat.formattedTimestamp = timestampMoment.format('DD.MM.YYYY HH:mm'); // Форматирование даты и времени
                        }

                        if (chat.recipient === username) {
                            chat.sender = chat.recipient;
                        }
                    });

                    this.chats = sortedChats;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    computed: {
        ...mapGetters(['userData']),
    },
}
</script>

<style scoped>
.wrapper{
    width: 62.5%;
    max-width: 100%;
    margin: 83px auto 0 auto;
    padding-left: 42px;
    padding-right: 42px;
    padding-top: 36px;
}
h2{
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 57px;
    margin-bottom: 12px;
    color: rgba(67, 67, 67, 1);
}

.container {
    margin: 38px;
    background: #FFFFFF;
    border: 1px solid rgba(63, 132, 197, 0.29);
    border-radius: 5px;
}

.chat-input {
    width: 100%;
    border: none;
    height: 68px;
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    color: #007D5F;
}

.chat-input::placeholder{
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    color: #007D5F;
}

.chat-input:active{
    border: #007D5F;
}

input#search {
    background-image: url('../assets/profile-search.svg');
    background-size: 32px 32px;
    background-repeat: no-repeat;
    background-position: 26px 20px;
    padding-left: 93px;
}

.chat-list {
    list-style-type: none;
    margin: 0;
    padding: 0 0px;
}

.chat-item {
    display: flex;
    align-items: center;
    height: 107px;
    max-width: 100%;
    border-bottom: 1px solid #ccc;
    margin: 0 30px;
}

.chat-item:nth-last-child(1){
    border-bottom: none;
}

.avatar {
    width: 75px;
    height: 75px;
    margin-right: 27px;
}

.nickname {
    padding-top: 0;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #434343;
    margin-right: 23px;
}

.unread-count {
    background-color: #007D5F;
    color: #fff;
    padding: 2px 8px 2px 7px;
    border-radius: 20px;
}

.chat-content {
    padding-top: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* Расширяет блок на всю оставшуюся ширину */
}

.chat-text {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    color: #434343;

    max-width: 100%;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box; /* Добавлено */
    -webkit-line-clamp: 2; /* Добавлено */
    -webkit-box-orient: vertical; /* Добавлено */
    text-overflow: ellipsis;
}

hr{
    border: none;
    height: 1px;
    border-radius: 5px;
    background-color: #007D5F;
}
</style>
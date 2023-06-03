<template>
    <div class="wrapper">
        <router-link to="/chat" class="back-button"><img src="../assets/arrow-left.svg" alt="" style="display:inline-block; margin-right: 10px;"></router-link>
        <h2 style="display:inline-block;">Сообщения</h2>
        <div class="container">
            <div class="dialog-container">
                <div class="user-info">
                    <img src="../assets/photo.png" alt="Avatar" class="avatar">
                    <span class="nickname">{{this.userNickname}}</span>
                </div>
                <hr class="separator">
                <div class="dialog">
                    <div v-for="message in messages" :key="message.id">
                        <span :class="{'timestamp': true, 'timestamp_sent': isSentMessage(message)}">{{ formatTimestamp(message.timestamp) }}</span>
                        <div :class="{'message': true, 'sent': isSentMessage(message), 'received': isReceivedMessage(message)}">
                            <span>{{ message.body }}</span>
                        </div>
                    </div>
                    <!-- More message items here -->
                </div>
                <hr class="separator">
                <div class="message-input">
                    <div class="textarea-container">
                        <form @submit.prevent="submit">
                            <textarea v-model="message" id="message" type="text" class="input-field" placeholder="Напишите сообщение" @keydown.enter="handleEnter"></textarea>
                            <button type="submit">
                                <img src="../assets/send-button.svg" alt="" class="send-button">
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters} from "vuex";
import axios from "axios";
import Pusher from 'pusher-js';
import {useRoute} from "vue-router";

export default {
    name: "UserChatView",
    data(){
        return{
            message: '',
            messages: [],
        }
    },
    setup() {
        const route = useRoute();
        const userNickname = route.params.userNickname;
        return {
            userNickname,
        };
    },
    mounted() {
        this.loadMessages();
    },
    methods: {
        loadMessages() {
            const username = this.userNickname;
            axios.get(`http://localhost:8000/api/messages/${username}/`)
                .then(response => {
                    this.messages = response.data.messages;
                })
                .catch(error => {
                    console.error(error);
                });
            Pusher.logToConsole = true;
            const pusher = new Pusher('da33156e93b2fd99cc06', {
                cluster: 'eu'
            });
            const channel = pusher.subscribe('chat');
            channel.bind('new-message', data => {
                const newMessage = data.message;
                this.messages.push(newMessage);
            });
        },
        async submit(){
            await axios.post('http://localhost:8000/api/send-message', {
                sender: this.userData.nickname,
                recipient: this.userNickname,
                body: this.message
            });

            this.message = ''
            this.loadMessages();
        },
        isSentMessage(message) {
            return message.sender === this.userData.nickname;
        },
        isReceivedMessage(message) {
            return message.sender === this.userNickname;
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        handleEnter(event) {
            if (event.key === 'Enter') {
                this.submit();
            }
        },
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

.dialog-container {
    width: 100%;
    margin: 0 38px;
    background: #FFFFFF;
    border: 1px solid rgba(63, 132, 197, 0.29);
    border-radius: 5px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.dialog::-webkit-scrollbar {
    width: 2px; /* Ширина полосы прокрутки */
    background-color: transparent; /* Прозрачный фон */
}

.dialog::-webkit-scrollbar-thumb {
    background-color: #007D5F; /* Цвет бегунка */
    border-radius: 1px; /* Задаем радиус границы, чтобы создать круглый бегунок */
}

.dialog::-webkit-scrollbar-track {
    background-color: transparent; /* Прозрачный фон трека (фон вокруг бегунка) */
}

.user-info {
    display: flex;
    justify-content: center;
    margin: 17px auto 11px auto;
    max-width: 100%;
    height: 4vh;
}

.user-info span{
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    color: #434343;
}

.avatar {
    width: 40px;
    height: 40px;
}

.nickname {
    margin-left: 10px;
}

.dialog {
    height: auto;
    max-height: 100%;
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    overflow-y: scroll;
}



.message {
    margin-bottom: 10px;
    max-width: 600px;
    min-height: 35px;
    clear: both; /* Добавляем clear: both для сброса обтекания */
    overflow: hidden;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    color: #434343;
    word-wrap: break-word;
}

.received {
    align-self: flex-start;
    padding: 9px 20px;
    float: left;
    background-color: rgba(0, 125, 95, 0.25);
    border-radius: 5px;
}

.sent {
    padding: 9px 20px;
    float: right;
    background-color: rgba(67, 67, 67, 0.25);
    border-radius: 5px;
}

.separator {
        border: none;
        height: 1px;
        border-radius: 5px;
        background-color: #007D5F;
}

.message-input {
    display: flex;
    align-items: center;
    min-height: 10vh;
}

.textarea-container {
    position: relative;
    flex: 1;
    height: 9vh;

}


.input-field {
    flex: 1;
    padding: 5px;
    border: none;
    resize: none;
    height: 9vh;
    width: 96%;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    color: #434343;
}

.send-button {
    position: absolute;
    top: 4px;
    right: 5px;
    cursor: pointer;
}

.timestamp{
    float: left;
    position: relative;
    font-size: 10px;
    color: #434343;
    opacity: 0.8;
}

.timestamp_sent{
    text-align: right;
    float: right;
    font-size: 10px;
    opacity: 0.8;
    color: #434343;
}
</style>
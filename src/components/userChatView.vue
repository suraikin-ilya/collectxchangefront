<template>
    <div class="wrapper">
        <h2>Сообщения</h2>
        <div class="container">
            <div class="dialog-container">
                <div class="user-info">
                    <img src="../assets/photo.png" alt="Avatar" class="avatar">
                    <span class="nickname">Nickname</span>
                </div>
                <hr class="separator">
                <div class="dialog">
                    <div class="message received">
                        <strong>Received Message:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                    <div class="message received">
                        <strong>Received Message:</strong> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                    <div class="message sent">
                        <strong>Sent Message:</strong> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                    <div class="message received">
                        <strong>Received Message:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>

                    <!-- More message items here -->
                </div>
                <hr class="separator">
                <div class="message-input">
                    <div class="textarea-container">
                        <textarea id="message" type="text" class="input-field" placeholder="Напишите сообщение"></textarea>
                        <img src="../assets/send-button.svg" class="send-button">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters} from "vuex";


export default {
    name: "UserChatView",
    data(){
        return{

        }
    },
    setup() {

    },
    mounted() {

    },
    methods: {

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
    overflow: auto;
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
    overflow-y: auto;
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
    overflow: auto;
}

.message {
    margin-bottom: 10px;
    max-width: 600px;
    min-height: 55px;
    clear: both; /* Добавляем clear: both для сброса обтекания */
    overflow: hidden;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;

    color: #434343;
}

.received {
    align-self: flex-start;
    padding: 9px 20px;
    float: left;
    background-color: rgba(0, 125, 95, 0.25);
    border-radius: 5px;
}

.sent {
    align-self: flex-end;
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
    height: 100%;
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

</style>
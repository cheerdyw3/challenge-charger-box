<template>
  <v-container>
    <v-row class="justify-center ma-5">
      <v-alert
        width=350
        outlined
        color="indigo"
        border="left"
        class="ma-2"
      >
        <p>username = member</p>
        <p>password = 1234</p>
        <hr>
        <p>- จอง</p>
        <p>- ดูประวัติการจอง</p>
      </v-alert>

      <v-alert
        width=350
        outlined
        color="red"
        border="left"
        class="ma-2"
      >
        <p>username= admin</p>
        <p>password = 1234</p>
        <hr>
          - แก้ไขสถานะ ของล็อกเกอร์ (ว่าง/ไม่ว่าง)
      </v-alert>

      <v-col cols=12>
        <v-row class="justify-center ma-5">
      <v-card class="elevation-1" height="300" width="400">
        <v-toolbar color="primary" dark flat dense>
          <v-toolbar-title>Login form</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom> </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="username"
              name="username"
              v-model="username"
              prepend-icon="mdi-account"
              type="text"
            >
            </v-text-field>

            <v-text-field
              id="password"
              label="Password"
              v-model="password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>
      </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Users from '@/Models/Users'  
import axios from "axios";
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      type:''
    }
  },
  methods:{
    async login () {    
      try {
          await axios.post(
            "https://us-central1-locker2-6442b.cloudfunctions.net/app/login",{ username: this.username, password: this.password }
          ).then((res) => {
            if (res.data.obj) {
              Users.insert({
                  data: { 
                    id: res.data.obj[0].id,
                    username: res.data.obj[0].username,
                    password: res.data.obj[0].password,
                    type: res.data.obj[0].type,
                  } 
              }) 
              if(res.data.obj[0].type === 0){
                this.$router.push("/lockers").catch(() => {});
              }else if(res.data.obj[0].type === 1){
                this.$router.push("/").catch(() => {});
              }
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    checkLogin(){
        if(Users.query().first()===null){
          this.$router.push("/login").catch(() => {});
        }else if(Users.query().first().type === 0){
          this.$router.push("/lockers").catch(() => {});
        }else if(Users.query().first().type === 1){
          this.$router.push("/").catch(() => {});
        }
    }
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style></style>

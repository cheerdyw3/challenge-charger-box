<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <span v-if="Users" class="pr-2">{{Users.username}}</span>
      <v-menu offset-y v-if="Users">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="yellow" light v-bind="attrs" v-on="on">
            Menu
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/" v-if="Users.type === 1">
            <v-list-item-title>หน้าแรก</v-list-item-title>
          </v-list-item>
          <v-list-item to="/history" v-if="Users.type === 1">
            <v-list-item-title>ประวัติการจอง</v-list-item-title>
          </v-list-item>
          <v-list-item to="/lockers" v-if="Users.type === 0">
            <v-list-item-title>lockers</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logOut()">
            <v-list-item-title>log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Users from '@/Models/Users' 
export default {
  name: "App",

  components: {},

  data: () => ({

  }),
  computed: {
      Users() {  return Users.query().first(); }, 
  },
  methods: {
    logOut(){
      Users.deleteAll();
      this.$router.push("/login").catch(() => {});
    }
  },
};
</script>

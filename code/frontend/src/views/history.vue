<template>
  <v-container>
    <v-row class="justify-center ma-5">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:[`item.type`]="{ item }">
          <v-chip v-if="item.type === '1'" color="#90CAF9" dark>fast charge</v-chip>
          <v-chip v-else color="#9FA8DA" dark>normal</v-chip>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import Users from "@/Models/Users";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        { text: "ช่องที่",align: "start", value: "lockerId" },
        { text: "type ",align: "start", value: "type" },
        { text: "จำนวนเวลาจอง/นาที",align: "start", value: "minTotal" },
        { text: "ราคา/บาท",align: "start", value: "price" }
      ],
      desserts: [],
    };
  },
  methods: {
    async getHistory() {
      try {
        if(Users.query().first()===null){
          this.$router.push("/login").catch(() => {});
        }else if(Users.query().first().type != 1){
          this.$router.push("/login").catch(() => {});
        }else{
        await axios
          .get("https://us-central1-locker2-6442b.cloudfunctions.net/app/getAllBookingMember/"+Users.query().first().$id)
          .then((res) => {
            if (res.data.obj) {
              this.desserts = res.data.obj;
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getHistory();
  },
};
</script>

<style></style>

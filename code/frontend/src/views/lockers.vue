<template>
  <v-container>
    <v-row class="justify-center ma-5">
      <v-col cols="6">
        <v-card elevation="0" tile>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="12"
            sort-by="calories"
            class="elevation-1"
          >
              <template v-slot:[`item.lockerStatus`]="{ item }">
                <v-chip v-if="item.lockerStatus === 0" color="red" dark>ว่าง</v-chip>
                <v-chip v-else color="green" dark>ไม่ว่าง</v-chip>
              </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="getLockers">Reset</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
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
            { text: "id", value: "id"},
            { text: "locker status", value: "lockerStatus" },
            { text: "Actions", value: "actions", sortable: false },
          ],
          desserts: [],
          editedItem: {
            id: "",
            number: "",
            lockerStatus: "",
          },
          defaultItem: {
            id: "",
            number: "",
            lockerStatus: "",
          }
    };
  },
  methods: {
    async getLockers() {
      try {
        if(Users.query().first()===null){
          this.$router.push("/login").catch(() => {});
        }else if(Users.query().first().type != 0){
          this.$router.push("/login").catch(() => {});
        }else{
          await axios
            .get("https://us-central1-locker2-6442b.cloudfunctions.net/app/locker")
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
    async editItem(item){
          let conf = confirm(
            `ยืนยันการแก้สถานะ`
          );
          if (conf == true) {
              try {
                await axios.post(
                  "https://us-central1-locker2-6442b.cloudfunctions.net/app/changeStatus",item
                ).then((res) => {
                  if (res.data.success) {
                    this.getLockers();
                  }
                });
              } catch (error) {
                console.error(error);
              }
          }
    }
  },
  created() {
    this.getLockers();
  },
};
</script>

<style></style>

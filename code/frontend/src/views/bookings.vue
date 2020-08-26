<template>
  <v-container>
    <v-row class="justify-center">
            <v-alert
        width=500
        outlined
        color="indigo"
        border="left"
        class="ma-2"
      >
        <b>rate</b>
        <hr>
        <p>type 1 (fast charge) rate 15 Baht / 30 Min.</p>
        <p>type 2 (normal) rate 10 Baht / 30 Min.</p>
        <p>Time less or greater than 30 min will be counted as 30 Min.</p>
      </v-alert>
    </v-row>
    <v-row class="text-center ma-5">
      <v-flex xs12 sm6 md4 lg3 v-for="locker in lockers" :key="locker.id">
        <v-card flat color="#E0F7FA" class="ma-5">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                Locker Slot #{{ locker.number }}
                <v-icon v-if="locker.lockerStatus === 0" color="red"
                  >mdi-checkbox-blank-circle</v-icon
                >
                <v-icon v-if="locker.lockerStatus === 1" color="green"
                  >mdi-checkbox-blank-circle</v-icon
                >
              </div>
              <!-- <v-list-item-title class="headline mb-1"
                >Status :
              </v-list-item-title> -->

              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="justify-center">
            <v-btn
              :disabled="locker.lockerStatus === 1"
              @click="(dialog = true), (booking.lockerId = locker.number)"
              >Booking</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline"
              >Booking Slot # {{ booking.lockerId || null }}</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <h2>Type</h2>
                  <v-radio-group v-model="booking.type">
                    <v-radio label="Fast Charge" value="1"></v-radio>
                    <v-radio label="Normal" value="2"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col sm="12" md="6">
                  <h2>Start:</h2>
                  <v-time-picker
                    width="250"
                    v-model="booking.start"
                    :max="booking.end"
                    format="24hr"
                  ></v-time-picker>
                </v-col>
                <v-col sm="12" md="6">
                  <h2>End:</h2>
                  <v-time-picker
                    width="250"
                    v-model="booking.end"
                    :min="booking.start"
                    format="24hr"
                  ></v-time-picker>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="clear()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Users from '@/Models/Users' 

export default {
  name: "HelloWorld",
  data() {
    return {
      lockers: [],
      dialog: false,
      booking: {
        lockerId: "",
        userId: "",
        type: "",
        start: "",
        end: "",
        price: "",
        minTotal: ""
      },
    };
  },
  methods: {
    async initialize() {
      try {
        if(Users.query().first()===null){
          this.$router.push("/login").catch(() => {});
        }else if(Users.query().first().type != 1){
          this.$router.push("/login").catch(() => {});
        }else{
          await axios
            .get("https://us-central1-locker2-6442b.cloudfunctions.net/app/locker")
            .then((res) => {
              if (res.data.obj) {
                this.lockers = res.data.obj;
              }
            });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async save() {
      console.log(this.booking);
      if (
        this.booking.end === "" ||
        this.booking.start === "" ||
        this.booking.type === "" ||
        this.booking.lockerId === ""
      ) {
        alert("กรูณากรอกข้อมูลให้ครบ");
        console.log("null");
      } else {
        let hourStart = parseInt(this.booking.start.slice(0, 2));
        let hourEnd = parseInt(this.booking.end.slice(0, 2));
        let minStart = parseInt(this.booking.start.slice(3, 6));
        let minEnd = parseInt(this.booking.end.slice(3, 6));
        let hour = hourEnd - hourStart;
        let minFromHour = (hourEnd - hourStart) * 60;

        let min = null;
        if (hour === 0) {
          min = minEnd - minStart;
        } else {
          min = minStart + minEnd;
        }

        let minTotal = minFromHour + min;
        let modulus = minTotal % 30;

        let result = null;
        if (modulus != 0) {
          result = Math.floor(minTotal / 30) + 1;
        } else {
          result = Math.floor(minTotal / 30);
        }

        // console.log(
        //   "hour=",
        //   hour,
        //   "minFromHour=" + minFromHour,
        //   "min=" + min,
        //   "minTotal=" + minTotal,
        //   " modulus=" + modulus,
        //   " result=" + result
        // );

        let price = null;
        if (this.booking.type === "1") {
          price = result * 15;
        } else if (this.booking.type === "2") {
          price = result * 10;
        }

        this.booking.userId = Users.query().first().$id;
        this.booking.price = price;
        this.booking.minTotal = minTotal;

        if (price === 0) {
          alert("กรูณากรอกข้อมูลให้ถูกต้อง");
        } else {
          let conf = confirm(
            `*****  ต้องการจอง ${minTotal} นาที รวมทั้งสิ้น ${price} บาท *****`
          );
          if (conf == true) {
              try {
                await axios.post(
                  "https://us-central1-locker2-6442b.cloudfunctions.net/app/addBooking",this.booking
                ).then((res) => {
                  if (res.data.success) {
                    this.clear();
                    this.initialize();
                  }
                });
              } catch (error) {
                console.error(error);
              }
          }
        }
      }
    },
    clear() {
      this.dialog = false;
      this.booking = {
        lockerId: "",
        userId: "",
        type: "",
        start: "",
        end: "",
        price: "",
        minTotal: ""
      };
    },
  },
  watch: {
    // booking() {
    //   console.log(this.booking);
    // },
  },
  created() {
    this.initialize();
  },
};
</script>

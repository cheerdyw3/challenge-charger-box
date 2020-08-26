import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
import VuexORM from '@vuex-orm/core'
import Users from '@/Models/Users'   

Vue.use(Vuex) 
const vuexLocalStorage = new VuexPersist({ 
  storage: window.sessionStorage,  
})

const database = new VuexORM.Database()   
database.register(Users)   
 
const store = new Vuex.Store({
  plugins: [VuexORM.install(database),vuexLocalStorage.plugin] 
})

export default store
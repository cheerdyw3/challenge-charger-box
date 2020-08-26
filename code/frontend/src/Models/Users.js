import { Model } from '@vuex-orm/core'   

export default class Users extends Model { 

  static get entity () {
    return 'users'
  }

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return {
        username: this.attr(''),
        password: this.attr(''),
        type: this.attr('')
    }
  } 
}
 
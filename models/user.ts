import {Schema,model,models} from "mongoose"



const UserSchema = new Schema ({

participantName :{
    type : String ,
    required : [true , "participant name is required"],
    minLength : [1,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
},

schoolName :{
    type : String ,
    required : [true , "school name is required"],
    minLength : [1,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
}
,

schoolAddress :{
    type : String ,
    required : [true , "school address is required"],
    minLength : [1,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
}
,

phoneNumber :{
    type : String ,
    required : [true , "phone number is required"],
    minLength : [2,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
}
,


email :{
    type : String ,
    unique : true ,
    required : [true , "email is required"],
    match : [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email address"]
}
,

createdDate: {
    type: Date,
    default: () => new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
  },
 })



const User = models['User'] || model('User', UserSchema, 'school-data');

export default User 






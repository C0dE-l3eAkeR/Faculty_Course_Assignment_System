import axios from "axios";
class User {
    constructor(id, name, address, gender, email) {
        if (this.constructor === User) {
            throw new TypeError('Abstract class "User" cannot be directly constructed.');
        }

        this.id = id;
        this.name = name;
        this.address = address;
        this.gender = gender;
        this.email = email;
    }

    login() {
        console.log(`${this.name} has logged in.`);
    }
}

class Course {
    constructor(index, name, credit) {
        this.index=index;
        this.name = name;
        this.credit = credit;
    }
}
class slotClass {

        days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
        times1 = ["08.00am","09.10am","10.20am","11.30am","12.40pm","01.50pm","03.00pm","04.10pm","05.20pm"];
         times2 = ["09.00am","10.10am","11.20am","12.30pm","01.40pm","02.50pm","04.00pm","05.10pm","06.20pm"];
        static defalutSlot = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
    constructor(slot){ 
        this.slot = slot;
    }
     manageSlot(time){
       let i=this.times1.indexOf(time.startTime);
       let j=this.times2.indexOf(time.endTime);
       let k= this.days.indexOf(time.day1);
       let l = this.days.indexOf(time.day2);
       for(let ii=i;ii<=j;ii++){
        this.slot[k][ii]=1;
        this.slot[l][ii]=1;
       }
     }
     compareSlot(time){
        let i= this.times1.indexOf(time.startTime);
       let j= this.times2.indexOf(time.endTime);
       let k= this.days.indexOf(time.day1);
       let l = this.days.indexOf(time.day2);
       let flag=true;
       for(let ii=i;ii<=j;ii++){
        if(this.slot[k][ii]!==0)flag=false;}
        for(let ii=i;ii<=j;ii++){
        if(this.slot[l][ii]!==0)flag=false;
       }
       console.log(flag);
      return flag;
     }
}
class Admin extends User {
    constructor(id, name, address, gender, email, password) {
        super(id, name, address, gender, email);
        this.password = password;
    }

    addFaculty(faculty) {
        University.addFac(faculty);
        //console.log(`Faculty ${faculty.name} has been added by ${this.name}`);
    }

    deleteFaculty(faculty) {
        University.removeFaculty(faculty);
        console.log(`Faculty ${faculty.name} has been deleted by ${this.name}`);
    }

    assignCourseToFaculty(course, faculty, timing) {
       University.offerCrs(faculty, course, timing); 
    }

  
    createCourse(courseName, courseCredit) {
        University.createCrs(courseName, courseCredit);
    }
}



class Faculty extends User {
  
    constructor(id, name, address, gender, email, department, password, assignedCourses, offerdCourses, creditcount, slot) {
        super(id, name, address, gender, email);
        this.department = department;
        this.assignedCourses = assignedCourses;
        this.offerdCourses = offerdCourses;
        this.password = password;
        this.creditcount= creditcount;
        this.slot = slot;
    }
  

    offerCourse(sec) {
        this.offerdCourses.push(sec);
        //console.log(`Course ${course.name} is offered by ${this.name}`);
    }
}

class Room {
    constructor(number,slot){
        this.number=number;
        this.slot = slot;
    }
    setAvailability(){

    }
}

class Section {
    constructor(course, number, time, room){
    this.course = course;
    this.number =number;
    this.time = time;
    this.room = room;    
    }

}

class Timing {
    constructor(startTime, endTime, day1, day2){
        this.startTime =startTime;
        this.endTime =endTime;
        this.day1 =day1;
        this.day2 =day2;
    }
}

class University {
    static faculties = [];
    static admins = [];
    static courses = [];
    static rooms = [];
    static secNo = [];
    static crsIndx = 0;
   

   static allocateRoom(timing){
    let room = "";
    this.rooms.map((e)=>{if(e.slot.compareSlot(timing)==true){room=e; e.slot.manageSlot(timing);}});
    return room;
   }

    constructor() {
    }


    static addsec(crs,timing){
        this.secNo[crs.index]+=1;
        const room = this.allocateRoom(timing);
        if(room!==""){
        const sec1 = new Section(crs,this.secNo[crs.index], timing,room );
        console.log(sec1);
        return sec1;
        }
        else {
            console.log("error - room not available");
            return false;
        }
    }

    static addAll(){
    this.faculties.push(new Faculty("100","abcshoaib","adsfd","234234","asdfdas","CSE","masai",new slotClass(slotClass.defalutSlot)));
    this.admins.push(new Admin("100","shoaib","adsfd","asdfdas","gmail","masai"));
    this.courses.push(new Course(0,"CSE102",'3'));
    this.secNo[0]=0;
    this.rooms.push(new Room(101,new slotClass(slotClass.defalutSlot)));
    }

    static addFac(faculty){
    
     this.faculties.push(new Faculty(faculty.id, faculty.name, faculty.address, faculty.gender,
        faculty.email, faculty.department, faculty.password,[],[],0,new slotClass(slotClass.defalutSlot)));
    }

    static checkFacultSlot(fac,time){
        if(fac.slot.compareSlot(time)==true){
            fac.slot.manageSlot(time);
            return true;
        }else return false;
    }

    static createCrs(courseName, courseCredit){

        University.crsIndx +=1;
        const course = new Course(University.crsIndx, courseName, courseCredit);
        University.courses.push(course);  
        University.secNo[University.crsIndx]=0; 
    }
    
    static removeFaculty(){
        
    }

    static offerCrs(fac, crs, timing){

 
    const section = this.addsec(crs, timing);
    const checkFacSlot = this.checkFacultSlot(fac,timing);

    if(!section || fac.creditcount + parseInt(crs.credit) >11 || !checkFacSlot ){
        console.log("Error");
    }
    else {  
        fac.offerCourse(section);
    fac.creditcount += parseInt(crs.credit);
    }
  }
  static saveData() {
    const data = {
      admins: this.admins,
      faculties: this.faculties,
      courses: this.courses,
      secNo : this.secNo,
      rooms : this.rooms,
      crsIndx : this.crsIndx
    };
  
    axios.post('http://localhost:4000/savedata', data).then((res)=>{
      
      console.log("data saved");
      })
  }

  // Load data from file
  static loadData() {
   
        axios.get('http://localhost:4000/loaddata').then((res)=>{
       
       const user = res.data;
       user.admins.map((e)=>{
         this.admins.push(new Admin(e.id,e.name,e.address,e.gender,e.email,e.password));
       });
       user.faculties.map((e)=>{
        let offerCrs=[];
        e.offerdCourses.map((f)=>offerCrs.push(f));
        let assigndCrs=[];
        e.assignedCourses.map((f)=>assigndCrs.push(f));
        this.faculties.push(new Faculty(e.id,e.name,e.address,e.gender,e.email,e.department,e.password,assigndCrs,offerCrs,e.creditcount,new slotClass(e.slot.slot)));
      });
      user.courses.map((e)=>{
        this.courses.push(new Course(e.index,e.name,e.credit));
      });
      user.rooms.map((e)=>{
        this.rooms.push(new Room(e.number,new slotClass(e.slot.slot)));
      });
      user.secNo.map((e)=>{
        this.secNo.push(e);
      });
      this.crsIndx = user.crsIndx;
    })
    console.log(this.admins);
  }
  

}

export {University, Admin, Timing};
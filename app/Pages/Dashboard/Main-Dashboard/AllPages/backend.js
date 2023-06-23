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
    constructor(){
        this.days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
        this.times1 = ["08.00am","09.10am","10.20am","11.30am","12.40pm","01.50pm","03.00pm","04.10pm","05.20pm"];
        this.times2 = ["09.00am","10.10am","11.20am","12.30pm","01.40pm","02.50pm","04.00pm","05.10pm","06.20pm"];
        this.slot = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
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

        University.crsIndx +=1;
        const course = new Course(University.crsIndx, courseName, courseCredit);
        University.secNo[University.crsIndx]=0;
        University.courses.push(course);   
    }
}



class Faculty extends User {
  
    constructor(id, name, address, gender, email, department, password) {
        super(id, name, address, gender, email);
        this.department = department;
        this.assignedCourses = [];
        this.offerdCourses = [];
        this.password = password;
        this.creditcount =0;
        this.slot = new slotClass();
    }
  

    offerCourse(sec) {
        this.offerdCourses.push(sec);
        //console.log(`Course ${course.name} is offered by ${this.name}`);
    }
}

class Room {
    constructor(number, available){
        this.number=number;
        this.slot = new slotClass();
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
    this.faculties.push(new Faculty("100","abcshoaib","adsfd","234234","asdfdas","CSE","masai"));
    this.admins.push(new Admin("100","shoaib","adsfd","asdfdas","gmail","masai"));
    this.courses.push(new Course(0,"CSE102",'3'));
    this.secNo[0]=0;
    this.rooms.push(new Room(101,true))
    }

    static addFac(faculty){
    
     this.faculties.push(new Faculty(faculty.id, faculty.name, faculty.address, faculty.gender,
        faculty.email, faculty.department, faculty.password));
    }

    static createCrs(course){

        this.courses.unshift(course);
    }
    
    static removeFaculty(){
        
    }

    static offerCrs(fac, crs, timing){
    console.log(parseInt(fac.creditcount) + parseInt(crs.credit));
   // if(fac.creditcount + parseInt(crs.credit) <=11){
    const section = this.addsec(crs, timing);
    if(!section){
        console.log("Error");
    }
    else {  
        fac.offerCourse(section);
    fac.creditcount += crs.credit;
    }
  }
}

export {University, Admin, Timing};
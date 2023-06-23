class User {
    constructor(id, name, address, phoneNumber, email) {
        if (this.constructor === User) {
            throw new TypeError('Abstract class "User" cannot be directly constructed.');
        }

        this.id = id;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
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

class Admin extends User {
    constructor(id, name, address, phoneNumber, email) {
        super(id, name, address, phoneNumber, email);
        
    }

    addFaculty(faculty) {
        University.addFac(faculty);
        console.log(`Faculty ${faculty.name} has been added by ${this.name}`);
    }

    deleteFaculty(faculty) {
        University.removeFaculty(faculty);
        console.log(`Faculty ${faculty.name} has been deleted by ${this.name}`);
    }

    assignCourseToFaculty(course, faculty) {
       University.offerCrs(faculty, course); 
    }

    createCourse(courseName, courseCredit) {
        const course = new Course(courseName, courseCredit);
        University.createCrs(course);
    }
}



class Faculty extends User {
  
    constructor(id, name, address, phoneNumber, email, department) {
        super(id, name, address, phoneNumber, email);
        this.department = department;
        this.assignedCourses = [];
        this.offerdCourses = [];
        this.creditcount =0;
    }
  
    createCourse(courseName, courseCredit) {
        
        const course = new Course(University.crsIndx,courseName, courseCredit);
        University.crsIndx +=1;
        this.assignedCourses.push(course);
        console.log(`Course ${course.name} has been created by ${this.name}`);
        return course;
    }

    offerCourse(sec) {
        this.offerdCourses.push(sec);
        //console.log(`Course ${course.name} is offered by ${this.name}`);
    }
}

class Room {
    constructor(number, available){
        this.number=number;
        this.available = available;
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
    

   static allocateRoom(){
    let room;
    this.rooms.map((e)=>e.available==true?room=e:null);
    return room;
   }

    constructor() {
    }


    static addsec(crs,timing){
        this.secNo[crs.index]+=1;
        const sec1 = new Section(crs,this.secNo[crs.index], timing, this.allocateRoom()) 
        return sec1;
    }
    static addAll(){
    this.faculties.push(new Faculty("001","abcshoaib","adsfd","234234","asdfdas","CSE"));
    this.courses.push(new Course(0,"CSE102","3"));
    this.secNo[0]=0;
    this.rooms.push(new Room(101,true))
    }

    static addFac(faculty){
     this.faculties.push(faculty);
    }

    static createCrs(course){
        this.courses.unshift(course);
    }
    
    static removeFaculty(){
        
    }

    static offerCrs(fac, crs, timing){
    if(fac.creditcount + crs.credit<11){
    
    fac.offerCourse(this.addsec(crs, timing));
    fac.creditcount += crs.credit;
    }
    else {
        console.log("Error");
    }
  }
}

export {University, Admin, Timing};
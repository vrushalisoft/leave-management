
export class User {
    id? : string
   status?: Status;

   constructor(public firstName: string, public lastName: string, public email : string, public contactNo : number,
    public department : string, public username: string, public password : string, public role: string,  status? : Status ){

   this.firstName= firstName;
   this.lastName= lastName;
   this.email = email;
   this.contactNo = contactNo,
   this.department = department;
   this.username= username;
   this.password = password;
   this.role= role;
   this.status = status;
  }
}

export class Status {
  totalLeaves : number
  approved : number;
  rejected : number;
  constructor(){
    this.totalLeaves = 20;
    this.approved =  0;
    this.rejected =  0;
  }
}



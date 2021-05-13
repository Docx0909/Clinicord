import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Report } from './resume';
import {DataService} from 'src/app/services/data.service'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.css']
})
export class Page4Component implements OnInit {
  statement: string = "A medical statement is a formal and legal statement which contains medical records. All medical records are held confidential, in fact, physicians are not allowed for any release of these since these records are private and personal. A medical statement is often used and required when there are activities which have possible potential risks."
  id: any;
  report = new Report();
  healthprofiles: any;
  // degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];
  constructor( private ds: DataService) {
    this.report = JSON.parse(sessionStorage.getItem('report')) || new Report();
    // if (!this.report.experiences || this.report.experiences.length === 0) {
    //   this.report.experiences = [];
    //   this.report.experiences.push(new Experience());
    // }
    // if (!this.report.educations || this.report.educations.length === 0) {
    //   this.report.educations = [];
    //   this.report.educations.push(new Education());
    // }
    // if (!this.report.skills || this.report.skills.length === 0) {
    //   this.report.skills = [];
    //   this.report.skills.push(new Skill());
    // }
  }

  ngOnInit(){
    this.get_healthprofile();
    this.statement;
  }

  get_healthprofile(){
    this.ds.processData('getappointments', null).subscribe((res: any)=>{
      this.healthprofiles = res.data;
      console.log(this.healthprofiles);
    });   
   }

   getvalue(healthprofiles){

   }

  // addExperience() {
  //   this.report.experiences.push(new Experience());
  // }
  // addEducation() {
  //   this.report.educations.push(new Education());
  // }

  //Action to generate PDF
  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  resetForm() {
    this.report = new Report();
    sessionStorage.removeItem('report')
  }
  getDocumentDefinition() {
    sessionStorage.setItem('report', JSON.stringify(this.report));
    return {
      content: [
        {
          text: 'Clinicord Web Generated Health Report',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.report.name,
              style: 'name'
            },
            {
              text: this.report.address
            },
            {
              text: 'Email : ' + this.report.email,
            },
            {
              text: 'Contant No : ' + this.report.contactNo,
            },
            {
              text: 'Appointment Date : ' + this.report.appointmentdate,
            },
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        // {
        //   text: 'Skills',
        //   style: 'header'
        // },
        // {
        //   columns : [
        //     {
        //       ul : [
        //         ...this.report.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.report.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.report.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
        //       ]
        //     }
        //   ]
        // },
        // {
        //   text: 'Experience',
        //   style: 'header'
        // },
        // this.getExperienceObject(this.report.experiences),
        // {
        //   text: 'Education',
        //   style: 'header'
        // },
        // this.getEducationObject(this.report.educations),
        {
          text: 'Health Details',
          style: 'header'
        },
        {
          text: this.report.healthDetails = this.statement
        },
        // {
        //   text: 'Other Details',
        //   style: 'header'
        // },
        // {
        //   text: this.report.otherDetails
        // },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
              { qr: this.report.name + ', Contact No : ' + this.report.contactNo, fit : 100 },
              {
              text: `(${this.report.name})`,
              alignment: 'right',
              }
          ]
        }
      ],
      info: {
        title: this.report.name + ' Health Report',
        author: this.report.name,
        subject: 'Health Report',
        keywords: 'Health Report, ONLINE Health Report',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }




  // getExperienceObject(experiences: Experience[]) {
  //   const exs = [];
  //   experiences.forEach(experience => {
  //     exs.push(
  //       [{
  //         columns: [
  //           [{
  //             text: experience.jobTitle,
  //             style: 'jobTitle'
  //           },
  //           {
  //             text: experience.employer,
  //           },
  //           {
  //             text: experience.jobDescription,
  //           }],
  //           {
  //             text: 'Experience : ' + experience.experience + ' Months',
  //             alignment: 'right'
  //           }
  //         ]
  //       }]
  //     );
  //   });
  //   return {
  //     table: {
  //       widths: ['*'],
  //       body: [
  //         ...exs
  //       ]
  //     }
  //   };
  // }
  // getEducationObject(educations: Education[]) {
  //   return {
  //     table: {
  //       widths: ['*', '*', '*', '*'],
  //       body: [
  //         [{
  //           text: 'Degree',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'College',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'Passing Year',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'Result',
  //           style: 'tableHeader'
  //         },
  //         ],
  //         ...educations.map(ed => {
  //           return [ed.degree, ed.college, ed.passingYear, ed.percentage];
  //         })
  //       ]
  //     }
  //   };
  // }
  getProfilePicObject() {
    if (this.report.profilePic) {
      return {
        image: this.report.profilePic ,
        width: 75,
        alignment : 'right'
      };
    }
    return null;
  }
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.report.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  // addSkill() {
  //   this.report.skills.push(new Skill());
  // }
}
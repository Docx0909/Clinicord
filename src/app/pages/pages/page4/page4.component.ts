import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Report } from './resume';
import { DataService } from 'src/app/services/data.service'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.css']
})
export class Page4Component implements OnInit {
  sendfile: FormGroup;

  id: any;
  report = new Report();
  clientnames: any;
  doctors: any;
  Doctor_id: any;
  Client_id: any;
  Date: any;
  appointmentdates: any;
  sendto: string;
  pdfreport: any;
  constructor(private _ds: DataService, private fb: FormBuilder
  ) {
    this.report = JSON.parse(sessionStorage.getItem('report')) || new Report();
  
  }

  ngOnInit(): void {
    this.get_doctors();

    this.sendfile = this.fb.group({
      email: ['', Validators.required],
      reportfile:  ['', Validators.required],
      newfile:['', Validators.required],
    })
  }

  async get_doctors() {
    this._ds.processData1(btoa('getdoctors'), '', 2).subscribe((res: any) => {
      this.doctors = res.data;

    });
  }
  // triggers when doctor selected
  async showclient(id: any) {
    console.log(id);
    this.Doctor_id = id;
    try {
      this._ds.processData1(btoa('getclientondoctor'), id, 2).subscribe((res: any) => {
        var d = new Date(); // for now     
        this.report.createddate = d.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
        this.clientnames = res.data;
        this.report.doctorName = res.data[0]['Doctor_name'];
        this.report.doctorAddress = res.data[0]['Doctor_address'];
        this.report.contactNo = res.data[0]['Doctor_phone'];
        this.report.email = res.data[0]['User_email'];
      });
    } catch (error) {
      console.log('err', error)
    }

  }
  // triigers when doctor and client selected
  async getappointmentclient(id: any) {
    this.Client_id = id;
    try {
      this._ds.processData1(btoa('getappointmentdate'), { id: id, doctorId: this.Doctor_id }, 2).subscribe((res: any) => {
        // console.log(res.data)
        this.appointmentdates = res.data;
        this.report.name = res.data[0]['Client_name'];
        this.sendto = res.data[0]['User_email'];
        // console.log(this.sendto)
      });
    } catch (error) {
      console.log('err', error)
    }

  }

  async getappointmentdate(id: any) {
    this.Date = id;
    try {
      this._ds.processData1(btoa('getappointmenttime'), { id: this.Client_id, doctorId: this.Doctor_id, date: this.Date }, 2).subscribe((res: any) => {
        console.log(res.data)
        this.report.appointmentdate = this.Date;
        this.report.appointmenttime = res.data[0]['ap_time'];
  
      });
    } catch (error) {
      console.log('err', error)
    }

  }
  onFileChange(event) {

    if (event.target.files.length > 0) {

      const reportfile = event.target.files[0];

      this.sendfile.patchValue({

        newfile: reportfile

      });

    }

  }

  async submitPdf(event: any) {
    var formData = new FormData()
    formData.append('email', this.sendfile.get('email').value)
    formData.append('attachment', this.sendfile.get('newfile').value)
    console.log(this.sendfile.get('newfile').value)
    try {
      this._ds.processData1(btoa('sendemailattachment'), formData, 3).subscribe((res: any) => {
        if(res.success){
          Swal.fire({
            html: '<h2> Successfully Sent!</h2>',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6'
          }).then((result) => {
            if (result.isConfirmed) {
  
            }
          })
        }else{
          Swal.fire({
            html: '<h2> Successfully Sent!</h2>',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6'
          }).then((result) => {
            if (result.isConfirmed) {
  
            }
          })
        }
      });
    } catch (error) {
      console.log('err', error)
    }
  }

  //Action to generate PDF
  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(this.sendto+'.pdf'); break;
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
          text: 'Medical Record of ' + this.report.name,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          decoration: 'underline',
          style: 'fullname',
        },
        {
          text: this.report.doctorAddress,
          bold: true,
          fontSize: 15,
          alignment: 'center',
          italics: true,
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
              {
                text: 'M.D. Email: ' + this.report.email,
              },
    
              {
                text: 'M.D. Contact No: ' + this.report.contactNo,
              },
              {
                text: 'Appointment Date: ' + this.report.appointmentdate,
              },
              {
                text: 'Appointment Time: ' + this.report.appointmenttime,
              },
              {
                text: 'Issued On: ' + this.report.createddate,
              },
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        {
          text: 'Prescription Details',
          style: 'header'
        },
        {
          text: this.report.prescriptionDetails
        },
        {
          text: 'Health Details',
          style: 'header'
        },
        {
          text: this.report.healthDetails
        },
        {
          text: 'Diagnosis:',
          style: 'header',
          alignment: 'left'
        },
        {
          text: this.report.diagnosisDetails,
          alignment: 'left'
        },
        {
          text: 'Attending Physician:',
          alignment: 'right',
          style: 'header3'
        },
        {
          text: this.report.doctorName + ', M.D',
          alignment: 'right',
          style: 'doctorName'
        },
      

        // {
        //   text: 'Other Details',
        //   style: 'header'
        // },
        // {
        //   text: this.report.otherDetails
        // },
        // {
        //   text: 'Signature',
        //   style: 'sign'
        // },
        // {
        //   text: `(${this.report.name})`,
        //   alignment: 'right',
        // },
        // {
        //   columns : [
        //       { qr: this.report.name + ', Contact No : ' + this.report.contactNo, fit : 100 },
        //       {
        //       
        //       }
        //   ]
        // }
      ],
      info: {
        title: 'Medical Report of ' + this.report.name,
        author: this.report.name,
        subject: 'Health Report',
        keywor_ds: 'Health Report, ONLINE Health Report',
      },
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 20, 0, 5],
          decoration: 'underline'
        },
        headerSub: {
          fontSize: 12,
          bold: true,
          italics: true,
          decoration: 'underline'
        },
        header2: {
          fontSize: 12,
          bold: true,
          margin: [0, 20, 0, 5],
        },
        header3: {
          fontSize: 12,
          bold: true,
          italics: true,
          margin: [0, 20, 0, 5],
        },
        doctorName: {
          fontSize: 12,
          bold: false,
          italics: true,
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

  getProfilePicObject() {
    if (this.report.profilePic) {
      return {
        image: this.report.profilePic,
        width: 100,
        alignment: 'right'
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
}
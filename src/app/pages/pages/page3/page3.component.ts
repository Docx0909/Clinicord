import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Validators,FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {
  page :number = 1;
  pageSize: number = 6;
  appointments: any;
  clients: any;
  id:any;
  fullname: string;
  type: string;
  model: string;
  time: string;
  status: string;
  description: string;
  closeResult = '';
  editForm : FormGroup;
  createForm : FormGroup;
  IsDelete : string = 'T';


  
  constructor(private ds: DataService, private modalService: NgbModal, private fb: FormBuilder) { }

  get_date(){
  var apDate = new Date();
  var DD = String(apDate.getDate() + 7).padStart(2, '0');
  var MM = String(apDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  var YYYY = apDate.getFullYear();
  this.model = YYYY + '-' + MM + '-' + DD;
}
editModal(contentEdit, appointment){
    console.log(appointment);
    this.get_date();
    this.modalService.open(contentEdit, 
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     },  (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.editForm.setValue({
      id: appointment.ap_id,
      fullname: appointment.Client_name,
      practitioner: appointment.Doctor_name,
      type: appointment.ap_type,
      model: appointment.ap_date,
      time: appointment.ap_time ,
      status: appointment.ap_status,
      description: appointment.ap_description
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.get_appointments();
    // this.get_clients_ap();

    this.editForm = this.fb.group({
      id: ['',Validators.required],
      fullname:['',Validators.required],
      practitioner:['',Validators.required],
      type:['',Validators.required],
      model: ['',Validators.required],
      time: ['', Validators.required],
      status:  ['', Validators.required],
      description: ['',Validators.required]
})
  this.createForm = this.fb.group({
    fullname:['',Validators.required],
    type:['',Validators.required],
    model: ['',Validators.required],
    status:  ['',Validators.required],
    description: ['',Validators.required]
  })
  }

  get_appointments(){
    this.ds.processData('getappointments', null).subscribe((res: any)=>{
      this.appointments = res.data;
      console.log(this.appointments);
    });   
   }


   create_appointments(){
      this.get_date();
      if (this.createForm.invalid){
          console.log("Invalid Forms")
      }else{
        try{
          this.ds.processData('addappointments', this.createForm.value).subscribe((response: any)=>{
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Appointment Created',
                showConfirmButton: false,
                timer: 1500
              })
              this.get_appointments();
              console.log(response);
              });
              }
              catch(error)
              {
                console.log(error);
      
               }
          }
     }
     edit_appointments(){
         try{
          this.ds.processData('updateappointments', this.editForm.value).subscribe((response: any)=>{  
            this.modalService.dismissAll();
            this.get_appointments();
            console.log(response);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Appointment Updated',
              showConfirmButton: false,
              timer: 1500
            })
           });
          }
          catch(error)
          {
            console.log(error);
           } 
     }

      delete_appointments(ap_id){
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: false
          }).then((result) => {
          if (result.isConfirmed) {
              this.ds.processData('deleteappointments',{
                  ap_id: ap_id,  
                  IsDeleted: this.IsDelete
                  }).subscribe((res: any)=>{
                  this.get_appointments();
                console.log(res)
                    });
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your appointment is safe:)',
              'error'
            )
          }
        })
      }

}
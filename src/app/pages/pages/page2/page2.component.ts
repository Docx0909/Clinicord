import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})


@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {
  term: any;
  doctors: [];
  firstname: any;
  id:any;
  fullname: string = '';
  specialty: string = '';
  gender: string = '';
  age: any = '';
  phoneNumber: string = '';
  closeResult = '';
  editForm : FormGroup;
  page :number = 1;
  pageSize: number = 4;
  NotDelete: string = 'F';
  IsDelete : string = 'T';

  constructor(private _ds: DataService, private modalService: NgbModal, private fb: FormBuilder) { }
 
  editModal(contentEdit, doctor){
    console.log(doctor);
    this.modalService.open(contentEdit, 
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     },  (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.editForm.patchValue({
      id: doctor.Doctor_id,
      fullname:doctor.Doctor_name,
      specialty:doctor.Doctor_specialty,
      gender: doctor.Doctor_gender ,
      age:  doctor.Doctor_age,
      phoneNumber: doctor.Doctor_phone
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
    this.get_doctors();
  
    this.editForm = this.fb.group({
      id: [''],
      fullname:[''],
      specialty:[''],
      gender: [''],
      age:  [''],
      phoneNumber: [''],

    })
  }
 
  get_doctors(){
    this._ds.processData1(btoa('getdoctors'), '', 2).subscribe((res: any)=>{
      this.doctors = res.data;
   
    });   
   }

   create_doctors(){
    try{
      this._ds.processData1(btoa('adddoctors'), {
        Doctor_name: this.fullname, 
        Doctor_specialty: this.specialty, 
        Doctor_gender: this.gender, 
        Doctor_age: this.age, 
        Doctor_phone: this.phoneNumber,
        IsDeleted: this.NotDelete}, 2).subscribe((response: any)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Doctor Created',
            showConfirmButton: false,
            timer: 1500
          })
          this.get_doctors();
          console.log(response);
          });
          }catch(error)
          {
            console.log(error);
  
           }
          
     }
      
      edit_doctors(){
        console.log(this.editForm.value);
         try{
          this._ds.processData1(btoa('updatedoctors'), this.editForm.value, 2).subscribe((response: any)=>{  
            this.modalService.dismissAll();
            this.get_doctors();
            console.log(response);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Doctor Updated',
              showConfirmButton: false,
              timer: 1500
            })
           });
          }catch(error)
          {
            console.log(error);
           }
          
     }
     delete_doctors(Doctor_id){
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
  
            console.log(Doctor_id);
         this._ds.processData1(btoa('deletedoctors'), {Doctor_id: Doctor_id,  IsDeleted: this.IsDelete}, 2).subscribe((res: any)=>{
    
          this.get_doctors();
         console.log(res)
            });
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            )
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your record file is safe :)',
              'error'
            )
          }
        })
      }
    }

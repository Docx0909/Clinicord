import { Component, OnInit, PipeTransform  } from '@angular/core';
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
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  page :number = 1;
  pageSize: number = 6;
  clients: [];
  id: any = '';
  fullname: string ;
  gender: string ;
  age: any = '';
  address: string ='';
  phoneNumber: string = '';
  findings:string='';
  checkup: string='';
  closeResult = '';
  editForm : FormGroup;

  NotDelete: string = 'F';
  IsDelete : string = 'T';


  constructor(private ds: DataService, private modalService: NgbModal, private fb: FormBuilder) { }
  
  
  editModal(contentEdit, client){
    console.log(client);
    this.modalService.open(contentEdit, 
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     },  (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.editForm.patchValue({
      id: client.Client_id,
      fullname: client.Client_name,
      gender: client.Client_gender,
      age:  client.Client_age,
      address: client.Client_address,
      phoneNumber: client.Client_phone,
      findings: client.Client_findings,
      checkup: client.Client_IsForCheckup
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
    this.get_clients();

    this.editForm = this.fb.group({
          id : [''],
          fullname: [''],
          gender:[''] ,
          age:  [''],
          address: [''],
          phoneNumber:[''] ,
          findings:[''] ,
          checkup: ['']
    })
  }
  get_clients(){
    this.ds.processData('getclients', null).subscribe((res: any)=>{
      this.clients = res.data;
      console.log(this.clients);
    });
  }

 async create_clients(event){
    

  if( this.fullname == "" ||this.gender == ""|| this.age ==""){
 
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Error',
      showConfirmButton: false,
      timer: 1500
    });
   }
   event.preventDefault();
      try{
        this.ds.processData('addclients', {
        Client_name: this.fullname, 
        Client_gender: this.gender, 
        Client_age: this.age, 
        Client_address: this.address, 
        Client_phone: this.phoneNumber, 
        Client_findings: this.findings,
        Client_IsForCheckup: this.checkup,
        IsDeleted: this.NotDelete }).subscribe((response: any)=>{
     
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Client Created',
          showConfirmButton: false,
          timer: 1500
        }) 
        console.log(response);
        this.get_clients();
      });
        }catch(error)
        {
          console.log(error);

         }
        
   }
  
    edit_clients(){
      console.log(this.editForm.value);
       try{
        this.ds.processData('updateclients', this.editForm.value).subscribe((response: any)=>{  
          this.modalService.dismissAll();
          this.get_clients();
          console.log(response);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Client Updated',
            showConfirmButton: false,
            timer: 1500
          })

            });
        }catch(error)
        {
          console.log(error);
         }
        
   }

     delete_clients(Client_id){
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          this.ds.processData('deleteclients',{
            Client_id: Client_id,
            IsDeleted: this.IsDelete}).subscribe((res: any)=>{
    
          this.get_clients();
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

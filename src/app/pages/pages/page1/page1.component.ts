import { Component, OnInit, PipeTransform  } from '@angular/core';
import { DataService } from '../../../services/data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  term: any;
  clients: [];
  id: any = '';
  firstname: any;
  fullname: string ;
  gender: string ;
  age: any = '';
  address: string ='';
  phoneNumber: string = '';
  bloodtype: string = '';
  checkup: string='';
  closeResult = '';
  editForm : FormGroup;
  page :number = 1;
  pageSize: number = 4;
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
      weight: client.Client_weight,
      bloodtype: client.Client_bloodtype,
      healthcondition: client.Client_healthcondition,
      symptoms: client.Client_healthsymptoms,
      medication: client.Client_healthmedication,
      allergy:  client.Client_healtallergies,
      tobacco: client.Client_healthtobacco,
      drug: client.Client_drughistory,
      alcohol: client.Client_alcoholhistory

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
          fullname: ['', Validators.required],
          gender:['', Validators.required] ,
          age:  ['', Validators.required],
          address: ['', Validators.required],
          phoneNumber:['', Validators.required] ,
          weight:['', Validators.required] ,
          bloodtype: ['', Validators.required],
          healthcondition: ['', Validators.required],
          symptoms: ['', Validators.required],
          medication: ['', Validators.required],
          allergy: ['', Validators.required],
          tobacco: ['', Validators.required],
          drug: ['', Validators.required],
          alcohol: ['', Validators.required]



    })
  }
  get_clients(){
    this.ds.processData1(btoa('getclients'), '', 2).subscribe((res: any)=>{
      this.clients = res.data;
      console.log(this.clients)
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
        this.ds.processData1(btoa('addclients'), {
        Client_name: this.fullname, 
        Client_gender: this.gender, 
        Client_age: this.age, 
        Client_address: this.address, 
        Client_phone: this.phoneNumber, 
        IsDeleted: this.NotDelete }, 2).subscribe((response: any)=>{
     
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
        this.ds.processData1(btoa('updateclients'), this.editForm.value, 2).subscribe((response: any)=>{  
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
        confirmButtonText: 'Proceed '
      
      }).then((result) => {
        if (result.isConfirmed) {

          this.ds.processData1(btoa('deleteclients'),{
            Client_id: Client_id,
            IsDeleted: this.IsDelete}, 2).subscribe((res: any)=>{
    
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

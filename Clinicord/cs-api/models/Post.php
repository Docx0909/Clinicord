<?php 
	

	class Post {
		protected $pdo; 
		protected $get;
		

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
			$this->get = new Get($pdo);
		}
//insert functions
		public function insert_client($d) {
			// print_r($d);
			$sql = "SELECT * FROM client_tbl WHERE Client_name='$d->Client_name'LIMIT 1";
			if($result = $this->pdo->query($sql)->fetchAll()) {
			 return array("error"=>"Client Already Exists!");
		 	} else {

			$sql = "INSERT INTO client_tbl (Client_name, Client_gender, Client_age, Client_address, Client_phone, Client_findings, Client_IsForCheckup, IsDeleted) VALUES (?, ?, ?, ? , ?, ?,?, ?)";
			$sql = $this->pdo->prepare($sql);
			$sql->execute([
				$d->Client_name,
				$d->Client_gender,
				$d->Client_age,
				$d->Client_address,
				$d->Client_phone,
				$d->Client_findings,
				$d->Client_IsForCheckup,
				$d->IsDeleted
			]);
			return $this->get->get_clients();
		}
	}

		public function insert_doctor($d) {
			// print_r($d);
			$sql = "SELECT * FROM doctor_tbl WHERE Doctor_name='$d->Doctor_name'LIMIT 1";
			if($result = $this->pdo->query($sql)->fetchAll()) {
			 return array("error"=>"Doctor Already Exists!");
		 	} else {
			$sql = "INSERT INTO doctor_tbl (Doctor_name, Doctor_specialty, Doctor_gender, Doctor_age, Doctor_phone, IsDeleted) VALUES (?, ?, ?, ? , ?, ?)";
			$sql = $this->pdo->prepare($sql);
			$sql->execute([
				$d->Doctor_name,
				$d->Doctor_specialty,
				$d->Doctor_gender,
				$d->Doctor_age,
				$d->Doctor_phone,
				$d->IsDeleted
			]);
			return $this->get->get_doctors();
		}
	}
		public function insert_appointment($d) {
			// print_r($d);
			$sql = "SELECT * FROM checkup_tbl WHERE client_name='$d->client_name'LIMIT 1";
			if($result = $this->pdo->query($sql)->fetchAll()) {
			 return array("error"=>"Appointment Already Exists!");
		 } else {

			$sql = "INSERT INTO checkup_tbl (client_name, ap_type, ap_date, ap_status, ap_description, IsDeleted) VALUES (?,?, ?, ?, ?, ?)";
			$sql = $this->pdo->prepare($sql);
			$sql->execute([
				$d->client_name,
				$d->ap_type,
				$d->ap_date,
				$d->ap_status,
				$d->ap_description,
				$d->IsDeleted

			]);
			return $this->get->get_appoint();
		}
	}
		
	
//update functions
		public function update_client($d) {
			$sql = "UPDATE client_tbl SET Client_name = ?, Client_gender = ?, Client_age = ?, Client_address = ?, Client_phone = ?, Client_findings = ?, Client_IsForCheckup = ?, UpdatedOn = NOW() WHERE Client_id=?";
			$sql = $this->pdo->prepare($sql);
			$sql->execute([
				$d->fullname,
				$d->gender,
				$d->age,
				$d->address,
				$d->phoneNumber,
				$d->findings,
				$d->checkup,
				$d->id

			]);
			return $this->get->get_clients();
				}
		public function update_doctor($d) {
			$sql = "UPDATE doctor_tbl SET Doctor_name = ?, Doctor_specialty = ?, Doctor_gender = ?, Doctor_age = ?, Doctor_phone= ?,  UpdatedOn = NOW() WHERE Doctor_id=?";
			$sql = $this->pdo->prepare($sql);
			$sql->execute([
				$d->fullname,
				$d->specialty,
				$d->gender,
				$d->age,
				$d->phoneNumber,
				$d->id
		
			]);
			return $this->get->get_doctors();
			}
		public function update_appointment($d) {
			$sql = "UPDATE checkup_tbl SET client_name = ?, ap_type = ?, ap_date = ?, ap_status = ?, ap_description= ?,  UpdatedOn = NOW() WHERE ap_id=?";
			$sql = $this->pdo->prepare($sql);
			$sql->execute([
				$d->fullname,
				$d->type,
				$d->model,
				$d->status,
				$d->description,
				$d->id
		
			]);
			return $this->get->get_appoint();
			}
			
//delete functions
		public function delete_client($d) {
			// print_r($d);
			$sql = "UPDATE  client_tbl SET IsDeleted = ?  WHERE Client_id = ? ";
			$sql = $this->pdo->prepare($sql);
			$sql->execute([
				$d->IsDeleted,
				$d->Client_id
			]);
			return array("success"=>"Record was deleted ");
		}
		
		public function delete_doctor($d) {
			// print_r($d);
			$sql = "UPDATE  doctor_tbl  SET IsDeleted = ? WHERE Doctor_id = ? ";
			$sql = $this->pdo->prepare($sql);
			$sql->execute([
				$d->IsDeleted,
				$d->Doctor_id
				
			]);
			return array("success"=>"Record was deleted ");
		}

		public function delete_appointment($d) {
			// print_r($d);
			$sql = "UPDATE  checkup_tbl  SET IsDeleted = ? WHERE ap_id = ? ";
			$sql = $this->pdo->prepare($sql);
			$sql->execute([
				$d->IsDeleted,
				$d->ap_id
				
			]);
			return array("success"=>"Record was deleted ");
		}
	}
?>

<?php 
	class Get {
		protected $pdo; 

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

		public function get_clients() {
			$data = [];
			$sql = "SELECT * FROM client_tbl WHERE IsDeleted = 'F' ORDER BY UpdatedOn DESC ";
			if($result = $this->pdo->query($sql)->fetchAll()) {
				foreach ($result as $record) {
					array_push($data, $record);
				}
				return array("data"=>$data);
			} else {
				return array("error"=>"ERROR: No record found");
			}
		}
		
		// public function get_clients_appoint() {
		// 	$data = [];
		// 	$sql = "SELECT client_tbl.Client_name FROM client_tbl WHERE IsDeleted = 'F' ORDER BY UpdatedOn DESC ";
		// 	if($result = $this->pdo->query($sql)->fetchAll()) {
		// 		foreach ($result as $record) {
		// 			array_push($data, $record);
		// 		}
		// 		return array("data"=>$data);
		// 	} else {
		// 		return array("error"=>"ERROR: No record found");
		// 	}
		// }
		

		public function get_doctors() {
			$data = [];
			$sql = "SELECT * FROM doctor_tbl WHERE IsDeleted = 'F' ORDER BY createdOn DESC";
			if($result = $this->pdo->query($sql)->fetchAll()) {
				foreach ($result as $record) {
					array_push($data, $record);
				}
				return array("data"=>$data);
			} else {
				return array("error"=>"ERROR: No record found");
			}
		}

		public function get_appoint() {
			$data = [];

			$sql = "SELECT checkup_tbl.*, client_tbl.Client_name FROM checkup_tbl INNER JOIN client_tbl ON checkup_tbl.U_id = client_tbl.U_id WHERE checkup_tbl.IsDeleted = 'F'";

			if($result = $this->pdo->query($sql)->fetchAll()) {
				foreach ($result as $record) {
					array_push($data, $record);
				}
				return array("data"=>$data);
			} else {
				return array("error"=>"ERROR: No record found");
			}

		}

		public function get_upcoming($d) {

			$data = [];
			$sql = "SELECT * FROM checkup_tbl WHERE ap_status != 'Finished' AND U_id='$d->account_id' AND IsDeleted = 'F'";
			if($result = $this->pdo->query($sql)->fetchAll()) {
				foreach ($result as $record) {
					array_push($data, $record);
				}
				return array("data"=>$data);
			} else {
				return array("error"=>"ERROR: No record found");
			}
		}
		public function get_past($d) {

			$data = [];
			$sql = "SELECT * FROM checkup_tbl WHERE ap_status = 'Finished' AND U_id='$d->account_id' AND IsDeleted = 'F'";
			if($result = $this->pdo->query($sql)->fetchAll()) {
				foreach ($result as $record) {
					array_push($data, $record);
				}
				return array("data"=>$data);
			} else {
				return array("error"=>"ERROR: No record found");
			}
		}
		
		public function get_profile($d) {
			
			$sql = "SELECT client_accounts.*, client_tbl.* FROM client_accounts INNER JOIN client_tbl ON client_tbl.U_id = client_accounts.id WHERE id = '$d->account_id'";
			if($res = $this->pdo->query($sql)->fetchAll()) {
				return array("data"=>array("id"=>$res[0]['id'], "User_username"=>$res[0]['User_username'], "User_email"=>$res[0]['User_email'], "Client_name"=>$res[0]['Client_name'],
				"Client_gender"=>$res[0]['Client_gender'], "Client_age"=>$res[0]['Client_age'], "Client_birthdate"=>$res[0]['Client_birthdate'],
				"Client_address"=>$res[0]['Client_address'], "Client_phone"=>$res[0]['Client_phone'],"Client_weight"=>$res[0]['Client_weight'], "Client_height"=>$res[0]['Client_height'],
				"Client_bloodtype"=>$res[0]['Client_bloodtype'], "Client_healthcondition"=>$res[0]['Client_healthcondition'], "Client_healthsymptoms"=>$res[0]['Client_healthsymptoms'],
				"Client_healthmedication"=>$res[0]['Client_healthmedication'], "Client_healtallergies"=>$res[0]['Client_healtallergies'], "Client_healthtobacco"=>$res[0]['Client_healthtobacco'],
				"Client_drughistory"=>$res[0]['Client_drughistory'], "Client_alcoholhistory"=>$res[0]['Client_alcoholhistory']));
			} else {
				return array("error"=>"ERROR: No record found");
			}
		}

	}
	
?>

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
		
		public function get_clients_appoint() {
			$data = [];
			$sql = "SELECT * FROM client_tbl WHERE IsDeleted = 'F' AND Client_IsForCheckup = 'T' ORDER BY UpdatedOn DESC ";
			if($result = $this->pdo->query($sql)->fetchAll()) {
				foreach ($result as $record) {
					array_push($data, $record);
				}
				return array("data"=>$data);
			} else {
				return array("error"=>"ERROR: No record found");
			}
		}
		

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
			$sql = "SELECT * FROM checkup_tbl WHERE IsDeleted = 'F' ORDER BY createdOn DESC";
			if($result = $this->pdo->query($sql)->fetchAll()) {
				foreach ($result as $record) {
					array_push($data, $record);
				}
				return array("data"=>$data);
			} else {
				return array("error"=>"ERROR: No record found");
			}
		}
	}
	
?>

<?php  
	class Auth {
		protected $pdo; 

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

		public function encrypt_password($pword) {
			$hashFormat="$2y$10$";
			$saltLength=22;
			$salt=$this->generate_salt($saltLength);
			return crypt($pword, $hashFormat.$salt);
		}

		protected function generate_salt($len) {
			$urs=md5(uniqid(mt_rand(), true));
			$b64String = base64_encode($urs);
			$mb64String = str_replace('+', '.', $b64String);
			return substr($mb64String, 0, $len);
		}

		public function pword_check($pword, $existingHash) {
			$hash=crypt($pword, $existingHash);
			if($hash===$existingHash) {
				return true;
			} 
			return false;
		}

		// public function change_password ($id, $oldpassword, $newpassword) {
		// 	$sql = "SELECT * FROM accounts_tbl WHERE studid='$id' AND isdeleted=0 LIMIT 1";
		// 	if($result = $this->pdo->query($sql)->fetchAll()) {
		// 		if ($this->pword_check($oldpassword, $result['pword_fld'])) {
		// 			# save/update the password

		// 			$sql = 
		// 			return array("data"=>$data);
		// 		} else {
		// 			return array("error"=>"Incorrect username or password");
		// 		}
				
		// 	} else {
		// 		return array("error"=>"ERROR: No record found");
		// 	}

		// }

		public function admin_login($param) {
			$un = $param->param1;
			$pw = $param->param2;
			
			
			$sql = "SELECT * FROM admin_accounts  WHERE Doctor_username ='$un' LIMIT 1";
			try {
			if($res = $this->pdo->query($sql)->fetchAll()) {
				if($this->pword_check($pw, $res[0]['Doctor_password'])) 
				{
					return array("data"=>array("Doctor_id"=>$res[0]['Doctor_id'], "Doctor_email"=>$res[0]['Doctor_email']));
					
				} else {
					exit();
					return array("error"=>"Incorrect username or password");
				
				}
					} else {
						exit();
				return array("error"=>"Incorrect username or password");
		
					} 
				} catch (PDOException $error) {
					echo 'Connection failed: ' .$error->getMessage();
				}
		}

		public function client_login($d) {
			$un = $d->username;
			$pw = $d->password;
				
				
			$sql = "SELECT * FROM client_accounts  WHERE User_username ='$un' LIMIT 1";
			try {
			if($res = $this->pdo->query($sql)->fetchAll()) {
				if($this->pword_check($pw, $res[0]['User_password'])) 
				{
					return array("data"=>array("id"=>$res[0]['id'], "User_username"=>$res[0]['User_username']));

				} else {

					exit();
					return array("error"=>"Incorrect username or password");
				} 
				} else {

					exit();
					return array("error"=>"Incorrect username or password");
				} 
				} catch (PDOException $error) {
					echo 'Connection failed: ' .$error->getMessage();
			}
		}

		public function admin_registration($d) {
			
			$sql = "SELECT * FROM clinicord_accounts WHERE Doctor_email='$d->email' OR Doctor_username='$d->username' LIMIT 1";
			try {
				if($result = $this->pdo->query($sql)->fetchAll()) {
					return array("error"=>"Failed Registered");
						} else {
		   
					   $sql = "INSERT INTO clinicord_accounts (Doctor_email, Doctor_username, Doctor_password) VALUES (?, ?, ?)";
					   $sql = $this->pdo->prepare($sql);
					   $sql->execute([
						   $d->email,
						   $d->username,
						   $this->encrypt_password($d->password)
					   ]);
					   return array("success"=>"Sucessfully Registered");
					}
			   
				} catch (PDOException $error) {
				echo 'Connection failed: ' .$error->getMessage();
			}
			
		}

		public function client_registration($d) {
			
			$sql = "SELECT * FROM client_accounts WHERE User_email='$d->email' OR User_username='$d->username' LIMIT 1";
			try {
				if($result = $this->pdo->query($sql)->fetchAll()) {
					return array("error"=>"Failed Registered");
					} else {
	   
				   $sql = "INSERT INTO client_accounts (User_username, User_email, User_password) VALUES (?, ?, ?)";
				   $sql = $this->pdo->prepare($sql);
				   
				   $sql->execute([
					   $d->username,
					   $d->email,
					   $this->encrypt_password($d->password)
				   ]);
					}
					   $last_id = $this->pdo->lastInsertId();
					   $isdeleted = 'F';
					   $sql = "INSERT INTO 
					   client_tbl ( U_id, Client_name, Client_gender, Client_age, Client_birthdate, Client_address, Client_phone, Client_weight, Client_height, Client_bloodtype, Client_healthcondition, Client_healthsymptoms, Client_healthmedication, Client_healtallergies, Client_healthtobacco, Client_drughistory, Client_alcoholhistory, IsDeleted) 
					   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
					   $sql = $this->pdo->prepare($sql);
					   $sql->execute([
						   $last_id,
						   $d->name,
						   $d->gender,
						   $d->age,
						   $d->birthdate,
						   $d->address,
						   $d->phone,
						   $d->weight,
						   $d->height,
						   $d->bloodtype,
						   $d->condition,
						   $d->symptoms,
						   $d->medication,
						   $d->allergy,
						   $d->tobacco,
						   $d->drug,
						   $d->alcohol,
						   $isdeleted
					   ]);
					   return array("success"=>"Sucessfully Registered");
						}
					catch (PDOException $error) {
					echo 'Connection failed: ' .$error->getMessage();
				}
			}
		}
	?>

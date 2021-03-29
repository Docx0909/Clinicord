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

		public function login($param) {
			$un = $param->param1;
			$pw = $param->param2;
			
			
			$sql = "SELECT * FROM clinicord_accounts  WHERE Doctor_username ='$un' LIMIT 1";
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



			public function add_account($d) {
			
				$sql = "SELECT * FROM clinicord_accounts WHERE Doctor_email='$d->email' OR Doctor_username='$d->username' LIMIT 1";
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
		
			}
		}
	?>
	
	
	




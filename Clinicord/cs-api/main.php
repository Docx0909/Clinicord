<?php
	require_once("./config/database.php");
	require_once("./models/get.php");
	require_once("./models/post.php");
	require_once("./models/auth.php");

	$db = new Connection();
	$pdo = $db->connect();

	$get = new Get($pdo);
	$post = new Post($pdo);
	$auth = new Auth($pdo);

	 function encrypt_password($pword) {
		$hashFormat="$2y$10$";
		$saltLength=22;
		$salt= generate_salt($saltLength);
		return crypt($pword, $hashFormat.$salt);
	}

	 function generate_salt($len) {
		$urs=md5(uniqid(mt_rand(), true));
		$b64String = base64_encode($urs);
		$mb64String = str_replace('+', '.', $b64String);
		return substr($mb64String, 0, $len);
	}

	 function pword_check($pword, $existingHash) {
		$hash=crypt($pword, $existingHash);
		if($hash===$existingHash) {
			return true;
		} 
		return false;
	}

	$req = [];
	if(isset($_REQUEST['request'])) {
		$req = explode('/', rtrim($_REQUEST['request'], '/'));
	} else {
		$req = array("errorcatcher");
	}



	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			switch ($req[0]) {
				case 'getclients':
					echo json_encode($get->get_clients());
				break;
				case 'getclientsched':
					echo json_encode($get->get_clients_appoint());
				break;

				case 'getdoctors':
					echo json_encode($get->get_doctors());
				break;

				case 'getappointments':
					echo json_encode($get->get_appoint());
				break;

				case 'getprofile':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($get->get_profile($d));
				break;

				case 'getuserappointments':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($get->get_upcoming($d));
				break;

				case 'getappointmentstatus':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($get->get_past($d));
				break;
				# End GET Operations
				


				# POST Operations
				case 'addclients':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->insert_client($d));
				break;

				case 'adddoctors':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->insert_doctor($d));
				break;

				case 'addappointments':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->insert_appointment($d));
				break;

				case 'userappointments':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->insert_user_appointment($d));
				break;


				case 'updateclients':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->update_client($d));
				break;

				case 'updatedoctors':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->update_doctor($d));
				break;
				case 'updateappointments':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->update_appointment($d));
				break;
				case 'userupdateappointments':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->userupdate_appointment($d));
				break;


				case 'deleteclients':
					$d = json_decode(file_get_contents("php://input")); 
					// print_r($d);
					echo json_encode($post->delete_client($d));
				break;

				case 'deletedoctors':
					$d = json_decode(file_get_contents("php://input")); 
					// print_r($d);
					echo json_encode($post->delete_doctor($d));
				break;

				case 'deleteappointments':
					$d = json_decode(file_get_contents("php://input")); 
					// print_r($d);
					echo json_encode($post->delete_appointment($d));
				break;

				case 'userdeleteappointments':
					$d = json_decode(file_get_contents("php://input")); 
					// print_r($d);
					echo json_encode($post->userdelete_appointment($d));
				break;



				//AUTH METHOD
				case 'changepassword':
					// $d = json_decode(file_get_contents("php://input")); 
					// print_r($d);
					echo json_encode($auth->encrypt_password('Aa1234567'));
				break;

				case 'login':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($auth->login($d));
				break;

				// case 'addaccounts':
				// 	$d = json_decode(file_get_contents("php://input")); 
				// 	echo json_encode($auth->admin_registration($d));
				// break;

				case 'addaccounts':
					if (@$_POST["username"] && 	is_uploaded_file($_FILES["profile_pic"]["tmp_name"]  )){
						
						$username = @$_POST["username"];
						$email    = @$_POST["email"];
						$name 	  = @$_POST["name"];
						$gender   = @$_POST["gender"];
						$age      = @$_POST["age"] ;
						$birthdate = @$_POST["birthdate"];
						$address  = @$_POST["address"];
						$phone    = @$_POST["phone"];
						$weight   =  @$_POST["weight"];
						$height   = @$_POST["height"];
						$bloodtype= @$_POST["bloodtype"];
						$medication = @$_POST["medication"];
						$condition = @$_POST["condition"];
						$symptoms = @$_POST["symptoms"];
						$allergy  =  @$_POST["allergy"];
						$tobacco  = @$_POST["tobacco"];
						$drug 	  =  @$_POST["drug"];
						$alcohol  = @$_POST["alcohol"];
						$role  = @$_POST["role"];

						$specialty = @$_POST["specialization"];
						
						$isdeleted = 'F';
						$tmp_file = $_FILES["profile_pic"]["tmp_name"];
						$img_name = $_FILES["profile_pic"]["name"];
					   
						$exten = explode(".", $img_name);
		
						$d = new DateTime('NOW');
						$img_name = $d->format(DateTime::ISO8601).'.png';
						$img_name = str_replace(":","", $img_name);
						$img_name = str_replace("-","", $img_name);
		
						$upload_dir = "./images/".$img_name;

						
						$newpass = encrypt_password(@$_POST["password"]);
						// print($newpass);

						$sql = "SELECT * FROM accounts_tbl WHERE User_email= '$email' OR User_username= '$username' LIMIT 1";
			
						if ($role == "client"){
							try {
								if($result = $pdo->query($sql)->fetchAll()) {
											$response["message"] = "Failed Registered";
											} else {
												$sql = "INSERT INTO  accounts_tbl (User_username, User_email, User_password, User_image, User_role) VALUES ('{$username}','{$email}', '{$newpass}', '{$img_name}','{$role}')";
						
												if(move_uploaded_file($tmp_file, $upload_dir) && $pdo->query($sql)){
													$response['message'] = "UPLOAD SUCCEED";
													$response["status"] = 200; 
						
						
															$last_id = $pdo->lastInsertId();
														
															$sql = "INSERT INTO client_tbl ( U_id, Client_name, Client_gender, Client_age, Client_birthdate, Client_address, Client_phone, Client_weight, Client_height, Client_bloodtype, Client_healthcondition, Client_healthsymptoms, Client_healthmedication, Client_healtallergies, Client_healthtobacco, Client_drughistory, Client_alcoholhistory, IsDeleted) 
															VALUES ('{$last_id}', '{$name}', '{$gender}', '{$age}', '{$birthdate}', '{$address}', '{$phone}', '{$weight}', '{$height}', '{$bloodtype}', '{$condition}', '{$symptoms}', '{$medication}', '{$allergy}', '{$tobacco}', '{$drug}', '{$alcohol}', '{$isdeleted}')";
						
															if($pdo->query($sql)){
																$response['message'] = "Sucessfully Registered";
																$response["status"] = 200; 
															}
															else{
																$response['message'] = "Failed to Register";
																$response["status"] = 404; 
															}
												}
												else{
													$response["message"] = "Upload Failed";
													$response["status"] = 404; 
												}
	
											}
				   
										} catch (PDOException $error) {
										echo 'Connection failed: ' .$error->getMessage();
									}
	
							
						}elseif($role == "doctor"){
							try {
								if($result = $pdo->query($sql)->fetchAll()) {
											$response["message"] = "Failed Registered";
											} else {
												$sql = "INSERT INTO  accounts_tbl (User_username, User_email, User_password, User_image, User_role) VALUES ('{$username}','{$email}', '{$newpass}', '{$img_name}','{$role}')";
						
												if(move_uploaded_file($tmp_file, $upload_dir) && $pdo->query($sql)){
													$response['message'] = "UPLOAD SUCCEED";
													$response["status"] = 200; 
						
						
															$last_id = $pdo->lastInsertId();
														
															$sql = "INSERT INTO doctor_tbl ( U_id, Doctor_name, Doctor_specialty, Doctor_gender, Doctor_age, Doctor_birthdate, Doctor_address, Doctor_phone,IsDeleted) 
															VALUES ('{$last_id}', '{$name}', '{$specialty}','{$gender}', '{$age}', '{$birthdate}', '{$address}', '{$phone}', '{$isdeleted}')";
						
															if($pdo->query($sql)){
																$response['message'] = "Sucessfully Registered";
																$response["status"] = 200; 
															}
															else{
																$response['message'] = "Failed to Register";
																$response["status"] = 404; 
															}
												}
												else{
													$response["message"] = "Upload Failed";
													$response["status"] = 404; 
												}
	
											}
				   
										} catch (PDOException $error) {
										echo 'Connection failed: ' .$error->getMessage();
									}
	
							
						}else{
							$response["message"] = "Role not found";
							$response["status"] = 400; 
						}

						}else{
							$response["message"] = "Invalid Request";
							$response["status"] = 400; 
						}
		
				echo json_encode($response);
				break;
				# End POST Operations
				
				default:
					echo "no endpoint";
				break;
			}
		break;

		default:
			echo "prohibited";
		break;
	}

?>
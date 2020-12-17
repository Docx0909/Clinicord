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

				case 'getdoctors':
					echo json_encode($get->get_doctors());
				break;

				case 'getappointments':
					echo json_encode($get->get_appoint());
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

				case 'updateclients':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->update_client($d));
				break;

				case 'updatedoctors':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($post->update_doctor($d));
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

				case 'addaccounts':
					$d = json_decode(file_get_contents("php://input")); 
					echo json_encode($auth->add_account($d));
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

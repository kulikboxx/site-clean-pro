<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('pl', 'phpmailer/language/');
	$mail->IsHTML(true);

	$mail->setFrom($_POST['email']);

	$mail->addAddress('kontakt@silverwebgroup.pl');

	$mail->Subject = 'Wiadomość ze strony CleanPro - kalkulator';
	
	if(trim(!empty($_POST['package']))){
		$body.='<p><strong>Pakiet:</strong> '.$_POST['package'].'</p>';
	}
	if(trim(!empty($_POST['service']))){
		$body.='<p><strong>Usługa:</strong> '.$_POST['service'].'</p>';
	}
	if(trim(!empty($_POST['office']))){
		$body.='<p><strong>Metraż:</strong> '.$_POST['office'].'</p>';
	}
	if(trim(!empty($_POST['house']))){
		$body.='<p><strong>Metraż:</strong> '.$_POST['house'].'</p>';
	}
	if(trim(!empty($_POST['apartment']))){
		$body.='<p><strong>Metraż:</strong> '.$_POST['apartment'].'</p>';
	}
	if(trim(!empty($_POST['repair']))){
		$body.='<p><strong>Metraż:</strong> '.$_POST['repair'].'</p>';
	}
	if(trim(!empty($_POST['window']))){
		$body.='<p><strong>Dodatkowa usługa:</strong> '.$_POST['window'].'</p>';
	}
	if(trim(!empty($_POST['rug']))){
		$body.='<p><strong>Dodatkowa usługa:</strong> '.$_POST['rug'].'</p>';
	}
	if(trim(!empty($_POST['upholstery']))){
		$body.='<p><strong>Dodatkowa usługa:</strong> '.$_POST['upholstery'].'</p>';
	}
	if(trim(!empty($_POST['covering']))){
		$body.='<p><strong>Dodatkowa usługa:</strong> '.$_POST['covering'].'</p>';
	}
	if(trim(!empty($_POST['ironing']))){
		$body.='<p><strong>Dodatkowa usługa:</strong> '.$_POST['ironing'].'</p>';
	}
	if(trim(!empty($_POST['total']))){
		$body.='<p><strong>Ogółem:</strong> '.$_POST['total'].'</p>';
	}
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Imię i nazwisko:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Telefon:</strong> '.$_POST['phone'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['address']))){
		$body.='<p><strong>Adres:</strong> '.$_POST['address'].'</p>';
	}
	if(trim(!empty($_POST['agreement']))){
		$body.='<p><strong>Zgoda:</strong> '.$_POST['agreement'].'</p>';
	}

	$mail->Body = $body;

	if (!$mail->send()) {
		$message = 'Wystąpił jakiś błąd! Odśwież stronę i spróbuj jeszcze raz...';
	} else {
		$message = 'Dziękujemy! Formularz został wysłany.';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>
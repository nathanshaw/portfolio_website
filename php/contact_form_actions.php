<?php

#Receive user input
$email_address = $_POST['email'];
$subject = $_POST['subject'];
$name = $_POST['name'];
$message = $_POST['message'];

#Filter user input
function filter_email_header($form_field) {  
return preg_replace('/[nr|!/<>^$%*&]+/','',$form_field);
}

$email_address  = filter_email_header($email_address);

#Send email
$headers = "From: $name $email_address \r\n";
$sent = mail('nathanshawsemail@gmail.com', $subject, $message, $headers);
?>
<?php
$errorMSG = "";

if (empty($_POST["firstname"])) {
    $errorMSG = "First name is required ";
} else {
    $firstname = $_POST["firstname"];
}

if (empty($_POST["lastname"])) {
    $errorMSG = "Last name is required ";
} else {
    $lastname = $_POST["lastname"];
}

if (empty($_POST["email"])) {
    $errorMSG = "Email is required ";
} else {
    $email = $_POST["email"];
}

if (empty($_POST["message"])) {
    $errorMSG = "Message is required ";
} else {
    $message = $_POST["message"];
}

$EmailTo = "yourname@domain.com";
$Subject = "New message from Bono landing page";

// prepare email body text
$Body = "";
$Body .= "First name: ";
$Body .= $firstname;
$Body .= "\n";
$Body .= "Last name: ";
$Body .= $lastname;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);
// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}
?>
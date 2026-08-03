<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $mobile = filter_var($_POST['mobile'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }
    
    // Set email parameters
    $to = "rm@tatvmgroup.com"; // Replace with your email address
    $subject = "You have received new enquiry from Tatvm website.";
    
    // Create email body
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Mobile: $mobile\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Message:\n$message\n";
    
    // Set additional headers
    $headers = "From:enquiry@tatvmgroup.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Try to send email
    try {
        if (mail($to, $subject, $email_body, $headers)) {
            echo "done";
        } else {
            throw new Exception("Failed to send email");
        }
    } catch (Exception $e) {
        echo "Sorry, an error occurred while sending your message. Please try again later.";
        // You might want to log the error here
        error_log("Mail error: " . $e->getMessage());
    }
} else {
    // If someone tries to access this script directly
    die("Direct access not allowed");
}
?>
<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'Exception.php';
    require 'PHPMailer.php';
    require 'SMTP.php';

    $name = $_POST['name'];
    $contact = $_POST['contact'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host = 'ssl://smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->CharSet = 'UTF-8';
        $mail->Username = '';
        $mail->Password = '';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
    
        $mail->setFrom('', 'ISPACE');
        $mail->addAddress('', 'Joe User');     // Add a recipient
    
        $mail->isHTML(true);
        $mail->Subject = 'Заявка';
        $mail->Body    = '
                            <h1 style="color: #F4522F;">ISPACE</h1>
                            <h2 style="color: #021a58;">Заявка</h2>
                            <p style="color: #021a58; background: #f0f0f0; margin: 0; padding: 20px;"><b>Имя:</b>' . $name .'</p>
                            <p style="color: #021a58; background: #f9f9f9; margin: 0; padding: 20px;"><b>Тел./Адрес эл.почты:</b> ' . $contact . '</p>
                            <p style="color: #021a58; background: #f0f0f0; margin: 0; padding: 20px;"><b>Тел.:</b>' . $phone . '</p>
                            <p style="color: #021a58; background: #f9f9f9; margin: 0; padding: 20px;"><b>Адрес эл. почты:</b>' . @email .'</p>
                            <p style="color: #021a58; background: #f0f0f0; margin: 0; padding: 20px;"><b>Сообщение:</b>' . $message . '</p>';
    
        $mail->send();

        echo 'success';

    } catch (Exception $e) {

        echo 'failed';

    }

?>
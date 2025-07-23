<?php 
   $dsn="mysql:host=localhost;dbname=mydatabase2025";
   $dbusername="root";
   $dbpassword="";


   try{
    $pdo=new PDO($dsn,$dbusername,$dbpassword);
    echo"CONNECTED TO THE DATABASE";
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   }catch(PDOException $e){
    echo"CONNECTION FAILED". $e->getMessage();
   }

?>

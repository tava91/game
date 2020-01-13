<?php 

$_POST;
$fp = fopen(__DIR__ .'/DB'.'/'.$_POST["Name"].'/character.json', 'w');
fwrite($fp, json_encode($_POST));
fclose($fp);
?> 
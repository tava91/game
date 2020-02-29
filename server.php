<?php header('Access-Control-Allow-Origin: *'); ?>

<?php 
/*
if($_SERVER['REQUEST_METHOD'] == "GET") {

  header('Content-Type: text/plain');
  echo "This HTTP resource is designed to handle POSTed XML input";
  echo "from arunranga.com and not be retrieved with GET"; 

} elseif($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
  // Tell the Client we support invocations from arunranga.com and 
  // that this preflight holds good for only 20 days

  if($_SERVER['HTTP_ORIGIN'] == "http://127.0.0.1:5500/") {
    header('Access-Control-Allow-Origin: http://127.0.0.1:5500/');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: X-PINGARUNER');
    header('Access-Control-Max-Age: 1728000');
    header("Content-Length: 0");
    header("Content-Type: text/plain");
    //exit(0);
  } else {
    header("HTTP/1.1 403 Access Forbidden");
    header("Content-Type: text/plain");
    echo "You cannot repeat this request";
  }

} elseif($_SERVER['REQUEST_METHOD'] == "POST") {
  // Handle POST by first getting the XML POST blob, 
  // and then doing something to it, and then sending results to the client
 
  if($_SERVER['HTTP_ORIGIN'] == "http://127.0.0.1:5500/") {
    $postData = file_get_contents('php://input');
    $document = simplexml_load_string($postData);
    
    // do something with POST data

    $ping = $_SERVER['HTTP_X_PINGARUNER'];
         
    header('Access-Control-Allow-Origin: http://127.0.0.1:5500/');
    header('Content-Type: text/plain');
    //echo // some string response after processing
  } else {
    die("POSTing Only Allowed from arunranga.com");
  }
} else {
    die("No Other Methods Allowed");
}
*/
?>
<?php 

function message($label,$msg){
    if(is_object($msg))
     echo '<p>obj=> '.$label.': '.json_encode($msg).'</p><br>';
    if(is_null($msg))
      echo '<p>null=> '.$label.': '.var_dump($msg).'</p><br>';
    if(is_string($msg))
      echo '<p>string=> '.$label.': '.$msg.'</p><br>';
    if(is_array($msg))
      echo '<p>arry=> '.$label.': '.var_dump($msg).'</p><br>';
}

$_POST                = json_decode(file_get_contents('php://input'), true);
$basePath             = __DIR__ ;
$dir                  = '/DB'.'/';
$thisDir              = $_POST["Name"].'/';
$bkDir                = '/backup'.'/';
$date                 = join("",split("-",date('Y-m-d')));
$time                 = join("",split("-",date('h-m-s')));
$filename             = 'character';
$fileext              = '.json';
$newname              = $filename.'-'.$date.'-'.$time;
$toUpdateFile         = $basePath.$dir.$thisDir.$filename.$fileext;
$toBackupFile         = $basePath.$dir.$thisDir.$bkDir.$newname.$fileext;
$filesList            = scandir($basePath.$dir.$thisDir.$bkDir);


message('post json',$_POST);
message('files list',$filesList);
message('path',$basePath.$dir.$thisDir.$filename.$fileext);

//se la cartella del pg non esiste la creo
if(!is_dir($basePath.$dir.$thisDir)){
  mkdir($basePath.$dir.$thisDir, true);
}
//se la cartella backup non esiste dentro la cartella del pg, la creo
if(!is_dir($basePath.$dir.$thisDir.$bkDir)){
  mkdir($basePath.$dir.$thisDir.$bkDir, true);
}


//creo il file
file_put_contents($toUpdateFile, json_encode($_POST));

//backappo il file
if (!copy($toUpdateFile, $toBackupFile)) {
  message("copia $file...\n",'fail!');
}
else{
  message('copia file',"success!");
}

//se la cartella backup continene più di 30 file , cancello i primi 15
if($filesList[31]){
  $i = 0;
  while ($i <= 17) {
    unlink( $basePath.$dir.$thisDir.$bkDir.$filesList[$i]);
      $i++; 
  }
}

?>

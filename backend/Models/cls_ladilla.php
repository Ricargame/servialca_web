<?php
date_default_timezone_set('America/Caracas');
require_once("cls_db.php");

abstract class cls_ladilla extends cls_db
{
    protected $id;

    public function __construct()
    {
        parent::__construct();
    }

    public function ladilla()
{
    $sql = $this->db->prepare("SELECT vip FROM poliza WHERE poliza_id = ?");
    $sql->execute([$this->id]);
    $datos = $sql->fetch(PDO::FETCH_ASSOC);
    
    if($datos['vip'] == 1){
        $sql = $this->db->prepare("UPDATE poliza SET vip = 0 WHERE poliza_id = ?");
        $sql->execute([$this->id]);
        return true;
    } else {
        $sql = $this->db->prepare("UPDATE poliza SET vip = 1 WHERE poliza_id = ?");
        $sql->execute([$this->id]);
        return true;
    }
}

}
?>
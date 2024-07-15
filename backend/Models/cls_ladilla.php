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
    if ($datos['vip'] == 0) {
        $sql = $this->db->prepare("UPDATE poliza SET vip = 1 WHERE poliza_id = ?");
        $sql->execute([$this->id]);
        return true;
    }
    if($datos['vip'] == 1){
        $sql = $this->db->prepare("UPDATE poliza SET vip = 2 WHERE poliza_id = ?");
        $sql->execute([$this->id]);
        return true;
    } else {
        $sql = $this->db->prepare("UPDATE poliza SET vip = 0 WHERE poliza_id = ?");
        $sql->execute([$this->id]);
        return true;
    }
}
public function cantidadContratos(){
    $sql = $this->db->prepare("SELECT MAX(poliza_id) AS max_poliza_id FROM poliza");
    $sql->execute();
    $resultado = $sql->fetch(PDO::FETCH_ASSOC);
    return $resultado;
}
public function reporte($desde, $hasta) {
    $sql = $this->db->prepare("SELECT 
        usuario.usuario_nombre, 
        SUM(debitocredito.nota_monto) AS total_nota_monto, 
        SUM(coberturas.totalPagar) AS total_totalPagar
    FROM debitocredito 
    INNER JOIN usuario ON usuario.usuario_id = debitocredito.usuario_id
    INNER JOIN poliza ON poliza.debitoCredito = debitocredito.nota_id
    INNER JOIN coberturas ON coberturas.cobertura_id = poliza.cobertura_id
    WHERE debitocredito.nota_fecha BETWEEN ? AND ? 
    AND usuario.usuario_nombre IS NOT NULL 
    GROUP BY usuario.usuario_nombre");
    $sql->execute([$desde, $hasta]);
    $dato = $sql->fetchAll(PDO::FETCH_ASSOC);    
    return $dato;
}
}
?>
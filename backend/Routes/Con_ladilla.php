<?php
require_once("./Models/cls_ladilla.php");

class Con_ladilla extends cls_ladilla
{

    public function __construct()
    {
        parent::__construct();
        $this->id = isset($_POST["id"]) ? $_POST["id"] : null;
    }


    public function update()
    {
        $resultado = $this->ladilla();
        // Response() debería ser definido o reemplazado por otro método de respuesta
        Response($resultado, 200);
    }

}
?>
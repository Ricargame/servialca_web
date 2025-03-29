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
     public function cantidad() {
        $resultado = $this->cantidadContratos();
        Response($resultado,200);
    }
    public function totalReport() {
        $resultado = $this->reporte($_GET['desde'], $_GET['hasta']);
        Response($resultado,200);
    }
    public function eliminarRCv() {
        $resultado = $this->esconderRcv($_GET['id']);
        Response($resultado,200);
    }
    public function ConsultarTodos()
  {
    $resultado = $this->GetAll();
    Response($resultado, 200);
  }
  public function ConsultarTodosDeudodres()
  {
    $resultado = $this->getAllDeudores();
    Response($resultado, 200);
  }
  public function registrarDeuda() {
      $resultado = $this->registrarDeudores($_POST['ID'], $_POST['Monto'], $_POST['Desde'], $_POST['Hasta']);
      Response($resultado, 200);
  }

}
?>

<?php
require_once("./Models/cls_bot.php");

class Con_bot extends cls_bot
{

    public function __construct()
    {
        parent::__construct();
        $this->id = isset($_POST["ID"]) ? $_POST["ID"] : null;
        $this->estatus = isset($_POST["Estatus"]) ? $_POST["Estatus"] : null;
    }

    public function status()
    {
        $resultado = $this->ChangeStatus();
        Response($resultado, 200);
    }

    public function ConsultarUno()
    {
        $resultado = $this->GetOne();
        Response($resultado, 200);
    }

    public function ConsultarTodos()
    {
        $resultado = $this->GetAll();
        Response($resultado, 200);
    }

    public function botActivar()
    {
        $resultado = $this->activate();
        Response($resultado, 200);
    }
}

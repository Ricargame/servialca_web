<?php
class Con_reporte 
{
    public function reporteBauche() {
        include("Con_reporteBauche.php");
    }
    public function reporteGrua(){
        include("Con_reporteGrua.php");
    }
    public function reporteMedico(){
        include("Con_reporteMedico.php");
    }

    public function reporteRCV(){
        include("Con_reporteRCV.php");
    }

    public function reporteWeb(){
        include("Con_reporteWeb.php");
    }
    public function reporteWebEU(){
        include("Con_reporteWebEU.php");
    }
    public function reporteCarnet(){
        include("Con_reporteCarnet.php");
    }

    public function reporteIngresoEgreso(){
        include("Con_reporteVendedores.php");
    }

    public function reporteLicencia(){
        include("Con_reporteLicencia.php");
    }

    public function reporteGeneral(){
        include("Con_reporteGeneral.php");
    }

    public function reporteSelect(){
        include("Con_reporteSelect.php");
    }
    
    public function reporteVendedoresUno() {
        include('Con_reporteVendedoresUno.php');
    }
    public function reporteNuevo(){
        include('Con_reporteNuevo.php');
    }
    public function reporteDocumento(){
        include('Con_reporteDocumento.php');
    }
    public function reporteMedicoPruebaFunction(){
        include('Con_reporteMedicoPrueba.php');
    }
    public function reporteTipoVehiculo(){
        include('Con_reporteTipoVehiculo.php');
    }
    public function reporteServicio(){
        include('Con_reporteServicio.php');
    }
}
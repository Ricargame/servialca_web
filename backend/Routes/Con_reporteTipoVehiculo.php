<?php
include_once("./FPDF/fpdf.php");
include_once("./Models/cls_tipo_vehiculo.php");

class Modal extends cls_tipo_vehiculo 
{
}
$a = new Modal();
$datos = $a->reporte($_GET['contrato']); // Obtenemos los datos de la base de datos
class PDF extends FPDF
 {
     private $datos;
     public function __construct($datos)
     {
         parent::__construct("P", "mm", "A4");
         $this->datos = $datos;
     }
     public function Header()
     {
         // Imágenes de fondo
         $this->Image("./Img/1.jpg", 0, 0, 210, 45);
         $this->Image("./Img/2.jpg", 0, 38, 205, 240);
     }

     public function Footer()
     {
         $this->Image("./Img/3.jpg", 0, 277, 216, 20);
     }

     public function generarTabla()
     {
         $this->SetFont('Arial', '', 8);
         $this->SetY(50);

         $pageWidth = $this->GetPageWidth();
         $numColumns = 4;
         $cellWidth = $pageWidth / ($numColumns + 1);
         $tableWidth = $cellWidth * $numColumns;
         $tableX = ($pageWidth - $tableWidth) / 2;
         $this->SetX($tableX - 7.4);

         // Encabezados
         $this->SetFillColor(229, 57, 53);
         $this->Cell($cellWidth, 10, utf8_decode('N°'), 1, 0, 'C', true);
         $this->Cell($cellWidth, 10, utf8_decode('Tipo de Vehiculo'), 1, 0, 'C', true);
         $this->Cell($cellWidth, 10, utf8_decode('Tipo de Contrato'), 1, 0, 'C', true);
         $this->Cell($cellWidth, 10, utf8_decode('Precio'), 1, 0, 'C', true);
         $this->Ln(10);

         // Datos de la tabla
         $this->SetFillColor(255, 255, 255);
         if (is_array($this->datos)) {
             foreach ($this->datos as $fila) {
                 $this->SetX($tableX - 7.4);
                 $this->Cell($cellWidth, 10, $fila["precio_id"], 1, 0, "C", true);
                 $this->Cell($cellWidth, 10, $fila["tipoVehiculo_nombre"], 1, 0, "C", true);
                 $this->Cell($cellWidth, 10, $fila["contrato_nombre"], 1, 0, "C", true);
                 $this->Cell($cellWidth, 10, $fila["precio_monto"] , 1, 0, "C", true);
                 $this->Ln(10);
             }
         }
     }
 }

// // Obtener datos

// // Crear el PDF con los datos obtenidos
 $pdf = new PDF($datos); // Pasamos los datos al constructor de PDF
 $pdf->AddPage();
 $pdf->generarTabla();
 $pdf->Output();

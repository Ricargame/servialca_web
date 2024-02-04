<?php
include_once("./FPDF/fpdf.php");
include_once("./Models/cls_hotel.php");
class Reporte extends cls_hotel
{
}
$rp = new Reporte();
$datos = $rp->GetReporte($_GET["Desde"], $_GET["Hasta"]);

class PDF extends FPDF
{
    public function __construct()
    {
        parent::__construct("L", "mm", "A4");
    }

    public function Header()
    {
        $this->Image("./Img/heade.jpg", 0, 0, 300, 40, "JPG");
    }

    public function Footer()
    {
        $this->Image("./Img/footer.jpg", 0, 190, 300, 22, "JPG");
    }
}
$pdf = new PDF();
$pdf->AddPage();
$pdf->SetFont("Arial", "B", 12);
$pdf->SetY(40);
$pdf->SetX(190);
$pdf->Cell(0, 10, "Desde: " . date("d-m-Y", strtotime($_GET["Desde"])), 0, 1, "R");
$pdf->Cell(0, 10, "Hasta: " . date("d-m-Y", strtotime($_GET["Hasta"])), 0, 1, "R");
$pdf->Ln(10);
$pageWidth = $pdf->GetPageWidth();

// Número de columnas de la tabla
$numColumns = 11;

// Ancho de cada celda
$cellWidth = $pageWidth / ($numColumns + 1); // Se suma 1 para dar espacio adicional entre las celdas

// Obtener el ancho total de la tabla
$tableWidth = $cellWidth * $numColumns;

// Calcular la posición x para centrar la tabla
$tableX = ($pageWidth - $tableWidth) / 2;

// Establecer la posición x de la celda inicial de la tabla
$pdf->SetFillColor(229, 57, 53); // Rojo más intenso
$pdf->Cell($cellWidth + 10, 10, utf8_decode('Fecha de llegada'), 1, 0, 'C', true);
$pdf->Cell($cellWidth + 10, 10, utf8_decode('Hora de llegada'), 1, 0, 'C', true);
$pdf->Cell($cellWidth + 10, 10, utf8_decode('Hora de salida'), 1, 0, 'C', true);
$pdf->Cell($cellWidth+2, 10, utf8_decode('Cédula'), 1, 0, 'C', true);
$pdf->Cell($cellWidth + 10, 10, utf8_decode('Nombre'), 1, 0, "C", true);
$pdf->Cell($cellWidth + 10, 10, utf8_decode('Apellido'), 1, 0, "C", true);
$pdf->Cell($cellWidth, 10, utf8_decode('Placa'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, utf8_decode('Marca'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, utf8_decode('Modelo'), 1, 0, 'C', true);
$pdf->Ln(10);

$pdf->SetFillColor(255, 255, 255);
$pdf->SetFont("Arial", "B", 9);
foreach ($datos as $fila) {

    $pdf->Cell($cellWidth + 10, 10, date("d-m-Y", strtotime("fecha_llegada_hospedaje")), 1, 0, "C", true);
    $pdf->Cell($cellWidth + 10, 10, $fila["hora_llegada_hospedaje"], 1, 0, "C", true);
    $pdf->Cell($cellWidth + 10, 10, $fila["hora_salida_hospedaje"], 1, 0, "C", true);
    $pdf->Cell($cellWidth + 2, 10, $fila["cliente_cedula"], 1, 0, "C", true);
    $pdf->Cell($cellWidth + 10, 10, $fila["cliente_nombre"], 1, 0, "C", true);
    $pdf->Cell($cellWidth + 10, 10, $fila["cliente_apellido"], 1, 0, "C", true);
    $pdf->Cell($cellWidth , 10, $fila["vehiculo_placa"], 1, 0, "C", true);
    $pdf->Cell($cellWidth , 10, $fila["marca_nombre"], 1, 0, "C", true);
    $pdf->Cell($cellWidth , 10, $fila["modelo_nombre"], 1, 0, "C", true);

    $pdf->Ln(10);
}

$pdf->Output();

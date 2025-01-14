<?php
include_once("./FPDF/fpdf.php");
include_once("./Models/cls_poliza.php");

class Reporte extends cls_poliza
{
}

class PDF extends FPDF
{
    private $datos;
    private $generado;
    private $generadoBs;

    public function __construct($datos, $generado, $generadoBs)
    {
        parent::__construct("P", "mm", "A4");

        $this->datos = $datos;
        $this->generado = $generado;
        $this->generadoBs = $generadoBs;
    }

    public function Header()
    {
        $this->Image("./Img/1.jpg", 0, 0, 210, 45);
        $this->Image("./Img/2.jpg", 0, 38, 205, 240);

        if (!empty($this->datos)) {
            $this->SetY(20);
            $this->SetX(160);
            $this->SetFont("Arial", "B", 12);
            $this->Cell(0, 10, "Reporte de: " . $this->datos[0]["sucursal_nombre"], 0, 1, "R");

            $desde = isset($_GET["Desde"]) ? $_GET["Desde"] : '';
            $hasta = isset($_GET["Hasta"]) ? $_GET["Hasta"] : '';
            $this->Cell(0, 10, "Desde: " . date("d-m-Y", strtotime($desde)) . "  Hasta: " . date("d-m-Y", strtotime($hasta)), 0, 1, "R");

            $this->SetX(15);
            $this->SetY(20);
            $this->Cell(0, 10, "Total Generado Vendedores: " . $this->generado . " $" . " - " . $this->generadoBs . " Bs", 0, 1, "L");

            $total = $this->generado / 2;
            $totalBs = $this->generadoBs / 2;

            $this->Cell(0, 10, "Total a Transferir: " . $total . " $" . " - " . $totalBs . " Bs", 0, 1, "L");
        }
    }

    public function Footer()
    {
        $this->Image("./Img/3.jpg", 0, 277, 216, 20);
    }
}

$rp = new Reporte();
$datos = $rp->reporteGeneral($_GET["Sucursal"], $_GET["Motivo"], $_GET["Desde"], $_GET["Hasta"]);

$motivo;
if (isset($_GET["Sucursal"]) && ($_GET["Sucursal"] != null && $_GET["Sucursal"] != "")) {
    $motivo = "Reporte de sucursal";
} elseif ($_GET["Motivo"] == 1) {
    $motivo = "Ingresos";
} elseif ($_GET["Motivo"] == 0) {
    $motivo = "Egresos";
} elseif ($_GET["Motivo"] == 2) {
    $motivo = "Ingreso y Egreso";
} else {
    $motivo = $_GET["Motivo"];
}

$generado = 0;
$generadoBs = 0;
$total = 0;
$totalBs = 0;

if (is_array($datos)) {
    foreach ($datos as $fila) {
        $generado += $fila["nota_monto"];
        $generadoBs += $fila["totalPagar"];
    }
}

$total = $generado / 2;
$totalBs = $generadoBs / 2;

$pdf = new PDF($datos, $generado, $generadoBs); // Corregido el paso de parámetros al constructor
$pdf->AddPage();
$pdf->SetFont("Arial", "B", 16);
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 8);
$pdf->SetY(40);
$pageWidth = $pdf->GetPageWidth();

// Número de columnas de la tabla
$numColumns = 6;
$cellWidth = $pageWidth / ($numColumns + 1);
$tableWidth = $cellWidth * $numColumns;
$tableX = ($pageWidth - $tableWidth) / 2;
$pdf->SetX($tableX - 7.4);

$pdf->SetFillColor(229, 57, 53); // Rojo más intenso
$pdf->Cell($cellWidth, 10, utf8_decode('N° de contrato'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, 'Fecha', 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, utf8_decode('Hora'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, utf8_decode('Usuario'), 1, 0, 'C', true);
// $pdf->Cell($cellWidth, 10, utf8_decode("Sucursal"), 1, 0, "C", true);
$pdf->Cell($cellWidth + 15, 10, 'Motivo', 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, 'Monto $', 1, 0, 'C', true);
$pdf->Ln(10);

$pdf->SetFillColor(255, 255, 255);
$tableY = $pdf->GetY();

if (is_array($datos)) {
    foreach ($datos as $fila) {
        $pdf->SetX($tableX - 7.4);

        if ($fila["nota_IngresoEgreso"] === 0) {
            $pdf->SetFillColor(229, 57, 53); // Rojo
        } else {
            $pdf->SetFillColor(255, 255, 255); // Blanco
        }

        $pdf->Cell($cellWidth, 10, $fila["poliza_id"], 1, 0, "C", true);
        $pdf->Cell($cellWidth, 10, date("d-m-Y", strtotime($fila["nota_fecha"])), 1, 0, "C", true);
        $pdf->Cell($cellWidth, 10, $fila["nota_hora"], 1, 0, "C", true);
        $pdf->Cell($cellWidth, 10, utf8_decode($fila["usuario_usuario"]), 1, 0, "C", true);
        // $pdf->Cell($cellWidth, 10, utf8_decode($fila["sucursal_nombre"]), 1, 0, "C", true);
        $pdf->Cell($cellWidth + 15, 10, utf8_decode($fila["nota_motivo"]), 1, 0, "C", true);
        $pdf->Cell($cellWidth, 10, $fila["nota_monto"] . " $", 1, 0, "C", true);
        
        $pdf->Ln(10);
    }
}

$pdf->Output();

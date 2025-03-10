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
    private $yInicial; // Variable para almacenar la posición Y inicial

    public function __construct($datos, $generado, $generadoBs, $pagosMontoBs, $montoRestanteBs)
    {
        parent::__construct("P", "mm", "A4");

        $this->datos = $datos;
        $this->generado = $generado;
        $this->generadoBs = $generadoBs;
         $this->pagosMontoBs =  $pagosMontoBs;
         $this->montoRestanteBs = $montoRestanteBs;
    }

    public function Header()
{
    if ($this->PageNo() == 1) {
        // Imágenes de fondo solo en la primera página
        $this->Image("./Img/1.jpg", 0, 0, 210, 45);
        $this->Image("./Img/2.jpg", 0, 38, 205, 240);
    }

    if (!empty($this->datos) && $this->PageNo() == 1) {
        // Posicionar y establecer fuente
        $this->SetY(20);
        $this->SetX(160);
        $this->SetFont("Arial", "B", 12);

        // Título del reporte
        $this->Cell(0, 10, "Reporte de: " . $this->datos[0]["sucursal_nombre"], 0, 1, "R");

        // Fechas desde/hasta
        $desde = isset($_GET["Desde"]) ? $_GET["Desde"] : '';
        $hasta = isset($_GET["Hasta"]) ? $_GET["Hasta"] : '';
        $this->Cell(0, 10, "Desde: " . date("d-m-Y", strtotime($desde)) . "  Hasta: " . date("d-m-Y", strtotime($hasta)), 0, 1, "R");

        // Posición para los totales
        $this->SetX(15);
        $this->SetY(20);
        $this->Cell(0, 10, "Total Generado Vendedores: " . $this->generado . " $" . " - " . $this->generadoBs . " Bs", 0, 1, "L");
        $this->Cell(0, 10, "", 0, 1, "L");

        // Cálculo de total a transferir
        $total = $this->generado / 2;
        $totalBs = $this->generadoBs / 2;
        $this->Cell(0, 00, "Total a Transferir:" .  $totalBs . " Bs", 0, 1, "L");

        // Guardar la posición actual para los datos del Pago Móvil
        $this->yInicial = $this->GetY();
    }
}


   public function Footer()
{
    if ($this->PageNo() == 1 && !empty($this->datos)) {
        $this->Image("./Img/3.jpg", 0, 277, 216, 20);
    }
}


    public function imprimirPagoMovil()
    {
        // Restaurar la posición debajo de los totales
        $this->SetY($this->yInicial); 

        // Datos del Pago Móvil
        $this->SetTextColor(0, 128, 0); // Verde
        $pagoMovilDatos = "Banco: Banco de Venezuela | Teléfono: 0412-6544855 | Cédula/RIF: V-11078879";
        $this->Cell(0, 10, utf8_decode("Datos del Pago Móvil: " . $pagoMovilDatos), 0, 1, "L");

        // Restaurar color del texto a negro
        $this->SetTextColor(0, 0, 0);
    }
}

$rp = new Reporte();
$datos = $rp->reporteGeneral($_GET["Sucursal"], $_GET["Motivo"], $_GET["Desde"], $_GET["Hasta"]);

$generado = 0;
$generadoBs = 0;
$pagosMontoBs = 0;

if (is_array($datos)) {
    foreach ($datos as $fila) {
        $generado += $fila["nota_monto"];
        $generadoBs += $fila["totalPagar"];
        $pagosMontoBs = $fila["pagos_monto_bs"]; 

    }
}
$montoRestanteBs = 0;
if ($pagosMontoBs > 0) {
    $montoRestanteBs = $generadoBs - $pagosMontoBs;

}

$pdf = new PDF($datos, $generado, $generadoBs, $pagosMontoBs, $montoRestanteBs );
$pdf->AddPage();
$pdf->SetFont("Arial", "B", 16);
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 8);
$pdf->SetY(50);

$pageWidth = $pdf->GetPageWidth();
$numColumns = 6;
$cellWidth = $pageWidth / ($numColumns + 1);
$tableWidth = $cellWidth * $numColumns;
$tableX = ($pageWidth - $tableWidth) / 2;
$pdf->SetX($tableX - 7.4);

$pdf->SetFillColor(229, 57, 53);
$pdf->Cell($cellWidth, 10, utf8_decode('N° de contrato'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, 'Fecha', 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, utf8_decode('Hora'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, utf8_decode('Usuario'), 1, 0, 'C', true);
$pdf->Cell($cellWidth + 15, 10, 'Motivo', 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, 'Monto $', 1, 0, 'C', true);

$pdf->Ln(10);

$pdf->SetFillColor(255, 255, 255);
$tableY = $pdf->GetY();

if (is_array($datos)) {
    foreach ($datos as $fila) {
        $pdf->SetX($tableX - 7.4);

        if ($fila["nota_IngresoEgreso"] === 0) {
            $pdf->SetFillColor(229, 57, 53);
        } else {
            $pdf->SetFillColor(255, 255, 255);
        }

        $pdf->Cell($cellWidth, 10, $fila["poliza_id"], 1, 0, "C", true);
        $pdf->Cell($cellWidth, 10, date("d-m-Y", strtotime($fila["nota_fecha"])), 1, 0, "C", true);
        $pdf->Cell($cellWidth, 10, $fila["nota_hora"], 1, 0, "C", true);
        $pdf->Cell($cellWidth, 10, utf8_decode($fila["usuario_usuario"]), 1, 0, "C", true);
        $pdf->Cell($cellWidth + 15, 10, utf8_decode($fila["nota_motivo"]), 1, 0, "C", true);
        $pdf->Cell($cellWidth, 10, $fila["nota_monto"] . " $", 1, 0, "C", true);
        $pdf->Ln(10);
    }
}

// Imprimir los datos del Pago Móvil después de la tabla
$pdf->imprimirPagoMovil();

$pdf->Output();


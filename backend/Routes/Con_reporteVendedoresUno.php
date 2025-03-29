<?php
include("./FPDF/fpdf.php");
include("./Models/cls_poliza.php");

class MiCliente extends cls_poliza
{
}

$a = new MiCliente();
$datos = $a->Reporte($_GET["Nombre"], $_GET["Desde"], $_GET["Hasta"]);
class PDF extends FPDF
{
    private $showHeader = true; // Bandera para mostrar el encabezado solo en la primera página

    public function __construct()
    {
        parent::__construct("P", "mm", "A4");
    }

    public function Header()
    {
        // Mostrar encabezado solo si la bandera está activada
        if ($this->showHeader) {
            $this->Image("./Img/heade.jpg", 10, 10, 190, 30, "JPG");
            // Desactiva la bandera después de la primera página
            $this->showHeader = false;
        }
    }

    public function Footer()
    {
        $this->SetY(-30);
        $this->Image("./Img/footer.jpg", 10, 277, 190, 15, "JPG");
    }
}


function abreviarNombre($nombre, $apellido)
{
    $nombres = explode(" ", $nombre);
    $totalNombres = count($nombres);

    if ($totalNombres < 1) {
        return $nombre;
    }

    $nombreAbreviado = $nombres[0] . " ";

    if ($totalNombres >= 2 && !empty(trim($nombres[1]))) {
        $nombreAbreviado .= strtoupper(substr($nombres[1], 0, 1)) . ". ";
    }

    $apellidos = explode(" ", $apellido);
    if (count($apellidos) > 0 && !empty(trim($apellidos[0]))) {
        $nombreAbreviado .= $apellidos[0] . " ";
    }

    return trim($nombreAbreviado);
}

$totalDolar = 0;
$totalComisionDolar = 0;
$totalComisionBolivar = 0;
foreach ($datos as $fila) {
    $totalDolar += $fila["nota_monto"];
    $totalComisionDolar += ($fila["nota_monto"] * $fila["roles_comision"]) / 100;
    $totalComisionBolivar += ($fila['totalPagar'] * $fila["roles_comision"]) / 100;
}
$fechaDesde = new DateTime($_GET["Desde"]);
$fechaHasta = new DateTime($_GET["Hasta"]);

// Formatear las fechas en "día-mes-año"
$fechaDesdeFormateada = $fechaDesde->format('d-m-Y');
$fechaHastaFormateada = $fechaHasta->format('d-m-Y');

// Mostrar las fechas formateadas en el PDF
$pdf = new PDF();
$pdf->AddPage();
$pdf->SetFont("Arial", "B", 16);
$pdf->SetY(50);
$pdf->Cell(0, 10, "Reporte de: " . $_GET["Nombre"], 0, 1, "C");
$pdf->SetFont("Arial", "B", 12);
$pdf->Cell(0, 10, "Desde: " . $fechaDesdeFormateada . " Hasta: " . $fechaHastaFormateada, 0, 1, "C");
$pdf->Ln(5);
$pdf->SetFont("Arial", "", 11);
$pdf->Cell(0, 10, "Total Generado: " . number_format($totalDolar, 2) . "$", 0, 1, "L");
$pdf->Cell(0, 10, "Total a Transferir: " . number_format($totalComisionDolar, 2) . " $ " . "   " . number_format($totalComisionBolivar, 2) . " Bs", 0, 1, "L");
$pdf->SetFont("Arial", "B", 10);
$pdf->SetTextColor(0, 128, 0); // RGB: (0, 128, 0)
$pagoMovilDatos = "Banco: Banco de Venezuela | Teléfono: 0412-6544855 | Cédula/RIF: V-11078879";
$pdf->Cell(0, 10, utf8_decode("Datos del Pago Móvil:" . $pagoMovilDatos), 0, 1, "L");
// Restablecer el color del texto a negro para el resto del documento
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont("Arial", "B", 12);

// Tabla de datos
$pdf->SetX(5);
$pdf->SetFillColor(229, 57, 53);
$pdf->SetTextColor(255);
$pdf->Cell(20, 10, utf8_decode('Contrato'), 1, 0, 'C', true);
$pdf->Cell(25, 10, 'Fecha', 1, 0, 'C', true);
$pdf->Cell(30, 10, 'Cliente', 1, 0, 'C', true);
$pdf->Cell(30, 10, 'Sucursal', 1, 0, 'C', true);
$pdf->Cell(35, 10, 'Tipo', 1, 0, 'C', true);
$pdf->Cell(30, 10, 'Monto $', 1, 0, 'C', true);
$pdf->Cell(30, 10, 'Comision $', 1, 0, 'C', true);
$pdf->Ln();

$pdf->SetFont("Arial", "", 8);
$pdf->SetTextColor(0);
foreach ($datos as $fila) {
    $pdf->SetX(5);
    $pdf->Cell(20, 10, utf8_decode($fila["poliza_id"]), 1, 0, 'C');
    $pdf->Cell(25, 10, date("d-m-Y", strtotime($fila["nota_fecha"])), 1, 0, 'C');
    $pdf->Cell(30, 10, utf8_decode(abreviarNombre($fila["cliente_nombre"], $fila["cliente_apellido"])), 1, 0, 'C');
    $pdf->Cell(30, 10, utf8_decode($fila["sucursal_nombre"]), 1, 0, 'C');
    $pdf->Cell(35, 10, utf8_decode($fila["nota_motivo"]), 1, 0, 'C');
    $pdf->Cell(30, 10, number_format($fila["nota_monto"], 2) . "$", 1, 0, 'C');
    $totalComisionDolar = ($fila["nota_monto"] * $fila["roles_comision"]) / 100;
    $pdf->Cell(30, 10, number_format($totalComisionDolar, 2) . "$", 1, 0, 'C');
    $pdf->Ln();
}

$pdf->Output();
?>

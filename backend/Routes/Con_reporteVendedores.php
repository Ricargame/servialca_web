<?php
include("./FPDF/fpdf.php");
include("./Models/cls_ladilla.php");
class MiCliente extends cls_ladilla
{

}
$a = new MiCliente();
$datos = $a->reporte($_GET["Desde"], $_GET["Hasta"]);
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
$pdf->SetFont("Arial", "B", 16);
$pdf->SetY(30);
$pdf->SetX(190);
$pdf->SetFont("Arial", "B", 12);
// $pdf->Cell(0, 10, "Reporte de: " . $_GET["Nombre"], 0, 1, "R");
$pdf->Cell(0, 10, "Desde: " . $_GET["Desde"], 0, 1, "R");
$pdf->Cell(0, 10, "Hasta: " . $_GET["Hasta"], 0, 1, "R");
$pdf->SetX(15);
$pdf->Cell(0, 10, 'Total: ' . $totalDolar . "$", 0, 1, 'L');
$pdf->SetX(15);
$pdf->Ln(10);
$pdf->SetFont('Arial', '', 10);
$pdf->SetY(90);


// Ancho de página
$pageWidth = $pdf->GetPageWidth();

// Número de columnas de la tabla
$numColumns = 5;

// Ancho de cada celda
$cellWidth = $pageWidth / ($numColumns + 1); // Se suma 1 para dar espacio adicional entre las celdas

// Obtener el ancho total de la tabla
$tableWidth = $cellWidth * $numColumns;

// Calcular la posición x para centrar la tabla
$tableX = ($pageWidth - $tableWidth) / 2;

// Establecer la posición x de la celda inicial de la tabla
$pdf->SetX($tableX - 10);

// Establecer el color de fondo de las celdas de encabezado
$pdf->SetFillColor(229, 57, 53); // Rojo más intenso

// Encabezados de la tabla
$pdf->SetX(25);
$pdf->Cell($cellWidth, 10, utf8_decode('Nombre del vendedor'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, utf8_decode('Monto en $'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, utf8_decode('Monto en BS'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, 'Pagado', 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, 'Referencia', 1, 0, 'C', true);
$pdf->Ln(10);
// Restaurar el color de fondo a blanco
$pdf->SetFillColor(255, 255, 255);

// Variable para controlar la posición Y de la tabla
$tableY = $pdf->GetY();

// Imprimir filas de datos
foreach ($datos as $fila) {

$pdf->SetX(25);
    $pdf->Cell($cellWidth, 10, utf8_decode($fila["usuario_nombre"]), 1, 0, 'C', true);
    $pdf->Cell($cellWidth, 10, utf8_decode($fila["total_nota_monto"] * 0.5 . "$"), 1, 0, 'C', true);
    $pdf->Cell($cellWidth, 10, utf8_decode($fila["total_totalPagar"] * 0.5. "BS"), 1, 0, 'C', true);
    $pdf->Cell($cellWidth, 10,"", 1, 0, 'C', true);
    $pdf->Cell($cellWidth, 10, "", 1, 0, 'C', true);
    $pdf->Ln(10);
}

$pdf->Output();

?>
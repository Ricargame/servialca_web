<?php
ob_start();

// Incluir librerías
include("./FPDF/fpdf.php");
include("./Models/cls_ladilla.php");

// Establecer encabezados HTTP
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="reporte.pdf"'); // Inline en lugar de attachment

// Extender la clase cls_ladilla
class MiCliente extends cls_ladilla {
    // Clase extendida de cls_ladilla
}

// Validar y obtener parámetros de la URL
$desde = isset($_GET['Desde']) ? $_GET['Desde'] : '';
$hasta = isset($_GET['Hasta']) ? $_GET['Hasta'] : '';
$nombre = isset($_GET['Nombre']) ? $_GET['Nombre'] : '';

// Crear instancia de MiCliente y obtener datos
$a = new MiCliente();
$resultado = $a->reporte($desde, $hasta);
$datos = $resultado['results'];
$totales_usuario_57 = $resultado['totales_usuario_57'];
class PDF extends FPDF
{
    public function __construct()
    {
        parent::__construct("P", "mm", "A4");
    }

    public function Header()
    {
        $this->Image("./Img/heade.jpg", 0, 0, 1, 1, "JPG");
    }
}

// Crear nuevo PDF en orientación horizontal (L), en milímetros (mm), tamaño A4
$pdf = new PDF("P", "mm", "A4");
$pdf->AddPage();
$pdf->SetFont("Arial", "B", 16);

// Añadir información del reporte
$pdf->SetY(0);
$monto_dolares_57 = number_format($totales_usuario_57['total_nota_monto'] * 0.5, 2);
$monto_bs_57 = number_format($totales_usuario_57['total_totalPagar'] * 0.5, 2);
$pdf->Cell(0, 10, "Monto Acarigua: $monto_dolares_57 $ - $monto_bs_57 BS", 0, 1, "L");
$pdf->SetY(0);
$pdf->SetX(-10);
$pdf->SetFont("Arial", "B", 12);
$pdf->Cell(0, 10, "Desde: $desde - Hasta: $hasta", 0, 1, "R");
$pdf->SetX(15);
$pdf->Ln(10);

// Configurar fuente para el contenido
$pdf->SetFont('Arial', '', 10);
$pdf->SetY(10);

// Ancho de página
$pageWidth = $pdf->GetPageWidth();

// Número de columnas de la tabla
$numColumns = 7;

// Ancho de cada celda
$cellWidth = $pageWidth / ($numColumns + 3); // Se suma 1 para dar espacio adicional entre las celdas

// Obtener el ancho total de la tabla
$tableWidth = $cellWidth * $numColumns;

// Calcular la posición x para centrar la tabla
$tableX = ($pageWidth - $tableWidth) / 2;

// Establecer la posición x de la celda inicial de la tabla
$pdf->SetX(1);
// Establecer el color de fondo de las celdas de encabezado
$pdf->SetFillColor(229, 57, 53); // Rojo más intenso

// Encabezados de la tabla
$pdf->Cell($cellWidth, 10, utf8_decode('N'), 1, 0, 'C', true);
$pdf->Cell($cellWidth + 20, 10, utf8_decode('Usuario'), 1, 0, 'C', true);
$pdf->Cell($cellWidth + 30, 10, utf8_decode('Nombre'), 1, 0, 'C', true);
$pdf->Cell($cellWidth + 5, 10, utf8_decode('Monto en $'), 1, 0, 'C', true);
$pdf->Cell($cellWidth + 5, 10, utf8_decode('Monto en BS'), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, 'Pagado', 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, 'Referencia', 1, 0, 'C', true);
$pdf->Ln(10);

// Restaurar el color de fondo a blanco
$pdf->SetFillColor(255, 255, 255);

// Imprimir filas de datos
$sum_dolares = 0;
$sum_bolivares = 0;
$cantidad = 1;
$pdf->SetFont('Arial', '', 9);
foreach ($datos as $fila) {
    $pdf->SetX(1);
    $pdf->Cell($cellWidth, 10, utf8_decode($cantidad), 1, 0, 'C', true);
    $pdf->Cell($cellWidth + 20, 10, utf8_decode($fila["usuario_usuario"]) . " - " . $fila["usuario_id"], 1, 0, 'C', true);
    $pdf->Cell($cellWidth + 30, 10, utf8_decode($fila["usuario_nombre"]), 1, 0, 'C', true);
    $pdf->Cell($cellWidth + 5, 10, utf8_decode($fila["total_nota_monto"] * 0.5 . " $"), 1, 0, 'C', true);
    $pdf->Cell($cellWidth + 5, 10, utf8_decode($fila["total_totalPagar"] * 0.5 . " BS"), 1, 0, 'C', true);
    $pdf->Cell($cellWidth, 10, "", 1, 0, 'C', true);
    $pdf->Cell($cellWidth, 10, "", 1, 0, 'C', true);
    $pdf->Ln(10);
    $cantidad++;
    $sum_dolares += $fila["total_nota_monto"] * 0.5;
    $sum_bolivares += $fila["total_totalPagar"] * 0.5;
}

// Añadir fila final con sumas
$pdf->SetFillColor(229, 57, 53);
$pdf->SetX(1);
$pdf->Cell($cellWidth, 10, "Totales:", 1, 0, 'C', true);
$pdf->Cell($cellWidth + 20, 10, "", 1, 0, 'C', true);
$pdf->Cell($cellWidth + 30, 10, "", 1, 0, 'C', true);
$pdf->Cell($cellWidth + 5, 10, utf8_decode(number_format($sum_dolares, 2) . " $"), 1, 0, 'C', true);
$pdf->Cell($cellWidth + 5, 10, utf8_decode(number_format($sum_bolivares, 2) . " BS"), 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, "", 1, 0, 'C', true);
$pdf->Cell($cellWidth, 10, "", 1, 0, 'C', true);
$pdf->Ln(10);

// Salida del PDF
$pdf->Output();

ob_end_flush();
?>

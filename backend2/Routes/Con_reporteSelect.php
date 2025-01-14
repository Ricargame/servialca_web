<?php
include_once ("./FPDF/fpdf.php");
include_once ("./Models/cls_poliza.php");
class Reporte extends cls_poliza
{
}
class PDF extends FPDF
{
    public function __construct()
    {
        parent::__construct("L", "mm", "A4");
    }

    public function Header()
    {
        $this->Image("./Img/heade.jpg", 0, 0, 300, 40, "JPG");
        $this->SetY(40); 
    }

    public function Footer()
    {
        $this->Image("./Img/footer.jpg", 0, 190, 300, 22, "JPG");
    }
}
$rp = new Reporte();
$datos = $rp->GetAllSelet($_GET["id"]);
$pdf = new PDF();
$pdf->AddPage();
$pdf->SetFont("Arial", "B", 12);
$pdf->setY(50);
$pdf->Cell(0, 10, "LISTA DE CONTRATOS POR VENCER", 0, 1, "C");
$pdf->Ln(10);
// Ancho de página
$pageWidth = $pdf->GetPageWidth();

// Número de columnas de la tabla
$numColumns = 8;
// Ancho de cada celda
$cellWidth = $pageWidth / ($numColumns + 1); // Se suma 1 para dar espacio adicional entre las celdas
$pdf->setX(20);
$pdf->Cell($cellWidth,10, utf8_decode('N° de contrato'), 1, 0, "C");
$pdf->Cell($cellWidth + 10,10, 'Contratante', 1, 0, "C");
$pdf->Cell($cellWidth,10, 'Puestos', 1, 0, "C");
$pdf->Cell($cellWidth,10, 'Placa', 1, 0, "C");
$pdf->Cell($cellWidth,10, 'Color', 1, 0, "C");
$pdf->Cell($cellWidth + 20,10, 'Modelo', 1, 0, "C");
$pdf->Cell($cellWidth,10, 'Marca', 1, 0, "C");
$pdf->Ln(10);
foreach ($datos as $fila) {
$pdf->setX(20);
$pdf->SetFont("Arial", "B", 9);
$pdf->Cell($cellWidth, 10, $fila['poliza_id'], 1, 0, 'C');
$pdf->Cell($cellWidth + 10, 10, $fila["cliente_nombre"], 1, 0, 'C');
$pdf->Cell($cellWidth, 10, $fila["vehiculo_puesto"], 1, 0, 'C');
$pdf->Cell($cellWidth, 10, $fila["vehiculo_placa"], 1, 0, 'C');
$pdf->Cell($cellWidth, 10, $fila["color_nombre"], 1, 0, 'C');
$pdf->Cell($cellWidth + 20, 10, $fila["modelo_nombre"], 1, 0, 'C');
$pdf->Cell($cellWidth, 10, $fila["marca_nombre"], 1, 0, 'C');
$pdf->Ln(10);
$tableY += 10; 
}

$pdf->Output();
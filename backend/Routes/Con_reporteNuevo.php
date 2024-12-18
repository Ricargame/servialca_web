<?php
require('./FPDF/fpdf.php');

class PDF extends FPDF
{
    // Cabecera de página
    function Header()
    {
        // Aquí puedes agregar un título o logotipo si es necesario
    }

    // Pie de página
    function Footer()
    {
        // Posición a 1.5 cm del final
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial', 'I', 8);
        // Número de página
        $this->Cell(0, 10, 'Page ' . $this->PageNo(), 0, 0, 'C');
    }
}

// Creación del objeto de la clase heredada

$pdf = new FPDF();
$pdf->AddPage();
$pdf->Image("./Img/heade.jpg", 0, 0, 210, 20, "JPG");
// Sección de Datos Generales
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetLineWidth(0.1); // Ancho del borde
$pdf->SetDrawColor(0, 0, 0); // Color del borde
$pdf->Rect(2, 30, 205, 30); // Dibuja el rectángulo que rodea a las celdas
$pdf->Cell(0, 50, 'Datos Generales', 0, 1, 'C');
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(50, -35, 'Vigencia: ', 0, 0);
$pdf->Cell(50, -35, 'Desde:', 0, 0);
$pdf->Cell(50, -35, 'Hasta:', 0, 0);
$pdf->Cell(50, -35, 'Poliza:', 0, 1);
$pdf->Cell(50, 60, 'Asesor:', 0, 0);
$pdf->Cell(50, 60, 'Telefono:', 0, 0);
$pdf->Cell(50, 60, 'Sucursal:', 0, 1);
// Espacio en blanco
// Sección de Datos del Asegurado
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetLineWidth(0.1); // Ancho del borde
$pdf->SetDrawColor(0, 0, 0); // Color del borde
$pdf->Rect(2, 62, 205, 40); // Dibuja el rectángulo que rodea a las celdas
$pdf->Cell(0, -40, 'Datos del Asegurado', 0, 1, 'C');
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(50, 60, 'Contratante:', 0, 0);
$pdf->Cell(50, 60, 'Rif/C.I:', 0, 1);
$pdf->Cell(50, -25, 'Beneficiario:', 0, 0);
$pdf->Cell(50, -25, 'Rif/C.I:', 0, 0);
$pdf->Cell(50, -25, 'Telefono:', 0, 0);
$pdf->Cell(50, -25, 'Direccion:', 0, 1);

// // Espacio en blanco
$pdf->Ln(5);
// // Sección de Datos del Vehiculo
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetLineWidth(0.1); // Ancho del borde
$pdf->SetDrawColor(0, 0, 0); // Color del borde
$pdf->Rect(2, 104, 205, 40); // Dibuja el rectángulo que rodea a las celdas
$pdf->Cell(0, 45, 'Datos del Vehiculo', 0, 1, 'C');
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(50, -35, 'Marca:', 0, 0);
$pdf->Cell(50, -35, 'Color:', 0, 0);
$pdf->Cell(50, -35, 'Tipo:', 0, 0);
$pdf->Cell(50, -35, 'S/Carroceria:', 0, 1);
$pdf->Cell(50, 65, 'Modelo:', 0, 0);
$pdf->Cell(50, 65, 'Placa:', 0, 0);
$pdf->Cell(50, 65, 'Clase:', 0, 0);
$pdf->Cell(50, 65, 'S/Motor:', 0, 1);
$pdf->Cell(50, -40, utf8_decode('Año:'), 0, 0);
$pdf->Cell(50, -40, 'Uso:', 0, 0);
$pdf->Cell(50, -40, 'Peso:', 0, 0);
$pdf->Cell(50, -40, 'Capacidad Total:', 0, 0);
// Espacio en blanco

$pdf->Ln(17);
// Sección de Datos del Vehiculo
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetLineWidth(0.1); // Ancho del borde
$pdf->SetDrawColor(0, 0, 0); // Color del borde
$pdf->Rect(2, 146, 205, 60); // Dibuja el rectángulo que rodea a las celdas
$pdf->Cell(0, -55, 'Automovil Estandar', 0, 1, 'C');
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(80, 72, 'Cobertura:', 0, 0);
$pdf->Cell(80, 72, 'Suma Asegurada:', 0, 0);
$pdf->Cell(80, 72, 'Prima:', 0, 1);
$pdf->Cell(80, -45, utf8_decode('Daño a Cosas:'), 0, 0);
$pdf->Cell(80, -45, '0.00', 0, 0);
$pdf->Cell(80, -45, '0.00', 0, 1);
$pdf->Cell(80, 30, utf8_decode('Daño a Personas:'), 0, 0);
$pdf->Cell(80, 30, '0.00', 0, 0);
$pdf->Cell(80, 30, '0.00', 0, 1);
$pdf->Cell(80, 0, 'Asistencia a Personas:', 0, 0);
$pdf->Cell(80, 0, '0.00', 0, 0);
$pdf->Cell(80, 0, '0.00', 0, 1);
$pdf->Cell(80, 15, 'Muerte:', 0, 0);
$pdf->Cell(80, 15, '0.00', 0, 0);
$pdf->Cell(80, 15, '0.00', 0, 1);
$pdf->Cell(80, 0, 'Invalidez:', 0, 0);
$pdf->Cell(80, 0, '0.00', 0, 0);
$pdf->Cell(80, 0, '0.00', 0, 1);
$pdf->Cell(80, 15, 'Gastos Medicos:', 0, 0);
$pdf->Cell(80, 15, '0.00', 0, 0);
$pdf->Cell(80, 15, '0.00', 0, 1);

// Firma
$pdf->Image("./Img/rubro.jpg", 150, 210, 36, 32);
$pdf->Image("./Img/Logotipo.jpg", 30, 215, 22, 16);

//carnet
$pdf->Image("./Img/FONDO_CERTIFI.gif", 105, 240, 90, 55, "gif", "");
$pdf->Image("./Img/FONDO_CERTIFI_1.gif", 20, 240, 90, 55, "gif", "");
$pdf->Image("./Img/FONDO_CERTIFI_2.gif", 25, 242, 25, 8, "gif", "");

$pdf->Output();
?>
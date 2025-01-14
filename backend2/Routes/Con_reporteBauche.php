<?php
include("./FPDF/fpdf.php");

class PDF extends FPDF
{
    // Cabecera de página
    function Header()
    {
        $this->SetFont('Arial', 'B', 12);
        $this->Ln(10);
    }

    // Pie de página
    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, 'Pagina ' . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }

    // Función para crear la estructura de la factura
    function CrearEstructura()
    {
        // Establecer fuente
        $this->SetFont('Arial', '', 12);

        // Definir márgenes y dimensiones
        $margin = 10;
        $width = 190; // Ancho de la página (210) menos márgenes (10 + 10)
        $height = 100; // Altura de la página (297) menos márgenes (10 + 10)
        $width_30 = $width * 0.3;
        $width_70 = $width * 0.7;

        // Borde exterior de 3px
        $this->SetLineWidth(3);
        $this->Rect($margin, $margin, $width, $height);

        // Resetear el ancho de línea a 0.2 mm para los cuadros interiores
        $this->SetLineWidth(0.2);

        // Cuadro del 30%
        $this->Rect($margin, $margin, $width_30, $height);

        // Texto en la parte superior del cuadro del 30%
        $this->SetXY($margin + 2, $margin + 2);
        $this->SetFont('Arial', '', 7);
        $this->MultiCell($width_30 - 4, 5, 'ACEPTAR PARA SER PAGADA SIN AVISO Y SIN PROTESTO', 0, 'L');

        // Borde debajo del texto superior
        $this->SetXY($margin, $margin + 12);
        $this->Cell($width_30, 0, '', 'B');

        // Texto y cédula en el centro del cuadro del 30%
        $this->SetXY($margin + 2, $margin + 20);
        $this->MultiCell($width_30 - 4, 5, "C.I.: 12345678\n BUENA POR AVAL PARA GARANTIZAR LAS OBLIGACIONES DEL ACEPTANTE", 0, 'L');

        // Borde debajo del texto central
        $this->SetXY($margin, $height - 1);
        $this->Cell($width_30, 0, '', 'B');

        // Cédula en la parte inferior del cuadro del 30%
        $this->SetXY($margin + 2, $height - 5.5);
        $this->MultiCell($width_30 - 4, 5, 'C.I.: 87654321', 0, 'L');

        // Cuadro del 70%
        $this->Rect($margin + $width_30, $margin, $width_70, $height);

        // Añadir una imagen en el lado izquierdo del 70%
        $iconSize = 20;
        // $this->Image('path/to/icon.png', $margin + $width_30 + 10, $margin + 20, $iconSize);

        // Añadir cuadros pequeños en el lado derecho del 70%, alineados con la imagen
        $rect_x1 = $margin + $width_30 + $iconSize + 20;
        $rect_x2 = $rect_x1 + 40; // Espacio entre los cuadros pequeños
        $rect_y = $margin + 20; // Misma línea que la imagen
        $rect_width = 30;
        $rect_height = 10;

        $this->Rect($rect_x1, $rect_y, $rect_width, $rect_height);
        $this->Rect($rect_x2, $rect_y, $rect_width, $rect_height);

        // Texto "RIF" justo debajo de los cuadros pequeños
        $this->SetXY($rect_x1, $rect_y + $rect_height + 5);
        $this->SetFont('Arial', '', 7);
        $this->Cell(0, 0, 'RIF:  J-29697929-4', 0, 1);

        // Cuadro que ocupa el 80% del ancho con la misma altura que el de 20%
        $this->SetXY($margin + $width_30, $rect_y + $rect_height + 20);
        $this->Rect($margin + $width_30, $rect_y + $rect_height + 20, $width_70, $height - ($rect_y + $rect_height + 20) + $margin);

        // Dos líneas de texto debajo del cuadro del 80%
        $this->SetXY($margin + $width_30 + 10, $rect_y + $rect_height + 45);
        $this->MultiCell($width_70 - 20, 5, "EN LA FECHA DE VENCIMIENTO ARRIBA MENDIONADA, SE SERVIRA UD. PAGAR SIN AVISO\n Y SIN PROTESTO POR ESTA UNICA DE CAMBIO A LA ORDEN DE INVERSIONES SERVIAL, C.A", 0, 'L');

        // Texto adicional debajo del cuadro de ancho completo
        $this->SetXY($margin + $width_30 + 10, $height - 20);
        $this->MultiCell($width_70 - 20, 5, "Texto adicional debajo del cuadro de ancho completo", 0, 'L');
    }
}

// Crear instancia del PDF
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

// Crear la estructura de la factura
$pdf->CrearEstructura();

// Salida del PDF
$pdf->Output();
?>

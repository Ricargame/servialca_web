<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include("./FPDF/fpdf.php");
include("./Models/cls_documento.php");

class MiCliente extends cls_documento
{
}

class PDF extends FPDF
{
    private $titulo; // Variable para almacenar el título
    private $primeraPagina; // Variable para controlar la primera página

    public function __construct($titulo)
    {
        parent::__construct("P", "mm", "A4");
        
        $this->titulo = utf8_decode($titulo); // Asignar el título
        $this->Ln(10);
        $this->primeraPagina = true; // Inicializar como primera página
    }

    public function Header()
    {
        $this->Image("./Img/1.jpg", 0, 0, 210, 47);
        $this->Image("./Img/2.jpg", 0, 47, 205, 240);
    
        // Solo mostrar el título en la primera página
        if ($this->primeraPagina) {
            // Configuración del título
            $this->SetFont('Arial', 'B', 16); // Establecer la fuente
            $this->Cell(0, 50, $this->titulo, 0, 1, 'C'); // Título centrado
            $this->primeraPagina = false; // Cambiar a false después de la primera página
            $this->SetY(50);
        }
    }

    public function Footer()
    {
        $this->Image("./Img/3.jpg", 0, 277, 216, 20);
    }
}

$a = new MiCliente();
$datos = $a->GetOne($_GET['ID']);
$titulo = !empty($datos) ? $datos[0]['documentos_nombre'] : 'Título por Defecto';
$contenido = !empty($datos)? $datos[0]['documento_content'] : '';
$pdf = new PDF($titulo); // Pasar el título al constructor
$pdf->AddPage(); // Añadir una página
$pdf->MultiCell(0, 5, utf8_decode($contenido)); // Ajustar el contenido a la página
$pdf->Output(); // Generar el PDF
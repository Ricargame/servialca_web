<?php
include("./FPDF/fpdf.php");
include("./Models/cls_poliza.php");
class MiCliente extends cls_poliza
{
}
$a = new MiCliente();
$datos = $a->GetOne($_GET["ID"]);
if ($datos && count($datos) > 0) {
    if ($datos[0]["poliza_renovacion"] < 10) {
        $renovacion = "0" . $datos[0]["poliza_renovacion"];
    } else {
        $renovacion = $datos[0]["poliza_renovacion"];
    }
    if ($datos[0]["vehiculo_peso"] > 0) {
        $cap = $datos[0]["vehiculo_peso"];
    }
    if ($datos[0]["vehiculo_capTon"] > 0) {
        $capTotal = $datos[0]["vehiculo_capTon"];
    }
}
function formatearNombreTitular($nombre) {
    // Dividir el nombre completo en partes
    $nombres = explode(" ", $nombre);

    // Si hay más de un nombre, tomar solo el primer nombre y la inicial del segundo
    if (count($nombres) > 1) {
        // Primer nombre
        $primerNombre = $nombres[0];
        // Inicial del segundo nombre
        $inicialSegundoNombre = strtoupper(substr($nombres[1], 0, 1)) . ".";
        // Concatenar el primer nombre con la inicial
        return $primerNombre . " " . $inicialSegundoNombre;
    } else {
        // Si solo hay un nombre, devolverlo tal cual
        return $nombres[0];
    }
}

$Pdf = new FPDF("P", "mm", array(210, 297));
$Pdf->AddPage('P');
$Pdf->Image("./Img/carnetRight.jpg", 110, 25, 90, 60, "JPG");
$Pdf->Image("./Img/carnetFirma.png", 20, 25, 90, 60, "png");
if (file_exists("./ImgQr/" . $datos[0]["poliza_qr"])) {
    $Pdf->Image("./ImgQr/" . $datos[0]["poliza_qr"], 170, 48, 28, 34);
}
$Pdf->SetFont('Arial', 'B', 7);
$Pdf->SetTextColor(183, 28, 28); //color rojo en las letras
$Pdf->SetXY(121, 39); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(0, 13, "00000" . $datos[0]["poliza_id"] . " - " . $renovacion);
$Pdf->SetXY(20, 40); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "Titular: " . strtoupper(utf8_decode(formatearNombreTitular($datos[0]["titular_nombre"]) . " " . formatearNombreTitular($datos[0]["titular_apellido"]))));
$Pdf->SetXY(90, 40); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, $datos[0]["titular_cedula"]);
$Pdf->SetXY(20, 45); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "Contratante: " . strtoupper(utf8_decode(formatearNombreTitular($datos[0]["cliente_nombre"])) . " " . utf8_decode(formatearNombreTitular($datos[0]["cliente_apellido"]))));
$Pdf->SetXY(90, 45); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, $datos[0]["cliente_cedula"]);
$Pdf->SetXY(20, 50); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(20, 0, "EMISION: " . date("d/m/Y", strtotime($datos[0]["poliza_fechaInicio"])));
$Pdf->SetXY(75, 50); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(20, 0, "VENCE: " . date("d/m/Y", strtotime($datos[0]["poliza_fechaVencimiento"])));
$Pdf->SetXY(20, 55); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "Marca: " . $datos[0]["marca_nombre"]);
$Pdf->SetXY(20, 60); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "Modelo: " . $datos[0]["modelo_nombre"]);
$Pdf->SetXY(75, 55); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(20, 0, "COLOR: " . utf8_decode($datos[0]["color_nombre"]));
$Pdf->SetXY(75, 60); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "PLACA: " . strtoupper($datos[0]["vehiculo_placa"]));
$Pdf->SetXY(75, 65); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, utf8_decode("Uso: " . $datos[0]["usoVehiculo_nombre"]));
$Pdf->SetXY(75, 70); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, utf8_decode("Año: " . $datos[0]["vehiculo_año"]));
$Pdf->SetXY(20, 65); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, utf8_decode("SER.CARR: " . $datos[0]["vehiculo_serialCarroceria"]));
$Pdf->SetXY(20, 70); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, utf8_decode("SER.MOTOR: " . $datos[0]["vehiculo_serialMotor"]));
$Pdf->SetFont('Arial', 'B', 5);
$Pdf->SetXY(20, 82); // Ajusta la posición del texto según sea necesario
$Pdf->SetTextColor(183, 28, 28); //color rojo en las letras
$Pdf->Cell(10, 0, utf8_decode("El Presenta Contrato RCV no Requiere de Sello Humedo"));
$Pdf->Output();
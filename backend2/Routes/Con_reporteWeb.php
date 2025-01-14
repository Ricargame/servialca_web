<?php
include("./FPDF/fpdf.php");
include("./Models/cls_poliza.php");
class MiCliente extends cls_poliza
{
}
$a = new MiCliente();
$datos = $a->GetOne($_GET["ID"]);
$renovacion = "";
$cap = "";
$capTotal = "";
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

$Pdf = new FPDF("L", "mm", "legal");
$Pdf->AddPage("P");
$Pdf->SetFont("Arial", "B", "12");

// Agrega la imagen con transparencia
$Pdf->Image("./Img/header2.jpg", -10, 0, 220, 20, "JPG");
$Pdf->Image("./Img/body2.jpg", -8, 25, 220, 145, "jpg");
$Pdf->Image("./Img/rigthRCV.png", 161, 25, 40, 150, "png");
// $Pdf->Image("./Img/Servialca.png", -8, 25, 10, 10, "png");
$Pdf->Image("./Img/bodyFooter.jpg", -8, 170, 220, 25, "JPG");
$Pdf->Image("./Img/carnetFirma.png", 20, 195, 90, 60, "png");
// $Pdf->Image("./Img/Servialca1.png", 20, 195, 90, 60, "png");
$Pdf->Image("./Img/carnetRight.jpg", 110, 195, 90, 60, "JPG");
// $Pdf->Image("./Img/rubro3.jpg", 182, 187, 30, 25);
// $Pdf->Image("./Img/rubro3.jpg", 63, 239, 15, 15, "JPG");
if (file_exists("./ImgQr/" . $datos[0]["poliza_qr"])) {
    $Pdf->Image("./ImgQr/" . $datos[0]["poliza_qr"], 170, 218, 28, 34);
}
// Agrega el texto encima de la imagen
$Pdf->SetXY(20, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(0, 15, "00000" . $datos[0]["poliza_id"] . " - " . $renovacion);
$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 30, "Vigencia Desde: " . date("d/m/Y", strtotime($datos[0]["poliza_fechaInicio"])));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 30, "Vigencia Hasta: " . date("d/m/Y", strtotime($datos[0]["poliza_fechaVencimiento"])));
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 40, "Titular: " . strtoupper(utf8_decode($datos[0]["titular_nombre"] . " " . $datos[0]["titular_apellido"])));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 40, "CI/RIF: " . $datos[0]["titular_cedula"]);
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 50, "Contratante: " . strtoupper(utf8_decode($datos[0]["cliente_nombre"]) . " " . utf8_decode($datos[0]["cliente_apellido"])));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 50, "CI/RIF: " . $datos[0]["cliente_cedula"]);
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 60, utf8_decode("Teléfono: " . $datos[0]["cliente_telefono"]));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 60, "Tel. del usuario: " . $datos[0]["usuario_telefono"]);
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 70, "Correo: " . $datos[0]["cliente_correo"]);
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 70, "Asesor: " . $datos[0]["usuario_nombre"]);
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 80, utf8_decode("Dirección Habitacion: " . strtoupper($datos[0]["cliente_direccion"])));
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 90, utf8_decode("Tipo Contrato: " . $datos[0]["contrato_nombre"]));
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
//
$Pdf->Cell(25, 105, utf8_decode("CARACTERISTICA DEL VEHICULO "));
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 115, utf8_decode("Marca: " . $datos[0]["marca_nombre"]));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 115, utf8_decode("Modelo: " . $datos[0]["modelo_nombre"]));
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 125, utf8_decode("Clase: " . strtoupper($datos[0]["clase_nombre"])));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 125, utf8_decode("Uso: " . $datos[0]["usoVehiculo_nombre"]));
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 135, utf8_decode("Color: " . utf8_decode($datos[0]["color_nombre"])));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 135, utf8_decode("Año: " . $datos[0]["vehiculo_año"]));
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 145, utf8_decode("Ser. Carr: " . $datos[0]["vehiculo_serialCarroceria"]));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 145, utf8_decode("Ser. Motor: " . $datos[0]["vehiculo_serialMotor"]));
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 155, utf8_decode("Placa: " . strtoupper($datos[0]["vehiculo_placa"])));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 155, utf8_decode("Tipo: " . strtoupper($datos[0]["tipoVehiculo_nombre"])));
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 165, utf8_decode("Puestos: " . $datos[0]["vehiculo_puesto"]));
$Pdf->SetXY(110, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 165, utf8_decode("Peso: "));
$Pdf->SetXY(140, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 165, utf8_decode("Cap. Ton: "));

//
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 180, utf8_decode("GARANTIAS RESPONSABILIDAD CIVIL"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 180, utf8_decode("MONTO GARANTIAS"));
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 180, utf8_decode("PAGOS Bs."));

//
$Pdf->SetFont('Arial', '',8);
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 190, utf8_decode("POR DAÑOS A COSAS"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 190, "" . $datos[0]["dañoCosas"]);
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 190, "" . $datos[0]["cobertura_danoCosas"]);
//
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 200, utf8_decode("POR DAÑOS A PERSONAS"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 200, "" . $datos[0]["dañoPersonas"]);
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 200, "" . $datos[0]["cobertura_danoPersonas"]);
//
$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 210, utf8_decode("TOTAL RESPONSABILIDAD CIVIL"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 210, "" . $datos[0]["dañoCosas"] + $datos[0]["dañoPersonas"] . ".00");
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 210, "" . $datos[0]["cobertura_danoCosas"] + $datos[0]["cobertura_danoPersonas"]);
//
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->SetFont('Arial', '', 8);
$Pdf->Cell(25, 220, utf8_decode("FINANZA FACULTATIVA"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 220, "" . $datos[0]["fianzaCuanti"]);
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 220, "" . $datos[0]["cobertura_fianzaCuanti"]);
//
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 230, utf8_decode("ASISTENCIA LEGAL"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 230, "" . $datos[0]["asistenciaLegal"]);
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 230, "" . $datos[0]["cobertura_asistenciaLegal"]);
//
$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetXY(10, 129);
$Pdf->Cell(10, 0, utf8_decode("TOTAL ASISTENCIA LEGAL"));
$Pdf->SetXY(100, 94); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(10, 70, "" . $datos[0]["fianzaCuanti"] + $datos[0]["asistenciaLegal"] . ".00");
$Pdf->SetXY(145, 94); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(10, 70, "" . $datos[0]["cobertura_fianzaCuanti"] + $datos[0]["cobertura_asistenciaLegal"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 134);
$Pdf->Cell(10, 0, utf8_decode("A.P.O.V. (accidentes por ocupante de vehiculos.)"));
$Pdf->SetXY(100, 134); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(10, 0, "" . $datos[0]["apov"]);
$Pdf->SetXY(145, 134); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(10, 0, "" . $datos[0]["cobertura_apov"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 139);
$Pdf->Cell(10, 0, utf8_decode("MUERTE"));
$Pdf->SetXY(100, 139); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["muerte"]);
$Pdf->SetXY(145, 139); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["cobertura_muerte"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 144);
$Pdf->Cell(10, 0, utf8_decode("INVALIDEZ"));
$Pdf->SetXY(100, 144); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["invalidez"]);
$Pdf->SetXY(145, 144); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["cobertura_invalidez"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 149);
$Pdf->Cell(10, 0, utf8_decode("GASTOS MEDICOS"));
$Pdf->SetXY(100, 149); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["gastosMedicos"]);
$Pdf->SetXY(145, 149); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["cobertura_gastosMedicos"]);
//
$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetXY(10, 154);
$Pdf->Cell(10, 0, utf8_decode("TOTAL ACCID. OCUPANTES"));
$Pdf->SetXY(100, 154); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["muerte"] + $datos[0]["invalidez"] + $datos[0]["gastosMedicos"] . ".00");
$Pdf->SetXY(145, 154); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["cobertura_muerte"] + $datos[0]["cobertura_invalidez"] + $datos[0]["cobertura_gastosMedicos"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 159);
$Pdf->Cell(10, 0, utf8_decode("GRUA Y ESTACIONAMIENTO"));
$Pdf->SetXY(100, 159); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["grua"]);
$Pdf->SetXY(145, 159); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["cobertura_grua"]);
//
$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetXY(10, 164);
$Pdf->Cell(10, 0, utf8_decode("TOTAL GASTOS EXTRAS"));
$Pdf->SetXY(100, 164); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "TOTAL A PAGAR: ");
$Pdf->SetXY(145, 164); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["totalPagar"]);
$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetXY(50, 170);
$Pdf->SetTextColor(183, 28, 28); //color rojo en las letras
$Pdf->Cell(10, 0, utf8_decode("El Presenta Contrato RCV no Requiere de Sello Humedo"));
//////////////////////////

$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetTextColor(183, 28, 28); //color rojo en las letras
$Pdf->SetXY(121, 209); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(0, 13, "00000" . $datos[0]["poliza_id"] . " - " . $renovacion);
$Pdf->SetXY(20, 210); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "Titular: " . strtoupper(utf8_decode($datos[0]["titular_nombre"] . " " . $datos[0]["titular_apellido"])));
$Pdf->SetXY(90, 210); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, $datos[0]["titular_cedula"]);
$Pdf->SetXY(20, 215); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "Contratante: " . strtoupper(utf8_decode($datos[0]["cliente_nombre"]) . " " . utf8_decode($datos[0]["cliente_apellido"])));
$Pdf->SetXY(90, 215); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, $datos[0]["cliente_cedula"]);
$Pdf->SetXY(20, 220); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(20, 0, "EMISION: " . date("d/m/Y", strtotime($datos[0]["poliza_fechaInicio"])));
$Pdf->SetXY(75, 220); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(20, 0, "VENCE: " . date("d/m/Y", strtotime($datos[0]["poliza_fechaVencimiento"])));
$Pdf->SetXY(20, 225); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "Marca: " . $datos[0]["marca_nombre"]);
$Pdf->SetXY(20, 230); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "Modelo: " . $datos[0]["modelo_nombre"]);
$Pdf->SetXY(75, 225); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(20, 0, "COLOR: " . utf8_decode($datos[0]["color_nombre"]));
$Pdf->SetXY(75, 230); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "PLACA: " . strtoupper($datos[0]["vehiculo_placa"]));
$Pdf->SetXY(75, 235); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, utf8_decode("Uso: " . $datos[0]["usoVehiculo_nombre"]));
$Pdf->SetXY(75, 240); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, utf8_decode("Año: " . $datos[0]["vehiculo_año"]));
$Pdf->SetXY(20, 235); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, utf8_decode("SER.CARR: " . $datos[0]["vehiculo_serialCarroceria"]));
$Pdf->SetXY(20, 240); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, utf8_decode("SER.MOTOR: " . $datos[0]["vehiculo_serialMotor"]));
$Pdf->SetFont('Arial', 'B', 5);
$Pdf->SetXY(20, 252); // Ajusta la posición del texto según sea necesario
$Pdf->SetTextColor(183, 28, 28); //color rojo en las letras
$Pdf->Cell(10, 0, utf8_decode("El Presenta Contrato RCV no Requiere de Sello Humedo"));
$Pdf->Output();
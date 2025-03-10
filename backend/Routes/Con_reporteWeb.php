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
$Pdf = new FPDF("L", "mm", "legal");
$Pdf->AddPage("P");
$Pdf->SetFont("Arial", "B", "12");

// Agrega la imagen con transparencia
$Pdf->Image("./Img/header2.jpg", -10, 0, 220, 20, "JPG");
$Pdf->Image("./Img/body2.jpg", -8, 25, 220, 145, "jpg");
$Pdf->Image("./Img/rigthRCV.png", 161, 25, 40, 150, "png");
// $Pdf->Image("./Img/Servialca.png", -8, 25, 10, 10, "png");
$Pdf->Image("./Img/bodyFooter.jpg", -3, 170, 220, 25, "JPG");
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
$moneda = ($datos[0]["contrato_id"] > 1) ? chr(128) : ""; 
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
$Pdf->Cell(25, 190, "" . $datos[0]["dañoCosas"] . $moneda);
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 190, "" . $datos[0]["cobertura_danoCosas"]);
//
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 200, utf8_decode("POR DAÑOS A PERSONAS"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 200, "" . $datos[0]["dañoPersonas"] . $moneda);
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 200, "" . $datos[0]["cobertura_danoPersonas"]);
//
$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 210, utf8_decode("TOTAL RESPONSABILIDAD CIVIL"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 210, "" . $datos[0]["dañoCosas"] + $datos[0]["dañoPersonas"] . ".00" . $moneda);
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 210, "" . $datos[0]["cobertura_danoCosas"] + $datos[0]["cobertura_danoPersonas"]);
//
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->SetFont('Arial', '', 8);
$Pdf->Cell(25, 220, utf8_decode("FINANZA FACULTATIVA"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 220, "" . $datos[0]["fianzaCuanti"] . $moneda);
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 220, "" . $datos[0]["cobertura_fianzaCuanti"]);
//
$Pdf->SetXY(10, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 230, utf8_decode("ASISTENCIA LEGAL"));
$Pdf->SetXY(100, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 230, "" . $datos[0]["asistenciaLegal"] . $moneda);
$Pdf->SetXY(145, 9); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 230, "" . $datos[0]["cobertura_asistenciaLegal"]);
//
$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetXY(10, 129);
$Pdf->Cell(10, 0, utf8_decode("TOTAL ASISTENCIA LEGAL"));
$Pdf->SetXY(100, 94); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(10, 70, "" . $datos[0]["fianzaCuanti"] + $datos[0]["asistenciaLegal"] . ".00" . $moneda);
$Pdf->SetXY(145, 94); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(10, 70, "" . $datos[0]["cobertura_fianzaCuanti"] + $datos[0]["cobertura_asistenciaLegal"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 134);
$Pdf->Cell(10, 0, utf8_decode("A.P.O.V. (accidentes por ocupante de vehiculos.)"));
$Pdf->SetXY(100, 134); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(10, 0, "" . $datos[0]["apov"] . $moneda);
$Pdf->SetXY(145, 134); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(10, 0, "" . $datos[0]["cobertura_apov"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 139);
$Pdf->Cell(10, 0, utf8_decode("MUERTE"));
$Pdf->SetXY(100, 139); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["muerte"] . $moneda);
$Pdf->SetXY(145, 139); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["cobertura_muerte"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 144);
$Pdf->Cell(10, 0, utf8_decode("INVALIDEZ"));
$Pdf->SetXY(100, 144); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["invalidez"] . $moneda);
$Pdf->SetXY(145, 144); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["cobertura_invalidez"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 149);
$Pdf->Cell(10, 0, utf8_decode("GASTOS MEDICOS"));
$Pdf->SetXY(100, 149); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["gastosMedicos"] . $moneda);
$Pdf->SetXY(145, 149); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["cobertura_gastosMedicos"]);
//
$Pdf->SetFont('Arial', 'B', 8);
$Pdf->SetXY(10, 154);
$Pdf->Cell(10, 0, utf8_decode("TOTAL ACCID. OCUPANTES"));
$Pdf->SetXY(100, 154); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["muerte"] + $datos[0]["invalidez"] + $datos[0]["gastosMedicos"] . ".00" . $moneda);
$Pdf->SetXY(145, 154); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["cobertura_muerte"] + $datos[0]["cobertura_invalidez"] + $datos[0]["cobertura_gastosMedicos"]);
//
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetXY(10, 159);
$Pdf->Cell(10, 0, utf8_decode("GRUA Y ESTACIONAMIENTO"));
$Pdf->SetXY(100, 159); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(60, 0, "" . $datos[0]["grua"] . $moneda);
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
$Pdf->Cell(25, 0, "Titular: " . strtoupper(utf8_decode(formatearNombreTitular($datos[0]["titular_nombre"]) . " " . formatearNombreTitular($datos[0]["titular_apellido"]))));
$Pdf->SetXY(90, 210); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, $datos[0]["titular_cedula"]);
$Pdf->SetXY(20, 215); // Ajusta la posición del texto según sea necesario
$Pdf->Cell(25, 0, "Contratante: " . strtoupper(utf8_decode(formatearNombreTitular($datos[0]["cliente_nombre"])) . " " . utf8_decode(formatearNombreTitular($datos[0]["cliente_apellido"]))));
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

// $Pdf->AddPage("P");
// $Pdf->SetY(20);
// $Pdf->SetFont('Arial', '', 8);
// $Pdf->SetTextColor(0, 0, 0); // Color negro
// $Pdf->Cell(0, 10, utf8_decode("CONDICIONES GENERALES DEL CONTRATO DE RCV"), 0, 1, 'C'); // Centrado
// $Pdf->SetFont('Arial', '', 8); // Fuente normal
// $textoCondiciones = "
// INVERSIONES SERVIAL, C. A. (R.I.F. J-296979294) Entre, INVERSIONES SERVIAL, C. A., debidamente inscrita por ante el Registro Mercantil Segundo de la Circunscripción Judicial del Estado Portuguesa, bajo el Nº 10, Tomo 270-A, de fecha 18 de diciembre del 2008, Inscrita en el Registro de Información Fiscal (R.I.F) N° J296979294, que a los efectos del contrato se denominara INVERSIONES SERVIAL, C. A., por una
// parte, y por la otra EL CONTRATANTE, persona natural o jurídica, se ha celebrado el presente contrato de garantía de Responsabilidad Civil de Vehículos; derivado del uso del vehículo descrito en el contrato de acuerdo a lo dispuesto en la Ley de Trasporte Terrestre, su Reglamento y el
// Código Civil de Venezuela, bajo los términos y condiciones establecidas en el siguiente contrato.
// PRIMERA: INVERSIONES SERVIAL, C. A., se compromete a pagar directamente al tercero, víctima de un accidenta de tránsito, ocurrido dentro del territorio nacional, con ocasión del uso
// del vehículo garantizado, los daños materiales o personales que se hallan causado como consecuencia del mismo y los cuales deba el contratante de conformidad con la Ley de Tránsito Terrestre, limitados a las cantidades máximas previstas en el presente contrato de garantías de
// (RCV). Pago que se haría en un lapso de treinta (30) días hábiles, contados a partir de la entrega de todos los recaudos exigidos para su análisis previo.
// SEGUNDA: La duración del contrato será de Un (01) año, contados a partir del pago total DEL COSTO del contrato, pudiendo ser renovado al vencimiento del mismo previo el pago total del COSTO DEL contrato. Iniciándose as su obligación solidaria de acuerdo al Artículo 1.121 del Código Civil de Venezuela.
// TERCERA: EL CONTRATANTE, tiene la obligación de notificar a INVERSIONES SERVIAL, C. А., cuando ocurra un accidente de transito en el cual este involucrado y resulten daños a terceros. El contratante o el conductor del vehículo están en la obligación de dar por aviso por escrito INVERSIONES SERVIAL, C. A.; a
// CUARTA: Este contrato no incluye como garantía (RCV) ni obligación derivada del mismo los daños que en su origen o extensión sean causados directa o indirectamente por los procesantes
// QUINTA: INVERŠIONES SERVIAL, C. A., retendrá el 25% del monto a pagar en los siguientes casos.
// Primero: Cuando el tercero reclamante no cumpla con lo establecido en el Articulo 58 de la Ley de Tránsito Terrestre.
// Segundo: Cuando el Tercero Infrinja la Ley de Tránsito y Trasporte Terrestre, como su Reglamento.
// SEXTA: INVERSIONES SERVIAL, C. A., quedara revelado de toda responsabilidad solidaria en los siguientes casos:
// a) Cuando el contratante venda o enajene el vehículo descrito en el cuadro de Garantía (RCV);
// b) Cuando el contrato este anulado por falta de pago; y
// c) Cuando incumpla alguna otra cláusula del presente contrato.
// SEPTIMA: El presente contrato de Garantía RCV no cubre los daños o perdidas causadas a las causas a las cosas trasportadas por las personas en el vehículo.
// OCTAVA: El presente contrato tendrá una duración de un (01) años contados a partir de la fecha del pago total del contrato.
// NOVENA: Para que sea procedente cualquier indemnización por accidente de tránsito, donde se produzcan daños materiales, lesiones a personas o muertos, es indispensable la intervención de autoridades competentes para el levantamiento del accidente.
// DECIMA: Al ocurrir un accidente de tránsito, donde el contratante o conductor se encuentren obligados a pagar a terceros, INVERSIONES SERVIAL, C. A., podrá asumir la responsabilidad hasta los montos garantizados, por los daños causados, salvo en los siguientes casos:
// a) Cuando el contrato este vencido y el contratante no haya pagado la renovación.
// b) Cuando el propietario u el conductor, hayan obstaculizado con su proceder el ejercicio de los derechos de INVERSIONES SERVIAL, C. А..
// c) Cuando el vehículo no se encuentre en condiciones de seguridad y buen funcionamiento, como lo exige la Ley de Tránsito y Trasporte Terrestre, y su reglamento.
// d) Cuando el conductor del vehículo este incapacitado para conducir.
// e) cuando el conductor haya causado los daños por conducir el vehículo a exceso de velocidad, bajo los efectos de bebidas alcohólicas o drogas.
// f) Cuando hayan incumplido algunas normas de circulación establecidas en la Ley de Tránsito y Trasporte Terrestre.
// DECIMA PRIMERA: Asistencia Legal: En caso de accidente de transito por el cual se origine la detención del conductor y la retención del vehículo la INVERSIONES SERVIAL, C. A., asumirá hasta el limite del contrato de Garantía (RCV), la asistencia legal para la liberación del conductor y del vehículo, siempre que el accidente no se produzca:
// a) Por haber ocurrido el accidente por motivos de sustracción (robo) al propietario o conductor.
// b) Cuando el Vehículo presente problemas de documentación o de seriales
// DECIMA SEGUNDA: Estacionamiento y Grúa en caso de accidente:
// DECIMA TERCERA: Las partes eligen como domicilio único y excluyente Acarigua, Estado Portuguesa, a cuya jurisdicción declaran someterse con exclusividad de cualquier otra, para los efectos de del presente contrato de garantía RCV. En Acarigua, a la fecha de su firma.
// ";

// $Pdf->SetLeftMargin(20); // Margen izquierdo (ajusta según sea necesario)
// $Pdf->SetRightMargin(20); // Margen derecho (ajusta según sea necesario)
// $Pdf->MultiCell(0, 5, utf8_decode($textoCondiciones));
// $Pdf->SetLeftMargin(10); // Restablecer margen izquierdo
// $Pdf->SetRightMargin(10); // Restablecer margen derecho

// $Pdf->AddPage("P");
// $Pdf->SetY(20);
// $Pdf->SetFont('Arial', '', 8);
// $Pdf->SetTextColor(0, 0, 0); // Color negro
// $Pdf->Cell(0, 10, utf8_decode("QUE HACER EN CASO DE ACCIDENTE DE TRANSITO"), 0, 1, 'C'); // Centrado
// $Pdf->SetFont('Arial', '', 8); // Fuente normal
// $textoCondiciones2 = "
// 1.- Notificar por escrito al seguro, en el lapso de los Cinco (05) días siguientes al accidente.
// 2.- presentar copia de los documentos del conductor (Cedula, Licencia de conducir, Certificado Médico y Contrato de RCV.
// 3.- presentar copia y original de la Expediente de tránsito o autoridad que realizó el levantamiento del accidente. 
// 4.- Llenar las respectivas declaraciones que exige la Compañía.
// ";

// $Pdf->SetLeftMargin(20); // Margen izquierdo (ajusta según sea necesario)
// $Pdf->SetRightMargin(20); // Margen derecho (ajusta según sea necesario)
// $Pdf->MultiCell(0, 5, utf8_decode($textoCondiciones2));
// $Pdf->SetLeftMargin(10); // Restablecer margen izquierdo
// $Pdf->SetRightMargin(10); // Restablecer margen derecho

$Pdf->Output();
<?php
include("./FPDF/fpdf.php");
include("./Models/cls_Auth.php");
class MiCliente extends cls_Auth
{
}
$a = new MiCliente();
$datos = $a->GetOne($_GET["ID"]);
$Pdf = new FPDF("L", "mm", "legal");
$Pdf->AddPage("P");
$Pdf->Image("./Img/rubro3.jpg", 50, 220, 30, 25);
$Pdf->SetY(20);
$Pdf->SetFont('Arial', '', 8);
$Pdf->SetTextColor(0, 0, 0); // Color negro
$Pdf->Cell(0, 10, utf8_decode("CONTRATO DE PRESTACIÓN DE SERVICIVICIO DE VENTA"), 0, 1, 'C'); // Centrado
$Pdf->SetFont('Arial', '', 8); // Fuente normal
$textoCondiciones = "
Entre las partes, por un lado Entre, INVERSIONES SERVIAL, C. A., debidamente inscrita por ante el Registro Mercantil Segundo de la Circunscripción Judicial del Estado Portuguesa, bajo el Nº 10, Tomo 270-A, de fecha 18 de diciembre del 2008.,, domiciliado en la ciudad de Acarigua, Estado Portuguesa, representada por su Gerente General MIGUEL A. FIGUEROA, venezolano, mayor de edad, titular de la Cedula de Identidad N° V-11.078.879, quien en adelante y para los efectos del presente contrato se denominara  LA COMPAÑIA, y por el otro, ".$datos['usuario_nombre'].", venezolano, mayor de edad, titular de la Cedula de Identidad N° ".$datos['usuario_cedula'].", domiciliado en la ciudad de ".$datos['usuario_direccion'].", quien en adelante y para los efectos del presente contrato se denomina como EL ASESOR (VENDEDOR),  hemos acordado suscribir este contrato de prestación de servicios de venta de Contratos de Garantía de RCV, el cual se regirá por las siguientes cláusulas:
PRIMERA: Objeto del Contrato: EL ASESOR (VENDEDOR), deberá prestar por sus propios medios y con plena autonomía técnica y presupuestal, dentro del plazo acordado, los servicios de venta de contratos de Garantías de RCV. Como contraprestación recibirá por parte de La Compañía un porcentaje del Treinta por Ciento (30 %) del valor del contrato de Garantía de RCV vendido.
SEGUNDA: Plazo de Ejecución. El término de duración del presente contrato, será de un (01) año, contados a partir de la firma del mismo, el cual tiene como objeto las actividades descritas en la Clausula Primera, además de aquellas que por la naturaleza del mismo resulten pertinentes. 
TERCERA: LA COMPAÑIA pagará al EL ASESOR (VENDEDOR), Treinta por Ciento (30 %) del valor del contrato de Garantía de RCV vendido, que el Asesor se auto liquidará, Teniendo la obligación de realizar reportes semanales y depositar en la cuenta de La Compañía la cantidad de lo reportados a la semana.
CUARTA: Subcontratación, EL ASESOR (VENDEDOR), se compromete a asumir las cargas contractuales u obligaciones laborales resultado de relaciones externas al presente vínculo, que tengan por finalidad el cumplimiento total o parcial del objeto contractual. 
Parágrafo: EL ASESOR (VENDEDOR), se compromete a mantener indemne a la compañía de las acciones legales que sus dependientes ejerzan en su contra. 
QUINTA: Obligaciones EL ASESOR (VENDEDOR). EL ASESOR (VENDEDOR), se obliga a ejecutar el Objeto del Contrato, razón por la cual tendrá las siguientes obligaciones:
1.- Realizar reporte semanal de los contratos vendidos.
2.- El Asesor (Vendedor) al realizar el cierre semanal y su respectivo reporte semanal deberá depositar el correspondiente dinero de lo vendido. 
SEXTA: LA COMPAÑÍA al momento de la firma del presente contrato le asignara un Código y Usuario al Asesor (Vendedor) para su acceso al sistema. Teniendo entendido que si el Asesor (Vendedor) incumple con las obligaciones establecidas en la Clausula Quinta del presente contrato, su acceso al sistema será bloqueado.   
SÉPTIMA: Las sumas de dinero que eventualmente sean reconocidas por LA COMPAÑIA al EL ASESOR (VENDEDOR) son por mera liberalidad y de ninguna manera pueden ser considerados como hechos o actos que infieran una relación de naturaleza laboral. 
OCTAVA: Solución de conflictos. Se acuerda que, de presentarse un conflicto entre las partes, en el marco del presente contrato, las partes voluntariamente se acogen a la competencia y jurisdicción de los tribunales de la ciudad de Acarigua, Estado Portuguesa.
En señal de conformidad, las partes suscriben el presente contrato, en dos ejemplares del mismo tenor. En……………………………, a los                     días del mes …………………………, del año 2025.

                                        LA COMPAÑIA                                                                                 EL ASESOR (VENDEDOR)
                                                                                                                                                       
                                                                                                                                                        ".      $datos['usuario_nombre']."
                                          
";

$Pdf->SetLeftMargin(20); // Margen izquierdo (ajusta según sea necesario)
$Pdf->SetRightMargin(20); // Margen derecho (ajusta según sea necesario)
$Pdf->MultiCell(0, 5, utf8_decode($textoCondiciones));
$Pdf->SetLeftMargin(10); // Restablecer margen izquierdo
$Pdf->SetRightMargin(10); // Restablecer margen derecho
$Pdf->Output();
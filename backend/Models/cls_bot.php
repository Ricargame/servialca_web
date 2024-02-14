<?php
require_once("cls_db.php");
date_default_timezone_set("America/Caracas");
error_reporting(E_ERROR | E_PARSE);

require("./QR/qrlib.php");
abstract class cls_bot extends cls_db
{
    protected $id, $estatus;

    public function __construct()
    {
        parent::__construct();
    }

    protected function GetAll()
    {
        $sql = $this->db->prepare("SELECT *,cliente.*,debitocredito.* FROM poliza_bot 
        INNER JOIN cliente ON cliente.cliente_id = poliza_bot.bot_cliente_id 
        INNER JOIN debitocredito ON debitocredito.nota_id = poliza_bot.bot_debito_id
        WHERE bot_estatus = 0");
        if ($sql->execute()) {
            $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $resultado = [];
        }
        return $resultado;
    }

    protected function GetOne()
    {
        $sql = $this->db->prepare("SELECT *,
        cliente.*,debitocredito.*, vehiculo.*, modelo.*, marca.*,
        tipovehiculo.*, color.*, clasevehiculo.*, usovehiculo.* 
        FROM poliza_bot 
        INNER JOIN cliente ON cliente.cliente_id = poliza_bot.bot_cliente_id 
        INNER JOIN debitocredito ON debitocredito.nota_id = poliza_bot.bot_debito_id
        INNER JOIN vehiculo ON vehiculo.vehiculo_id = poliza_bot.bot_vehiculo_id
        INNER JOIN marca ON marca.marca_id = vehiculo.marca_id
        INNER JOIN modelo ON modelo.modelo_id = vehiculo.modelo_id
        INNER JOIN tipovehiculo ON tipovehiculo.tipovehiculo_id = vehiculo.tipo_id
        INNER JOIN color ON color.color_id = vehiculo.color_id
        INNER JOIN clasevehiculo ON clasevehiculo.claseVehiculo_id  = vehiculo.clase_id
        INNER JOIN usovehiculo ON usovehiculo.usoVehiculo_id  = vehiculo.uso_id
        WHERE bot_id = ? ");
        if ($sql->execute([$this->id])) {
            $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $resultado = [];
        }
        return $resultado;
    }


    protected function ChangeStatus()
    {
        $sql = $this->db->prepare("UPDATE poliza_bot SET bot_estatus = ? WHERE bot_id = ? ");
        if ($sql->execute([$this->estatus, $this->id])) {
            $resultado = true;
            if ($this->estatus == 1) {
                $this->save();
            }
        } else {
            $resultado = false;
        }
        return $resultado;
    }

    protected function save()
    {
        try {
            $fechaActual = new DateTime();
            $fechaActual->modify('+1 year');
            $fechaConUnAnioMas = $fechaActual->format('Y-m-d');

            // Obtener los resultados de GetOne()
            $polizas = $this->GetOne();

            // Iterar sobre cada resultado obtenido
            foreach ($polizas as $poliza) {
                $sql = $this->db->prepare("INSERT INTO poliza(
                    cliente_id,
                    titular_id,
                    vehiculo_id,
                    poliza_fechaInicio,
                    poliza_fechaVencimiento,
                    tipoContrato_id,
                    estado_id,
                    usuario_id,
                    sucursal_id,
                    cobertura_id,
                    poliza_renovacion,
                    debitoCredito) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
                if ($sql->execute([
                    $poliza["bot_cliente_id"],
                    $poliza["bot_titular_id"],
                    $poliza["bot_vehiculo_id"],
                    $fechaActual->format('Y-m-d'),
                    $fechaConUnAnioMas,
                    1,
                    18,
                    57,
                    1,
                    $poliza["bot_cobertura_id"],
                    0,
                    $poliza["bot_debito_id"]
                ])) {
                    $ultimoID = $this->db->lastInsertId();

                    // Aquí puedes usar $ultimoID para lo que necesites, como generar un QR
                    $this->generarQr($ultimoID);
                }
            }
        } catch (PDOException $e) {
            return [
                "data" => [
                    'res' => "Error de consulta: " . $e->getMessage()
                ],
                "code" => 400
            ];
        }
    }

    protected function generarQr($id)
    {
        set_time_limit(30000);

        try {
            // Consulta SQL para obtener los datos de la póliza y clientes relacionados
            $sql = $this->db->prepare("SELECT 
                poliza.*,
                cliente.*,
                vehiculo.*,
                marca.*,
                modelo.* 
                FROM poliza
                LEFT JOIN cliente ON cliente.cliente_id = poliza.cliente_id
                LEFT JOIN vehiculo ON vehiculo.vehiculo_id = poliza.vehiculo_id
                LEFT JOIN marca ON marca.marca_id = vehiculo.marca_id
                LEFT JOIN modelo ON modelo.modelo_id = vehiculo.modelo_id WHERE poliza_id = ?");

            if ($sql->execute([$id])) {
                $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);

                if ($resultado) {
                    foreach ($resultado as $fila) {
                        // Formato del número de contrato
                        $contrato = sprintf("%06d-%02d", $fila["poliza_id"], $fila["poliza_renovacion"]);

                        // Contenido del código QR
                        $QR = "N° Contrato: " . $contrato .
                            "\n" . "Vigente desde: " . $fila["poliza_fechaInicio"] .
                            "\n" . "Vigente hasta: " . $fila["poliza_fechaVencimiento"] .
                            "\n" . "Nombre: " . $fila["cliente_nombre"] .
                            "\n" . "Apellido: " . $fila["cliente_apellido"] .
                            "\n" . "Cédula: " . $fila["cliente_cedula"] .
                            "\n" . "Placa del vehiculo" . $fila["vehiculo_placa"] .
                            "\n" . "Marca: " . $fila["marca_nombre"] .
                            "\n" . "Modelo: " . $fila["modelo_nombre"];
                    }

                    // Ruta y nombre del archivo del código QR
                    $QRcodeImg = "./ImgQr/" . $contrato . ".png";
                    $url = $contrato . ".png";

                    // Generar y guardar el código QR
                    QRcode::png($QR, $QRcodeImg);

                    // Actualizar la base de datos con la ruta del código QR
                    $sql2 = $this->db->prepare("UPDATE poliza SET poliza_qr = ? WHERE poliza_id = ?");
                    $sql2->execute([$url, $id]);

                    return true;
                }
            }
        } catch (PDOException $e) {
            // Manejar excepciones de PDO
            echo "Error: " . $e->getMessage();
        }

        return false;
    }
}

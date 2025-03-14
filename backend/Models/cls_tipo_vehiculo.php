<?php

if (!class_exists('cls_db'))
  require_once("cls_db.php");

abstract class cls_tipo_vehiculo extends cls_db
{
  protected $id, $nombre, $precio, $idContrato, $estatus, $sucursal, $nivel;

  public function __construct()
  {
    parent::__construct();
  }

  protected function Save()
  {
    try {
    //   if (empty($this->nombre)) {
    //     return [
    //       "data" => [
    //         "res" => "El nombre del tipo del vehículo no puede estar vacío",
    //         "code" => 400
    //       ],
    //       "code" => 400
    //     ];
    //   }
      $result = $this->SearchByNombre();
      if ($result) {
        return [
          "data" => [
            "res" => "Este vehiculo ($this->nombre) ya existe"
          ],
          "code" => 400
        ];
      }
      foreach ($this as $key => $value) {
        if (is_string($value)) {
          $this->$key = str_replace(',', '.', $value);
        }
      }
      $sql = $this->db->prepare("INSERT INTO tipovehiculo(tipoVehiculo_nombre,tipoVehiculo_estatus)  VALUES(?,1)");
      $sql->execute([$this->nombre]);

      if ($sql->rowCount() > 0) {
        $this->id = $this->db->lastInsertId();
        $this->reg_bitacora([
          'table_name' => "tipovehiculo",
          'des' => "Insert en tipo vehiculo (nombre: $this->nombre)"
        ]);

        return [
          "data" => [
            "res" => "Registro exitoso",
            "id" => $this->id
          ],
          "code" => 200
        ];
      }


      return [
        "data" => [
          "res" => "El registro ha fallado"
        ],
        "code" => 400
      ];
    } catch (PDOException $e) {
      return [
        "data" => [
          'res' => "Error de consulta: " . $e->getMessage()
        ],
        "code" => 400
      ];
    }
  }

  protected function update()
  {
    try {
      $res = $this->GetDuplicados();
      if (isset($res[0])) {
        return [
          "data" => [
            "res" => "Estas duplicando los datos de otro vehiculo"
          ],
          "code" => 400
        ];
      }
      foreach ($this as $key => $value) {
        if (is_string($value)) {
          $this->$key = str_replace(',', '.', $value);
        }
      }
      $sql = $this->db->prepare("UPDATE precio SET 
        precio_monto = ?
        WHERE tipoVehiculo_id = ?");
      if (
        $sql->execute([
          $this->precio,
          $this->id
        ])
      )
        ;
      $sql = $this->db->prepare("UPDATE tipovehiculo SET
          tipoVehiculo_nombre = ?,
          nivel = ?
        WHERE tipoVehiculo_id = ?");
      if (
        $sql->execute([
          $this->nombre,
          $this->nivel,
          $this->id
        ])
      ) {

        // $this->reg_bitacora([
        //   'table_name' => "tipovehiculo",
        //   'des' => "Actualización en tipo vehiculo (id: $this->id, nombre: $this->nombre)"
        // ]);

        return [
          "data" => [
            "res" => "Actualización de datos exitosa",
            "id" => $this->id
          ],
          "code" => 300
        ];
      }
      return [
        "data" => [
          "res" => "Actualización de datos fallida"
        ],
        "code" => 400
      ];
    } catch (PDOException $e) {
      return [
        "data" => [
          'res' => "Error de consulta: " . $e->getMessage()
        ],
        "code" => 400
      ];
    }
  }

  private function GetDuplicados()
  {
    $sql = $this->db->prepare("SELECT * FROM tipovehiculo WHERE tipoVehiculo_nombre =? AND tipoVehiculo_id != ?");
    $sql->execute([$this->nombre, $this->id]);
    if ($sql->rowCount() > 0)
      return $sql->fetch(PDO::FETCH_ASSOC);
    else
      return [];
  }

  protected function Delete()
  {
    try {
      $sql = $this->db->prepare("UPDATE tipovehiculo SET tipoVehiculo_estatus = ? WHERE tipoVehiculo_id = ?");
      if ($sql->execute([$this->estatus, $this->id])) {

        $this->reg_bitacora([
          'table_name' => "tipovehiculo",
          'des' => "Cambio de estatus de vehiculo (id: $this->id, nombre: $this->nombre)"
        ]);

        return [
          "data" => [
            "res" => "Estatus modificado",
            "code" => 200
          ],
          "code" => 200
        ];
      }
    } catch (PDOException $e) {
      return [
        "data" => [
          "res" => "Error de consulta: " . $e->getMessage()
        ],
        "code" => 400
      ];
    }
  }

  protected function GetOne($id)
  {
    $sql = $this->db->prepare("SELECT * FROM tipovehiculo WHERE tipoVehiculo_id = ?");
    $sql->execute([$id]);
    if ($sql->rowCount() > 0)
      return $sql->fetch(PDO::FETCH_ASSOC);
    else
      return [];
  }

  protected function SearchByNombre()
  {
    $sql = $this->db->prepare("SELECT * FROM tipovehiculo WHERE tipoVehiculo_nombre = ?");
    $sql->execute([$this->nombre]);
    if ($sql->rowCount() > 0)
      return true;
    else
      return false;
  }
  protected function SearchBySucursal()
  {
    $sql = $this->db->prepare("SELECT * FROM tipovehiculo WHERE tipoVehiculo_estatus = 1 AND tipoVehiculo_nombre = ?");
    $sql->execute([$this->sucursal]);
    if ($sql->rowCount() > 0)
      return $sql->fetch(PDO::FETCH_ASSOC);
    else
      return [];
  }
protected function GetAll($sucursal)
{
    // Construir la cláusula WHERE según los criterios
    $whereClause = ($sucursal == 21) 
        ? 'WHERE tipovehiculo.tipoVehiculo_estatus = 1 AND tipovehiculo.sucursal_id = 21 AND precio.tipoContrato_id = ?' 
        : 'WHERE tipovehiculo.tipoVehiculo_estatus = 1 AND tipovehiculo.sucursal_id != 21';

    if ($this->idContrato) {
        $whereClause .= ' AND precio.tipoContrato_id = ?'; 
    }
    if ($this->nivel) {
        $whereClause .= ' AND tipovehiculo.nivel = ?'; 
    }

    // Modificar la consulta para usar GROUP BY
    $sql = $this->db->prepare("SELECT precio.*, tipovehiculo.*, tipocontrato.*, 
        tipovehiculo.tipoVehiculo_nombre AS nombre_unico
        FROM precio 
        INNER JOIN tipovehiculo ON tipovehiculo.tipoVehiculo_id = precio.tipoVehiculo_id 
        INNER JOIN tipocontrato ON tipocontrato.contrato_id = precio.tipoContrato_id 
        $whereClause 
        GROUP BY tipovehiculo.tipoVehiculo_nombre
        ORDER BY precio_id ASC");

    // Agregar parámetros a un arreglo
    $params = [];
    if ($sucursal == 21) {
        $params[] = $this->idContrato;
    }
    if ($this->idContrato) {
        $params[] = $this->idContrato;
    }
    if ($this->nivel) {
        $params[] = $this->nivel;
    }

    // Ejecutar la consulta con los parámetros
    $sql->execute($params);

    // Devolver los resultados si hay filas, o un arreglo vacío si no las hay
    if ($sql->rowCount() > 0) {
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    } else {
        return [];
    }
}


  protected function savePrecio()
  {
    try {
      foreach ($this as $key => $value) {
        if (is_string($value)) {
          $this->$key = str_replace(',', '.', $value);
        }
      }
      $this->SearchBySucursal();
      $sql = $this->db->prepare("INSERT INTO precio(tipoVehiculo_id, tipoContrato_id, sucursal_id, precio_monto,estatus_precio)VALUES(?,?,?,?,1)");
      if ($sql->execute([$this->id, $this->idContrato, $this->sucursal, $this->precio])) {
        $this->id = $this->db->lastInsertId();
      }
      if ($sql->rowCount() > 0) {

        $this->reg_bitacora([
          'table_name' => "precio",
          'des' => "Insert en precio (id: $this->id, contrato: $this->idContrato, sucursal: $this->sucursal, precio: $this->precio"
        ]);

        return [
          "data" => [
            "res" => "Vinculación exitosa",
            "id" => $this->id
          ],
          "code" => 200
        ];
      }
      return [
        "data" => [
          "res" => "El vhiculo ha fallado"
        ],
        "code" => 400
      ];
    } catch (PDOException $e) {
      return [
        "data" => [
          'res' => "Error de consulta: " . $e->getMessage()
        ],
        "code" => 400
      ];
    }
  }

  protected function SearchByID($id, $sucursal)
  {
    $sql = $this->db->prepare("SELECT 
    precio.*,
      sucursal.sucursal_nombre,
      sucursal.sucursal_id,
      tipocontrato.contrato_id,
      tipocontrato.contrato_nombre,
      tipovehiculo.tipoVehiculo_nombre
  FROM
      precio, sucursal, tipocontrato, tipovehiculo
  WHERE
      precio.tipoVehiculo_id = ? AND 
      precio.sucursal_id = ? AND 
      precio.estatus_precio = 1 AND 
      sucursal.sucursal_id = precio.sucursal_id AND 
      tipocontrato.contrato_id = precio.tipoContrato_id AND
      tipovehiculo.tipoVehiculo_id = precio.tipoVehiculo_id;");
    $sql->execute([$id, $sucursal]);
    if ($sql->rowCount() > 0)
      return $sql->fetchAll(PDO::FETCH_ASSOC);
    else
      return [];
  }

  protected function DeletePrecio($id)
  {
    try {
      $sql = $this->db->prepare("UPDATE precio SET estatus_precio = $this->estatus WHERE precio_id = ?");
      if ($sql->execute([$id])) {
        $this->reg_bitacora([
          'table_name' => "precio",
          'des' => "Cambio de estatus de tipo contrato (id: $this->id)"
        ]);
        return [
          "data" => [
            "res" => "contrato desactivado"
          ],
          "code" => 200
        ];
      }
    } catch (PDOException $e) {
      return [
        "data" => [
          "res" => "Error de consulta: " . $e->getMessage()
        ],
        "code" => 400
      ];
    }
  }

  protected function SearchByPrecio($contrato, $tipo, $sucursal)
  {
    if (!isset($sucursal)) {
      return false;
    }

    if ($sucursal != 21) {
      $where = "sucursal.sucursal_id != 21";
    } else {
      $where = "sucursal.sucursal_id = 21";
    }

    $sql = $this->db->prepare("SELECT precio2.* FROM precio2
        JOIN tipocontrato ON tipocontrato.contrato_id = precio2.tipoContrato_id
        JOIN tipovehiculo ON tipovehiculo.tipoVehiculo_id = precio2.tipoVehiculo_id
        JOIN sucursal ON sucursal.sucursal_id = precio2.sucursal_id 
        WHERE tipocontrato.contrato_nombre = ? AND tipovehiculo.tipoVehiculo_nombre = ? AND $where");

    $sql->execute([$contrato, $tipo]);

    if ($sql->rowCount() > 0) {
      return $sql->fetchAll(PDO::FETCH_ASSOC);
    } else {
      return [];
    }
  }

  protected function SerachByAllBot()
  {
    $sql = $this->db->prepare("SELECT
    tipovehiculo.tipovehiculo_nombre,
    MAX(precio.precio_monto) AS precio_monto
  FROM
    precio
    INNER JOIN tipovehiculo ON tipovehiculo.tipovehiculo_id = precio.tipovehiculo_id
    INNER JOIN sucursal ON sucursal.sucursal_id = precio.sucursal_id
    INNER JOIN tipocontrato ON tipocontrato.contrato_id = precio.tipocontrato_id
  WHERE
    precio.sucursal_id = 1
    AND precio.tipocontrato_id = 1
  GROUP BY
    tipovehiculo.tipovehiculo_nombre");
    $sql->execute();
    if ($sql->rowCount() > 0) {
      return $sql->fetchAll(PDO::FETCH_ASSOC);
    } else {
      return [];
    }
  }

    protected function saveNewPrice() {
        $sql = $this->db->prepare("
        UPDATE precio
        INNER JOIN tipovehiculo ON tipovehiculo.tipovehiculo_id = precio.tipovehiculo_id
        SET precio.precio_monto = ?
        WHERE tipovehiculo.nivel = ? AND precio.tipoContrato_id = ?");
        $sql->execute([$this->precio, $this->nivel, $this->idContrato ]);
    }
    protected function saveNewTipeVehiculo() {
        try {
            $sql = $this->db->prepare("INSERT INTO tipovehiculo(tipoVehiculo_nombre, sucursal_id) VALUES (?, ?)");
            $sql->execute([$this->nombre, $this->sucursal]);
            if ($sql->rowCount() > 0) {
                $id = $this->db->lastInsertId();
                $sql2 = $this->db->prepare('INSERT INTO precio(tipoVehiculo_id, sucursal_id) VALUES (?,?)');
                $sql2->execute([$id, $this->sucursal]);
            }
        } catch (PDOException $e) {
            // Manejo del error
            echo 'Error: ' . $e->getMessage();
        }
    }
    protected function editNewTipoVehiculo() {
        try{
            $sql = $this->db->prepare("UPDATE tipovehiculo set tipoVehiculo_nombre = ? WHERE tipovehiculo_id = ?");
            $sql->execute([$this->nombre, $this->id]);
        } catch (PDOException $e) {
            // Manejo del error
            echo 'Error: ' . $e->getMessage();
        }
    }
   public function reporte($id)
{
     $sql = $this->db->prepare("
         SELECT precio.*, 
               tipovehiculo.tipoVehiculo_nombre, 
               tipocontrato.contrato_nombre 
         FROM precio 
         INNER JOIN tipovehiculo ON tipovehiculo.tipovehiculo_id = precio.tipovehiculo_id 
         INNER JOIN tipocontrato ON tipocontrato.contrato_id = precio.tipocontrato_id 
         WHERE precio.estatus_precio = 1 
         AND precio.tipovehiculo_id > 0 
         AND precio.tipocontrato_id > 0
         AND tipocontrato.contrato_id = ?
         GROUP BY tipovehiculo.tipoVehiculo_nombre;
    ");
    $sql->execute([$id]);
    return $sql->fetchAll(PDO::FETCH_ASSOC);
}


}

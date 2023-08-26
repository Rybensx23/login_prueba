<?php

namespace Controllers;

use Exception;
use Model\Detalle;
use MVC\Router;

class DetalleController
{
    public static function estadistica(Router $router)
    {
        if(isset($_SESSION['auth_user'])){
            $router->render('clientes/estadistica', []);
        }else{
            header('Location: /login_prueba/');
        }
    }

    public static function detalleComprasAPI()
    {

        $sql = "SELECT c.cliente_nombre, 
        COUNT(DISTINCT v.venta_id) AS total_ventas
        FROM clientes c 
        LEFT JOIN ventas v ON c.cliente_id = v.venta_cliente AND v.venta_situacion = '1'
        LEFT JOIN detalle_ventas dv ON v.venta_id = dv.detalle_venta AND dv.detalle_situacion = '1'
        WHERE c.cliente_situacion = '1'
        GROUP BY c.cliente_nombre 
        ORDER BY total_ventas DESC;";

        try {

            $detalles = Detalle::fetchArray($sql);

            echo json_encode($detalles);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
        }
    }
}
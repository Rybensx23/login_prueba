<nav class="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
    <a class="navbar-brand" href="/login_prueba/menu">Menú Principal</a>

    <!-- Enlaces del menú -->
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="/login_prueba/clientes">Tabla de Datos</a>
            </li>
            <li class="nav-item">
                    <a class="nav-link" href="/login_prueba/clientes/estadistica">Estadistica</a>
            </li>
        </ul>
    </div>
    <a href="/login_prueba/logout" class="btn btn-danger">Cerrar sesión</a>
</nav>
<h1>ESTADISTICAS DE VENTAS</h1>
<button id="btnActualizar" class="btn btn-info">Actualizar</button>
<div class="row">
    <div class="col-lg-5">
        <canvas id="chartVentas" width="100%"></canvas>
    </div>
</div>
<script src="<?=asset('./build/js/clientes/estadistica.js') ?>"></script>
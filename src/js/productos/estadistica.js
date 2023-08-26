import Chart from "chart.js/auto";
import { Toast } from "../funciones";

const canvas = document.getElementById('chartVentas')
const btnActualizar = document.getElementById('btnActualizar')
const context = canvas.getContext('2d');

const data = {
    labels: [], // Aquí irán las etiquetas
    datasets: [
        {
            label: 'Ventas',
            data: [], // Aquí irán los datos
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
        },
    ]
};

const options = {
    plugins: {
        filler: {
            propagate: false
        },
        'samples-filler-analyser': {
            target: 'chart-analyser'
        }
    },
    interaction: {
        intersect: false
    }
};

const chartVentas = new Chart(context, {
    type: 'radar',
    data: data,
    options: options
});

const getEstadisticas = async () => {
    const url = `/login_prueba/API/productos/estadistica`;
    const config = {
        method : 'GET'
    }

    try {
        const respuesta = await fetch(url, config)
        const data = await respuesta.json();

        chartVentas.data.labels = [];
        chartVentas.data.datasets[0].data = [];
        chartVentas.data.datasets[0].backgroundColor = []



        if(data){

            data.forEach( registro => {
                chartVentas.data.labels.push(registro.producto)
                chartVentas.data.datasets[0].data.push(registro.cantidad)
                chartVentas.data.datasets[0].backgroundColor.push(getRandomColor())
            });

        }else{
            Toast.fire({
                title : 'No se encontraron registros',
                icon : 'info'
            })
        }
        
        chartVentas.update();
       
    } catch (error) {
        console.log(error);
    }
}

const getRandomColor = () => {
    const r = Math.floor( Math.random() * 256)
    const g = Math.floor( Math.random() * 256)
    const b = Math.floor( Math.random() * 256)

    const rgbColor = `rgba(${r},${g},${b},0.5)`
    return rgbColor
}

getEstadisticas();

btnActualizar.addEventListener('click', getEstadisticas )
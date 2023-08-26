import Chart from "chart.js/auto";
import { Toast } from "../funciones";

const canvas = document.getElementById('chartCliente')
const btnActualizar = document.getElementById('btnActualizar')
const context = canvas.getContext('2d');


const chartVentas = new Chart(context, {
    type : 'pie',
    data : {
        labels : [],
        datasets : [
            {
                label : 'compras',
                data : [],
                backgroundColor : []
            },
            // {
            //     // type: 'bar',
            //     // label : 'productos',
            //     // data2 : [],
            //     // backgroundColor : [
            //     //     'rgb(123,45,26)',
            //     //     'rgb(12,85,126)',
            //     //     'rgb(12,85,126)',
            //     //     'rgb(225,45,16)',
            //     // ]
            // }
        ]
    },
    options : {
        indexAxis : 'x'
    }
})

const getEstadisticas = async () => {
    const url = `/login_prueba/API/clientes/estadistica2`;
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
                chartVentas.data.labels.push(registro.cliente_nombre)
                chartVentas.data.datasets[0].data.push(registro.total_ventas)
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
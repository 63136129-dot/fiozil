const btn = document.querySelector('#btnTema');

// Variable para saber si la pantalla está oscura o clara
let modo = 0;

btn.addEventListener('click', () => {
    if (modo === 0) {
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = 'white';
        btn.textContent = 'Cambiar a Rosado';
        modo = 1;
    } else if (modo === 1) {
        document.body.style.backgroundColor = '#ffb6c1'; 
        document.body.style.color = '#333333';
        btn.textContent = 'Cambiar a Claro';
        modo = 2;
    } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        btn.textContent = 'cambiar a oscuro';
        modo = 0;
    }
});
